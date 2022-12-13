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
`
export const DataContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
export const BmrContainer = styled.div`
  margin: 10px 0;
`
