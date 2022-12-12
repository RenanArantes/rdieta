import { useState } from 'react'
import Food from '../../../@types/food'
import { Button } from '../../Button'
import { MealUpdateFormModal } from './MealUpdateFormModal'
import { MealModalContainer, MealUpdateFormContainer } from './styles'

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
    <MealUpdateFormContainer>
      <Button
        onClick={() => {
          handleDisplayModal()
        }}
      >
        Modal
      </Button>
      <MealModalContainer isDisplayed={isDisplayed}>
        <MealUpdateFormModal
          handleDisplayModal={handleDisplayModal}
          foodList={foods}
          categories={categories}
          mealToEdit={mealToEdit}
        />
      </MealModalContainer>
    </MealUpdateFormContainer>
  )
}
