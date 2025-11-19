import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const glossaryTerms = [
  {
    category: 'Abbreviations',
    terms: [
      { term: 'AAP', definition: 'American Academy of Pediatrics' },
      { term: 'ACIP', definition: 'Advisory Committee on Immunization Practices' },
      { term: 'AOM', definition: 'Acute Otitis Media' },
      { term: 'ASD', definition: 'Atrial Septal Defect' },
      { term: 'BID', definition: 'Twice daily (bis in die)' },
      { term: 'CHD', definition: 'Congenital Heart Disease' },
      { term: 'CHF', definition: 'Congestive Heart Failure' },
      { term: 'CMV', definition: 'Cytomegalovirus' },
      { term: 'DTaP', definition: 'Diphtheria, Tetanus, acellular Pertussis vaccine' },
      { term: 'ED', definition: 'Emergency Department' },
      { term: 'FTT', definition: 'Failure to Thrive' },
      { term: 'GBS', definition: 'Group B Streptococcus' },
      { term: 'Hib', definition: 'Haemophilus influenzae type b' },
      { term: 'HPV', definition: 'Human Papillomavirus' },
      { term: 'IM', definition: 'Intramuscular' },
      { term: 'IV', definition: 'Intravenous' },
      { term: 'LP', definition: 'Lumbar Puncture' },
      { term: 'MMR', definition: 'Measles, Mumps, Rubella vaccine' },
      { term: 'ORT', definition: 'Oral Rehydration Therapy' },
      { term: 'PCV', definition: 'Pneumococcal Conjugate Vaccine' },
      { term: 'PDA', definition: 'Patent Ductus Arteriosus' },
      { term: 'PKU', definition: 'Phenylketonuria' },
      { term: 'PO', definition: 'By mouth (per os)' },
      { term: 'PR', definition: 'Per rectum' },
      { term: 'RSV', definition: 'Respiratory Syncytial Virus' },
      { term: 'TID', definition: 'Three times daily (ter in die)' },
      { term: 'TORCH', definition: 'Toxoplasmosis, Other, Rubella, CMV, HSV' },
      { term: 'URI', definition: 'Upper Respiratory Infection' },
      { term: 'VSD', definition: 'Ventricular Septal Defect' },
    ],
  },
  {
    category: 'Clinical Terms',
    terms: [
      { term: 'Apnea', definition: 'Cessation of breathing for >20 seconds or accompanied by bradycardia/cyanosis' },
      { term: 'Bronchiolitis', definition: 'Viral inflammation of the bronchioles, typically caused by RSV' },
      { term: 'Croup', definition: 'Laryngotracheobronchitis causing barking cough and stridor' },
      { term: 'Cyanosis', definition: 'Bluish discoloration of skin/mucous membranes due to low oxygen' },
      { term: 'Epiglottitis', definition: 'Inflammation of the epiglottis, medical emergency' },
      { term: 'Febrile seizure', definition: 'Seizure associated with fever in children 6 months - 5 years' },
      { term: 'Fontanelle', definition: 'Soft spot on infant skull where bones have not yet fused' },
      { term: 'Intussusception', definition: 'Telescoping of bowel into itself, pediatric emergency' },
      { term: 'Jaundice', definition: 'Yellow discoloration of skin/eyes due to elevated bilirubin' },
      { term: 'Kernicterus', definition: 'Bilirubin-induced brain damage in newborns' },
      { term: 'Meningitis', definition: 'Inflammation of the meninges covering brain and spinal cord' },
      { term: 'Petechiae', definition: 'Small red/purple spots on skin that don\'t blanch with pressure' },
      { term: 'Pincer grasp', definition: 'Ability to pick up objects with thumb and index finger' },
      { term: 'Purpura', definition: 'Purple discoloration from bleeding under the skin' },
      { term: 'Retractions', definition: 'Sinking in of chest wall during breathing, sign of respiratory distress' },
      { term: 'Stridor', definition: 'High-pitched breathing sound, typically on inspiration' },
      { term: 'Tachypnea', definition: 'Abnormally rapid breathing' },
      { term: 'Tenting', definition: 'Skin that remains raised when pinched, sign of dehydration' },
      { term: 'Wheezing', definition: 'High-pitched whistling sound during breathing' },
    ],
  },
  {
    category: 'Developmental Terms',
    terms: [
      { term: 'Babbling', definition: 'Repetitive consonant-vowel sounds (ba-ba, da-da)' },
      { term: 'Cooing', definition: 'Early vowel sounds made by infants around 2 months' },
      { term: 'Gross motor', definition: 'Large muscle movements (rolling, sitting, walking)' },
      { term: 'Fine motor', definition: 'Small muscle movements (grasping, writing)' },
      { term: 'Milestone', definition: 'Developmental skill achieved by a certain age' },
      { term: 'Red flag', definition: 'Developmental warning sign requiring evaluation' },
      { term: 'Regression', definition: 'Loss of previously acquired developmental skills' },
      { term: 'Stranger anxiety', definition: 'Fear of unfamiliar people, typically emerges around 6-9 months' },
    ],
  },
]

export default function Glossary() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredTerms = glossaryTerms.map((category) => ({
    ...category,
    terms: category.terms.filter(
      (term) =>
        (selectedCategory === null || category.category === selectedCategory) &&
        (term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
          term.definition.toLowerCase().includes(searchTerm.toLowerCase()))
    ),
  })).filter((category) => category.terms.length > 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-primary mb-2">
          Glossary
        </h1>
        <p className="text-lg text-muted-foreground">
          Pediatric terms, abbreviations, and definitions
        </p>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <input
            type="text"
            placeholder="Search terms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-input bg-background"
          />
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            {glossaryTerms.map((category) => (
              <Button
                key={category.category}
                variant={selectedCategory === category.category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.category)}
              >
                {category.category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Terms */}
      {filteredTerms.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No terms found matching your search.
          </CardContent>
        </Card>
      ) : (
        filteredTerms.map((category) => (
          <Card key={category.category}>
            <CardHeader>
              <CardTitle>{category.category}</CardTitle>
              <CardDescription>{category.terms.length} terms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {category.terms.map((item, idx) => (
                  <div key={idx} className="pb-4 border-b border-border last:border-0">
                    <div className="font-semibold text-primary mb-1">{item.term}</div>
                    <div className="text-sm text-muted-foreground">{item.definition}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
