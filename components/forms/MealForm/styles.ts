import styled from 'styled-components'
import { Button } from '../../Button'

export const MealFormContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const ModalButton = styled(Button)`
  width: 32px;
  height: 32px;
  border-radius: 999px;

  transition: 0.2s;

  &:hover {
    border: none;
    box-shadow: 0 0 0 1px ${(props) => props.theme.white};
  }

  svg {
    margin-top: 3px;
  }
`

export const MealModalContainer = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
`
