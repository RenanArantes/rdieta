import React, { ReactElement, ReactNode, useState } from 'react'
import { Button } from '../Button'
import { ModalContainer, FormContainer, ChildrenContainer } from './styles'
import { Title } from '../Title'
import { X } from 'phosphor-react'

interface FormProps {
  icon?: ReactNode
  buttonTitle?: string
  children: ReactElement
  title?: string
}

export function Modal({
  children,
  buttonTitle = 'Modal',
  icon,
  title = ' ',
}: FormProps) {
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

        <ChildrenContainer>
          <div>
            <Title>{title}</Title>
            <X size={32} onClick={() => handleDisplayModal()} />
          </div>
          {React.cloneElement(children, { handleDisplayModal })}
        </ChildrenContainer>
      </ModalContainer>
    </FormContainer>
  )
}
