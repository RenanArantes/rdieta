import styled from 'styled-components'

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
`
interface HomeAccordionProps {
  show: boolean
}

export const HomeAccordion = styled.div<HomeAccordionProps>`
  display: ${(props) => (props.show ? 'block' : 'none')};

  margin: 0 auto;
`
export const DataContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;

  align-items: center;
`
export const FormContainer = styled.div`
  margin: 10px 0;
`
