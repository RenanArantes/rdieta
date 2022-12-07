import { useContext, useState } from 'react'
import Food from '../../../@types/food'
import { DietContext } from '../../../contexts/Diet'
import { Button } from '../../Button'
import { Title } from '../../Title'
import { MealFormModal } from './MealFormModal'
import { MealModalContainer } from './styles'

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
      <Title>Meal Form</Title>
      <div>
        <label>Adicionar refeição</label>
        <Button type="button" onClick={handleDisplayModal}>
          <strong>+</strong>
        </Button>
      </div>
      <MealModalContainer
        style={{
          display: isDisplayed,
        }}
      >
        <MealFormModal
          handleDisplayModal={handleDisplayModal}
          foodList={foods}
          categories={categories}
        />
      </MealModalContainer>
    </div>
  )
}
