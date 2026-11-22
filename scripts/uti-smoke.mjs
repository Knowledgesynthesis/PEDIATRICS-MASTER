import assert from 'node:assert/strict'
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright')

const url = new URL('/fever', process.env.UTI_BASE_URL ?? 'http://127.0.0.1:4173')
url.hash = 'uti'
if (process.env.UTI_LIVE_SMOKE === 'true') url.searchParams.set('verify', `${process.env.GITHUB_SHA ?? 'local'}-${Date.now()}`)
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined })
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, serviceWorkers: 'block' })
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  assert.equal((await page.goto(url.href, { waitUntil: 'domcontentloaded' }))?.status(), 200, url.href)
  const lesson = page.locator('#uti')
  const lab = lesson.locator('#tool-uti-2026')
  await lesson.getByRole('heading', { name: 'Pediatric urinary tract infection: AAP 2026' }).waitFor({ timeout: 8000 })
  const anchorPosition = () => {
    const section = document.getElementById('uti')
    if (!section) return null
    const padding = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
    const margin = Number.parseFloat(getComputedStyle(section).scrollMarginTop) || 0
    const actual = section.getBoundingClientRect().top
    return { actual, expected: padding + margin, scrollY }
  }
  await page.waitForFunction(() => {
    const section = document.getElementById('uti')
    if (!section) return false
    const padding = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
    const margin = Number.parseFloat(getComputedStyle(section).scrollMarginTop) || 0
    return Math.abs(section.getBoundingClientRect().top - padding - margin) <= 2 && scrollY > 0
  }, undefined, { timeout: 5000 }).catch(async (error) => {
    console.error('UTI anchor position:', await page.evaluate(anchorPosition))
    throw error
  })
  await lab.getByRole('heading', { name: 'UTI case lab: same count, different specimen' }).waitFor()
  const status = lab.getByRole('status')
  const radio = (name) => lab.getByRole('radio', { name, exact: true })
  await lab.getByText(/15-month-old with fever.*18 WBC\/hpf/).waitFor()
  await status.getByText('Meets the presumptive UA anchor', { exact: true }).waitFor()
  assert.equal(await lab.getByText(/20,000 CFU\/mL/).count(), 0)
  await radio('Reveal culture').focus()
  await page.keyboard.press('Space')
  await status.getByText('Meets high-probability UTI criteria', { exact: true }).waitFor()
  await status.getByText(/20,000 CFU\/mL.*10,000 CFU\/mL/).waitFor()
  await status.getByText('No routine VCUG', { exact: true }).waitFor()

  await radio('3-year-old').click()
  await status.getByText('Send culture; the presumptive UA anchor is not met', { exact: true }).waitFor()
  assert.equal(await lab.getByRole('radiogroup', { name: 'Ultrasound result' }).count(), 0)
  await radio('Reveal culture').click()
  await status.getByText('Meets high-probability UTI criteria', { exact: true }).waitFor()
  await radio('Clinically relevant abnormality').click()
  await status.getByText('Offer VCUG', { exact: true }).waitFor()
  await radio('Normal RBUS').click()
  await status.getByText('No routine VCUG', { exact: true }).waitFor()
  await radio('Clean catch').click()
  await status.getByText('Does not meet the clean-catch culture anchor', { exact: true }).waitFor()
  await status.getByText(/20,000 CFU\/mL.*100,000 CFU\/mL/).waitFor()
  await status.getByText(/That does not rule out UTI/).waitFor()
  assert.equal(await lab.getByRole('radiogroup', { name: 'Ultrasound result' }).count(), 0)

  await lesson.getByText(/A well-appearing febrile 10-month-old.*bag screen/).waitFor()
  await lesson.getByText(/A 3-year-old recovers after a first uncomplicated febrile/).waitFor()
  await lesson.getByText(/For infants 8–60 days, follow the separate febrile-infant pathway/).waitFor()
  await lesson.getByRole('link', { name: 'AAP UTI diagnosis technical report' }).waitFor()
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true)
  assert.deepEqual(errors, [])
  console.log(`UTI browser smoke passed: ${url.origin}`)
} finally {
  await browser.close()
}
