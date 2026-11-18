/**
 * CDC/AAP 2022 "Learn the Signs. Act Early." milestones (Zubler et al., Pediatrics 2022):
 * skills that ≥75% of children demonstrate by the stated age. A missing milestone means
 * screen/evaluate now — not "wait and see".
 */
export type Domain = 'social' | 'language' | 'cognitive' | 'movement'

export const domainLabels: Record<Domain, string> = {
  social: 'Social / emotional',
  language: 'Language / communication',
  cognitive: 'Cognitive',
  movement: 'Movement / physical',
}

export interface AgeMilestones {
  months: number
  label: string
  items: Record<Domain, string[]>
}

export const cdcMilestones: AgeMilestones[] = [
  {
    months: 2,
    label: '2 months',
    items: {
      social: ['Calms down when spoken to or picked up', 'Looks at your face', 'Seems happy to see you when you walk up', 'Smiles when you talk to or smile at them'],
      language: ['Makes sounds other than crying', 'Reacts to loud sounds'],
      cognitive: ['Watches you as you move', 'Looks at a toy for several seconds'],
      movement: ['Holds head up when on tummy', 'Moves both arms and both legs', 'Opens hands briefly'],
    },
  },
  {
    months: 4,
    label: '4 months',
    items: {
      social: ['Smiles on own to get your attention', 'Chuckles when you try to make them laugh', 'Looks at you, moves, or makes sounds to get or keep your attention'],
      language: ['Makes sounds like “oooo”, “aahh” (cooing)', 'Makes sounds back when you talk', 'Turns head toward the sound of your voice'],
      cognitive: ['If hungry, opens mouth on seeing breast or bottle', 'Looks at own hands with interest'],
      movement: ['Holds head steady without support when held', 'Holds a toy put in hand', 'Uses arm to swing at toys', 'Brings hands to mouth', 'Pushes up onto elbows/forearms on tummy'],
    },
  },
  {
    months: 6,
    label: '6 months',
    items: {
      social: ['Knows familiar people', 'Likes to look at self in a mirror', 'Laughs'],
      language: ['Takes turns making sounds with you', 'Blows “raspberries”', 'Makes squealing noises'],
      cognitive: ['Puts things in mouth to explore them', 'Reaches to grab a toy they want', 'Closes lips to show they don’t want more food'],
      movement: ['Rolls from tummy to back', 'Pushes up with straight arms on tummy', 'Leans on hands to support self when sitting'],
    },
  },
  {
    months: 9,
    label: '9 months',
    items: {
      social: ['Is shy, clingy, or fearful around strangers', 'Shows several facial expressions', 'Looks when you call their name', 'Reacts when you leave', 'Smiles or laughs with peek-a-boo'],
      language: ['Makes different sounds like “mamamama” and “babababa”', 'Lifts arms up to be picked up'],
      cognitive: ['Looks for objects when dropped out of sight', 'Bangs two things together'],
      movement: ['Gets to a sitting position by self', 'Moves things from one hand to the other', 'Uses fingers to “rake” food toward self', 'Sits without support'],
    },
  },
  {
    months: 12,
    label: '12 months',
    items: {
      social: ['Plays games with you, like pat-a-cake'],
      language: ['Waves “bye-bye”', 'Calls a parent “mama”, “dada”, or another special name', 'Understands “no” (pauses or stops)'],
      cognitive: ['Puts something in a container', 'Looks for things they see you hide'],
      movement: ['Pulls up to stand', 'Walks holding on to furniture', 'Drinks from a cup without a lid, as you hold it', 'Picks things up between thumb and pointer finger (pincer)'],
    },
  },
  {
    months: 15,
    label: '15 months',
    items: {
      social: ['Copies other children while playing', 'Shows you an object they like', 'Claps when excited', 'Hugs a stuffed toy', 'Shows you affection'],
      language: ['Tries to say one or two words besides “mama”/“dada”', 'Looks at a familiar object when you name it', 'Follows directions given with both a gesture and words', 'Points to ask for something or get help'],
      cognitive: ['Tries to use things the right way (phone, cup, book)', 'Stacks at least two small objects'],
      movement: ['Takes a few steps on own', 'Uses fingers to feed self some food'],
    },
  },
  {
    months: 18,
    label: '18 months',
    items: {
      social: ['Moves away from you but looks to make sure you are close', 'Points to show you something interesting', 'Puts hands out for you to wash them', 'Looks at a few pages in a book with you', 'Helps you dress by pushing arm through sleeve'],
      language: ['Tries to say three or more words besides “mama”/“dada”', 'Follows one-step directions without gestures'],
      cognitive: ['Copies you doing chores', 'Plays with toys in a simple way, like pushing a toy car'],
      movement: ['Walks without holding on', 'Scribbles', 'Drinks from a cup without a lid (may spill)', 'Feeds self with fingers', 'Tries to use a spoon', 'Climbs on and off a couch or chair without help'],
    },
  },
  {
    months: 24,
    label: '2 years',
    items: {
      social: ['Notices when others are hurt or upset', 'Looks at your face to see how to react in a new situation'],
      language: ['Points to things in a book when asked', 'Says at least two words together, like “More milk”', 'Points to at least two body parts when asked', 'Uses more gestures than waving and pointing (blowing a kiss, nodding)'],
      cognitive: ['Holds something in one hand while using the other', 'Tries to use switches, knobs, or buttons on a toy', 'Plays with more than one toy at the same time'],
      movement: ['Kicks a ball', 'Runs', 'Walks (not climbs) up a few stairs with or without help', 'Eats with a spoon'],
    },
  },
  {
    months: 30,
    label: '30 months',
    items: {
      social: ['Plays next to other children and sometimes with them', 'Shows you what they can do (“Look at me!”)', 'Follows simple routines when told'],
      language: ['Says about 50 words', 'Says two or more words with one action word (“Doggie run”)', 'Names things in a book when you point', 'Says words like “I”, “me”, or “we”'],
      cognitive: ['Uses things to pretend (feeds a block to a doll)', 'Shows simple problem-solving (stands on a stool to reach)', 'Follows two-step instructions', 'Knows at least one color'],
      movement: ['Uses hands to twist things (doorknobs, lids)', 'Takes some clothes off by self', 'Jumps off the ground with both feet', 'Turns book pages one at a time'],
    },
  },
  {
    months: 36,
    label: '3 years',
    items: {
      social: ['Calms down within 10 minutes after you leave (e.g., child-care drop-off)', 'Notices other children and joins them to play'],
      language: ['Talks with you in conversation using at least two back-and-forth exchanges', 'Asks “who”, “what”, “where”, or “why” questions', 'Says what action is happening in a picture', 'Says first name when asked', 'Talks well enough for others to understand, most of the time'],
      cognitive: ['Draws a circle when you show how', 'Avoids touching hot objects when warned'],
      movement: ['Strings items together (large beads, macaroni)', 'Puts on some clothes by self', 'Uses a fork'],
    },
  },
  {
    months: 48,
    label: '4 years',
    items: {
      social: ['Pretends to be something else during play', 'Asks to play with children if none are around', 'Comforts others who are hurt or sad', 'Avoids danger (e.g., heights at the playground)', 'Likes to be a “helper”', 'Changes behavior based on where they are'],
      language: ['Says sentences with four or more words', 'Says some words from a song, story, or rhyme', 'Talks about at least one thing that happened during the day', 'Answers simple questions (“What is a coat for?”)'],
      cognitive: ['Names a few colors', 'Tells what comes next in a well-known story', 'Draws a person with three or more body parts'],
      movement: ['Catches a large ball most of the time', 'Serves self food or pours water with supervision', 'Unbuttons some buttons', 'Holds crayon or pencil between fingers and thumb (not a fist)'],
    },
  },
  {
    months: 60,
    label: '5 years',
    items: {
      social: ['Follows rules or takes turns in games', 'Sings, dances, or acts for you', 'Does simple chores at home'],
      language: ['Tells a story with at least two events', 'Answers simple questions about a story', 'Keeps a conversation going with more than three exchanges', 'Uses or recognizes simple rhymes'],
      cognitive: ['Counts to 10', 'Names some numbers between 1 and 5 when you point', 'Uses words about time (“yesterday”, “tomorrow”)', 'Pays attention for 5–10 minutes during activities', 'Writes some letters in their name', 'Names some letters when you point'],
      movement: ['Buttons some buttons', 'Hops on one foot'],
    },
  },
]

