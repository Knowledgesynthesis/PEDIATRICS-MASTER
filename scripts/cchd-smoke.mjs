import assert from 'node:assert/strict'
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright')

const url = new URL('/congenital', process.env.CCHD_BASE_URL ?? 'http://127.0.0.1:4173')
url.hash = 'tool-cchd'
if (process.env.CCHD_LIVE_SMOKE === 'true') url.searchParams.set('verify', `${process.env.GITHUB_SHA ?? 'local'}-${Date.now()}`)

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined })
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, serviceWorkers: 'block' })
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  const response = await page.goto(url.href, { waitUntil: 'domcontentloaded' })
  assert.equal(response?.status(), 200, url.href)

  const tool = page.locator('#tool-cchd')
  await tool.getByRole('heading', { name: 'CCHD pulse-oximetry screen (AAP 2025)' }).waitFor({ timeout: 8000 })
  const hand = tool.getByRole('spinbutton', { name: 'Right hand SpO₂' })
  const foot = tool.getByRole('spinbutton', { name: 'Foot SpO₂' })
  const first = tool.getByRole('radio', { name: 'First' })
  const repeat = tool.getByRole('radio', { name: 'Repeat (1 h later)' })
  const status = tool.getByRole('status')

  async function check(rightHand, footValue, label) {
    await hand.fill(rightHand)
    await foot.fill(footValue)
    await status.getByText(label, { exact: true }).waitFor({ timeout: 4000 })
  }

  await check('95', '94', 'REPEAT in 1 hour')
  await status.getByText(/at least one site is below 95%/).waitFor()
  await check('94', '95', 'REPEAT in 1 hour')
  await check('99', '95', 'REPEAT in 1 hour')
  await status.getByText(/absolute difference exceeds 3 percentage points/).waitFor()
  await check('98', '95', 'PASS')
  await check('90', '93', 'REPEAT in 1 hour')
  await check('89', '99', 'FAIL')
  await check('99', '89', 'FAIL')
  await status.getByText(/immediate fail/).waitFor()
  await check('0', '99', 'FAIL')
  for (const [r, f] of [['', '89'], ['89', ''], ['101', '89'], ['89', '-1']]) {
    await check(r, f, 'Enter both saturations from 0 to 100%.')
    assert.equal(await status.getByText(/^(PASS|REPEAT in 1 hour|FAIL)$/).count(), 0)
  }

  await check('95', '94', 'REPEAT in 1 hour')
  await repeat.click()
  assert.equal(await hand.inputValue(), '')
  assert.equal(await foot.inputValue(), '')
  await status.getByText('Enter both saturations from 0 to 100%.', { exact: true }).waitFor()
  await check('95', '94', 'FAIL')
  await status.getByText(/Do not perform a third screen/).waitFor()
  await check('95', '95', 'PASS')
  await first.click()
  assert.equal(await hand.inputValue(), '95')
  assert.equal(await foot.inputValue(), '94')
  await status.getByText('REPEAT in 1 hour', { exact: true }).waitFor()
  assert.deepEqual(errors, [])
  console.log(`CCHD browser smoke passed: ${url.origin}`)
} finally {
  await browser.close()
}
