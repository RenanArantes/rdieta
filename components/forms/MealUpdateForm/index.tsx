import { useState } from 'react'
import Food from '../../../@types/food'
import { Button } from '../../Button'
import { MealUpdateFormModal } from './MealUpdateFormModal'

interface MealUpdateFormProps {
  foods: Food[]
  categories: string[]
  mealToEdit?: any
}

export function MealUpdateForm({
  foods,
  categories,
  mealToEdit,
}: MealUpdateFormProps) {
  const [isDisplayed, setIsDisplayed] = useState('none')
  const [isOpen, setIsOpen] = useState(false)

  function handleDisplayModal() {
    isOpen ? setIsDisplayed('none') : setIsDisplayed('block')

    setIsOpen(!isOpen)
  }

  return (
    <>
      <Button
        onClick={() => {
          handleDisplayModal()
        }}
      >
        Modal
      </Button>
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
        <MealUpdateFormModal
          handleDisplayModal={handleDisplayModal}
          foodList={foods}
          categories={categories}
          mealToEdit={mealToEdit}
        />
      </div>
    </>
  )
}
