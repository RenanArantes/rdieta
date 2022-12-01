import { useContext, useState } from 'react'
import Food from '../../../@types/food'
import { DietContext } from '../../../contexts/Diet'
import { MealFormModal } from './MealFormModal'

interface MealFormProps {
  foods: Food[]
  categories: string[]
}

export function MealForm({ foods, categories }: MealFormProps) {
  const { mealFraction } = useContext(DietContext)

  const [isDisplayed, setIsDisplayed] = useState('none')
  const [isOpen, setIsOpen] = useState(false)

  function handleDisplayModal() {
    isOpen ? setIsDisplayed('none') : setIsDisplayed('block')

    setIsOpen(!isOpen)
  }

  return (
    <div>
      <h1>Meal Form</h1>
      <div>
        <label>Adicionar refeição</label>
        <button type="button" onClick={handleDisplayModal}>
          <strong>+</strong>
        </button>
      </div>
      <div
        style={{
          display: isDisplayed,
          position: 'fixed',
          zIndex: 1,
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }}
      >
        <MealFormModal
          handleDisplayModal={handleDisplayModal}
          foodList={foods}
          categories={categories}
        />
      </div>
    </div>
  )
}
