import { Milestone } from '@/store/useStore'

export const milestones: Milestone[] = [
  // 2 months
  { id: 'm-2-1', age: 2, domain: 'gross-motor', description: 'Lifts head when on tummy' },
  { id: 'm-2-2', age: 2, domain: 'social', description: 'Smiles at people' },
  { id: 'm-2-3', age: 2, domain: 'language', description: 'Coos and gurgles' },
  { id: 'm-2-4', age: 2, domain: 'fine-motor', description: 'Briefly calms when picked up' },

  // 4 months
  { id: 'm-4-1', age: 4, domain: 'gross-motor', description: 'Holds head steady without support' },
  { id: 'm-4-2', age: 4, domain: 'fine-motor', description: 'Brings hands to mouth' },
  { id: 'm-4-3', age: 4, domain: 'social', description: 'Smiles on own to get attention' },
  { id: 'm-4-4', age: 4, domain: 'language', description: 'Babbles with expression' },

  // 6 months
  { id: 'm-6-1', age: 6, domain: 'gross-motor', description: 'Rolls from tummy to back' },
  { id: 'm-6-2', age: 6, domain: 'fine-motor', description: 'Reaches for toys with one hand' },
  { id: 'm-6-3', age: 6, domain: 'social', description: 'Knows familiar people' },
  { id: 'm-6-4', age: 6, domain: 'language', description: 'Takes turns making sounds' },

  // 9 months
  { id: 'm-9-1', age: 9, domain: 'gross-motor', description: 'Sits without support' },
  { id: 'm-9-2', age: 9, domain: 'fine-motor', description: 'Picks up things with thumb and finger (pincer grasp)' },
  { id: 'm-9-3', age: 9, domain: 'social', description: 'Stranger anxiety may develop' },
  { id: 'm-9-4', age: 9, domain: 'language', description: 'Says "mama" and "dada" nonspecifically' },

  // 12 months
  { id: 'm-12-1', age: 12, domain: 'gross-motor', description: 'Pulls to stand' },
  { id: 'm-12-2', age: 12, domain: 'gross-motor', description: 'Walks holding on to furniture' },
  { id: 'm-12-3', age: 12, domain: 'fine-motor', description: 'Drinks from cup without lid' },
  { id: 'm-12-4', age: 12, domain: 'language', description: 'Says one or two words besides "mama" and "dada"' },
  { id: 'm-12-5', age: 12, domain: 'social', description: 'Waves bye-bye' },

  // 15 months
  { id: 'm-15-1', age: 15, domain: 'gross-motor', description: 'Walks independently' },
  { id: 'm-15-2', age: 15, domain: 'fine-motor', description: 'Scribbles' },
  { id: 'm-15-3', age: 15, domain: 'language', description: 'Says 3-5 words' },
  { id: 'm-15-4', age: 15, domain: 'social', description: 'Shows affection to familiar people' },

  // 18 months
  { id: 'm-18-1', age: 18, domain: 'gross-motor', description: 'Walks up stairs with help' },
  { id: 'm-18-2', age: 18, domain: 'fine-motor', description: 'Feeds self with utensils' },
  { id: 'm-18-3', age: 18, domain: 'language', description: 'Says 10-20 words' },
  { id: 'm-18-4', age: 18, domain: 'social', description: 'Points to show something interesting' },

  // 24 months (2 years)
  { id: 'm-24-1', age: 24, domain: 'gross-motor', description: 'Kicks a ball' },
  { id: 'm-24-2', age: 24, domain: 'gross-motor', description: 'Runs' },
  { id: 'm-24-3', age: 24, domain: 'fine-motor', description: 'Builds tower of 4+ blocks' },
  { id: 'm-24-4', age: 24, domain: 'language', description: 'Says at least 50 words' },
  { id: 'm-24-5', age: 24, domain: 'language', description: 'Combines two words' },
  { id: 'm-24-6', age: 24, domain: 'social', description: 'Plays alongside other children' },

  // 30 months
  { id: 'm-30-1', age: 30, domain: 'gross-motor', description: 'Jumps with both feet' },
  { id: 'm-30-2', age: 30, domain: 'fine-motor', description: 'Turns doorknobs' },
  { id: 'm-30-3', age: 30, domain: 'language', description: 'Says 200+ words' },
  { id: 'm-30-4', age: 30, domain: 'social', description: 'Shows defiant behavior' },

  // 36 months (3 years)
  { id: 'm-36-1', age: 36, domain: 'gross-motor', description: 'Pedals tricycle' },
  { id: 'm-36-2', age: 36, domain: 'fine-motor', description: 'Copies a circle' },
  { id: 'm-36-3', age: 36, domain: 'language', description: 'Uses 3-word sentences' },
  { id: 'm-36-4', age: 36, domain: 'language', description: 'Strangers understand most speech' },
  { id: 'm-36-5', age: 36, domain: 'social', description: 'Shows concern for crying friend' },

  // 48 months (4 years)
  { id: 'm-48-1', age: 48, domain: 'gross-motor', description: 'Hops on one foot' },
  { id: 'm-48-2', age: 48, domain: 'fine-motor', description: 'Draws a person with 2-4 body parts' },
  { id: 'm-48-3', age: 48, domain: 'language', description: 'Tells stories' },
  { id: 'm-48-4', age: 48, domain: 'social', description: 'Prefers playing with other children' },

  // 60 months (5 years)
  { id: 'm-60-1', age: 60, domain: 'gross-motor', description: 'Stands on one foot for 10 seconds' },
  { id: 'm-60-2', age: 60, domain: 'fine-motor', description: 'Copies a triangle' },
  { id: 'm-60-3', age: 60, domain: 'language', description: 'Speaks in complete sentences' },
  { id: 'm-60-4', age: 60, domain: 'social', description: 'Wants to please friends' },
]

