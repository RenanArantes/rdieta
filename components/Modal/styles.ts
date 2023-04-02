import styled from 'styled-components'

export const FormContainer = styled.div`
  margin-right: 7px;
`

interface MealModalContainerProps {
  isDisplayed: string
}

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

export const ChildrenContainer = styled.div`
  margin: 0 auto;
  width: 30%;
  margin-top: 150px;

  padding: 6px;
  min-height: 250px;

  background-color: ${(props) => props.theme.blueColors[800]};
  border: 2px solid ${(props) => props.theme.blueColors[400]};
  border-radius: 6px;

  @media (max-width: 920px) {
    width: 80%;
    margin-top: 35%;
  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    margin: 10px;
  }
`
