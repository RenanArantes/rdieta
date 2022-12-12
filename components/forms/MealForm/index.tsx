import { Plus } from 'phosphor-react'
import { useContext, useState } from 'react'
import Food from '../../../@types/food'
import { DietContext } from '../../../contexts/Diet'
import { Button } from '../../Button'
import { Title } from '../../Title'
import { MealFormModal } from './MealFormModal'
import { MealFormContainer, MealModalContainer, ModalButton } from './styles'

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
    <MealFormContainer>
      <Title>Monte sua refeição</Title>
      <ModalButton type="button" onClick={handleDisplayModal}>
        <div>
          <Plus size={18} weight="bold" />
        </div>
      </ModalButton>
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
    </MealFormContainer>
  )
}