export const redFlags: Milestone[] = [
  { id: 'rf-4', age: 4, domain: 'gross-motor', description: 'Does not watch things as they move', redFlag: true },
  { id: 'rf-4-2', age: 4, domain: 'social', description: 'Does not smile at people', redFlag: true },
  { id: 'rf-4-3', age: 4, domain: 'gross-motor', description: "Cannot hold head steady", redFlag: true },

  { id: 'rf-6', age: 6, domain: 'gross-motor', description: 'Does not try to get things in reach', redFlag: true },
  { id: 'rf-6-2', age: 6, domain: 'social', description: 'Shows no affection for caregivers', redFlag: true },
  { id: 'rf-6-3', age: 6, domain: 'language', description: 'Does not respond to sounds around them', redFlag: true },

  { id: 'rf-9', age: 9, domain: 'gross-motor', description: 'Does not sit with help', redFlag: true },
  { id: 'rf-9-2', age: 9, domain: 'language', description: 'Does not babble', redFlag: true },
  { id: 'rf-9-3', age: 9, domain: 'social', description: 'Does not play games with back-and-forth', redFlag: true },

  { id: 'rf-12', age: 12, domain: 'gross-motor', description: 'Does not crawl', redFlag: true },
  { id: 'rf-12-2', age: 12, domain: 'gross-motor', description: 'Cannot stand with support', redFlag: true },
  { id: 'rf-12-3', age: 12, domain: 'language', description: 'Does not say single words', redFlag: true },
  { id: 'rf-12-4', age: 12, domain: 'social', description: 'Does not point to things', redFlag: true },

  { id: 'rf-18', age: 18, domain: 'gross-motor', description: 'Does not walk', redFlag: true },
  { id: 'rf-18-2', age: 18, domain: 'language', description: 'Does not know what familiar things are for', redFlag: true },
  { id: 'rf-18-3', age: 18, domain: 'social', description: 'Does not copy others', redFlag: true },
  { id: 'rf-18-4', age: 18, domain: 'language', description: 'Does not say at least 6 words', redFlag: true },

  { id: 'rf-24', age: 24, domain: 'language', description: 'Does not use 2-word phrases', redFlag: true },
  { id: 'rf-24-2', age: 24, domain: 'social', description: 'Does not notice when others are hurt or upset', redFlag: true },
  { id: 'rf-24-3', age: 24, domain: 'gross-motor', description: "Does not walk steadily", redFlag: true },

  { id: 'rf-36', age: 36, domain: 'language', description: 'Speech is unclear', redFlag: true },
  { id: 'rf-36-2', age: 36, domain: 'social', description: 'Does not play pretend', redFlag: true },
  { id: 'rf-36-3', age: 36, domain: 'fine-motor', description: 'Cannot work simple toys', redFlag: true },
]
