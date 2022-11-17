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

  const [mealName, setMealName] = useState('')

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
            <div>
              <label>Nome da Refeição</label>{' '}
              <input
                type="text"
                value={mealName}
                onChange={(e) => setMealName(e.target.value)}
              />
            </div>
            <button type="button" onClick={handleDisplayModal}>
              Adicionar Alimentos
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
          mealName={mealName}
        />
      </div>
    </div>
  )
}
