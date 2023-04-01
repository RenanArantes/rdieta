import React, { ReactElement, ReactNode, useState } from 'react'
import { Button } from '../Button'
import { ModalContainer, FormContainer } from './styles'

interface FormProps {
  icon?: ReactNode
  buttonTitle?: string
  children: ReactElement
}

export function Modal({ children, buttonTitle = 'Modal', icon }: FormProps) {
  const [isDisplayed, setIsDisplayed] = useState('none')
  const [isOpen, setIsOpen] = useState(false)

  function handleDisplayModal() {
    isOpen ? setIsDisplayed('none') : setIsDisplayed('block')

    setIsOpen(!isOpen)
  }

  return (
    <FormContainer>
      <Button
        onClick={() => {
          handleDisplayModal()
        }}
      >
        {icon}
        <span>{buttonTitle}</span>
      </Button>
      <ModalContainer isDisplayed={isDisplayed}>
        {/* <MealUpdateFormModal handleDisplayModal={handleDisplayModal} /> */}
        {React.cloneElement(children, { handleDisplayModal })}
      </ModalContainer>
    </FormContainer>
  )
}