/** Classic median ages (≈50% achieve) — what exams test and what families ask about. */
export const classicMilestones = [
  { age: '2 mo', gross: 'Lifts head 45° prone', fine: 'Hands unfisting', language: 'Coos', social: 'Social smile' },
  { age: '4 mo', gross: 'Rolls front → back; no head lag', fine: 'Reaches, grasps, hands to midline', language: 'Laughs, squeals', social: 'Smiles spontaneously' },
  { age: '6 mo', gross: 'Sits with/without support (tripod); rolls both ways', fine: 'Transfers hand to hand, raking grasp', language: 'Consonant babble', social: 'Recognizes familiar faces; stranger awareness begins' },
  { age: '9 mo', gross: 'Pulls to stand, crawls (not universal)', fine: 'Immature pincer, bangs objects', language: '“Mama/dada” nonspecific; responds to name', social: 'Stranger anxiety; peek-a-boo' },
  { age: '12 mo', gross: 'Walks (WHO median 12.0 mo); cruises', fine: 'Mature pincer; releases object on request', language: '1–3 words with meaning', social: 'Waves; imitates; separation anxiety' },
  { age: '15 mo', gross: 'Walks well; stoops', fine: 'Tower of 2; scribbles', language: '3–6 words; follows 1-step command with gesture', social: 'Points to request' },
  { age: '18 mo', gross: 'Runs stiffly; walks up stairs with help', fine: 'Tower of 3–4; uses spoon', language: '10–25 words; points to body parts', social: 'Points to show interest; pretend play begins' },
  { age: '2 y', gross: 'Kicks ball; jumps (24–30 mo)', fine: 'Tower of 6; copies line', language: '≥50 words; 2-word phrases; ~50% intelligible', social: 'Parallel play' },
  { age: '3 y', gross: 'Tricycle; alternates feet up stairs', fine: 'Copies circle; tower of 9', language: '3-word sentences; ~75% intelligible', social: 'Shares; imaginative play; knows age and sex' },
  { age: '4 y', gross: 'Hops on one foot', fine: 'Copies cross (square ≈4½); draws person with 3–4 parts', language: 'Tells stories; ~100% intelligible', social: 'Cooperative play; imaginary friends' },
  { age: '5 y', gross: 'Skips; stands on one foot ~10 s', fine: 'Copies triangle; prints some letters', language: 'Fluent speech; counts to 10', social: 'Follows rules; has friends' },
]

/** WHO Motor Development Study (2006): 1st–99th percentile windows and medians (months). */
export const whoMotorWindows = [
  { label: 'Sitting without support', p1: 3.8, median: 5.9, p99: 9.2 },
  { label: 'Standing with assistance', p1: 4.8, median: 7.4, p99: 11.4 },
  { label: 'Hands-and-knees crawling', p1: 5.2, median: 8.3, p99: 13.5 },
  { label: 'Walking with assistance', p1: 5.9, median: 9.0, p99: 13.7 },
  { label: 'Standing alone', p1: 6.9, median: 10.8, p99: 16.9 },
  { label: 'Walking alone', p1: 8.2, median: 12.0, p99: 17.6 },
]
