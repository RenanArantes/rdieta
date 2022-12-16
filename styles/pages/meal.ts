import styled from 'styled-components'

export const DietContainer = styled.div`
  display: flex;
  flex-direction: column;
`
interface DietAccordionProps {
  show: boolean
}

export const DietAccordion = styled.div<DietAccordionProps>`
  display: ${(props) => (props.show ? 'block' : 'none')};
`
export const DataContainer = styled.div`
  display: flex;
  justify-content: space-between;

  align-items: center;
`
export const FormContainer = styled.div`
  margin: 10px 0;
`
