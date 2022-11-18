import { useState } from 'react'
import { MealFormModal } from './MealFormModal'

interface Food {
  id: number
  description: string
  category: string
  energy_kcal: number
  protein_g: number
  lipid_g: number
  carbohydrate_g: number
}

interface MealFormProps {
  mealFraction: number
  foods: Food[]
  categories: string[]
}

export function MealForm({ mealFraction, foods, categories }: MealFormProps) {
  const [isDisplayed, setIsDisplayed] = useState('none')
  const [isOpen, setIsOpen] = useState(false)

  function handleDisplayModal() {
    isOpen ? setIsDisplayed('none') : setIsDisplayed('block')

    setIsOpen(!isOpen)
  }

  return (
    <div
      style={{
        border: '2px solid red',
      }}
    >
      <h1>Meal Form</h1>
      {[...Array(mealFraction)].map((value, index) => {
        return (
          <div
            style={{
              border: '3px solid purple',
            }}
            key={index}
          >
            <label>
              Criar refeição <strong>{index + 1}</strong>{' '}
            </label>
            <button type="button" onClick={handleDisplayModal}>
              +
            </button>
          </div>
        )
      })}
      <div
        style={{
          display: isDisplayed,
          position: 'fixed',
          zIndex: 1,
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          overflow: 'auto',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }}
      >
        <MealFormModal
          handleDisplayModal={handleDisplayModal}
          foods={foods}
          categories={categories}
        />
      </div>
    </div>
  )
}
