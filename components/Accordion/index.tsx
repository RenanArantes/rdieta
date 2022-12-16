import { ReactNode } from 'react'
import { AccordionContainer } from './styles'

interface AccordionProps {
  children?: ReactNode | ReactNode[]
  isDisplayed: boolean
}

export function Accordion({ children, isDisplayed }: AccordionProps) {
  return (
    <AccordionContainer>
      <div style={{ display: isDisplayed ? 'block' : 'none' }}>{children}</div>
    </AccordionContainer>
  )
}
