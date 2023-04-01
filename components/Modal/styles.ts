import styled from 'styled-components'

interface MealModalContainerProps {
  isDisplayed: string
}

export const FormContainer = styled.div`
  margin-right: 7px;
`

export const ModalContainer = styled.div<MealModalContainerProps>`
  display: ${(props) => props.isDisplayed};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
`
