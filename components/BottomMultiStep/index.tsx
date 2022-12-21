import { useContext } from 'react'
import { StepContext } from '../../contexts/Step'
import { Subtitle } from '../Subtitle'
import { Label, MultiStepContainer, Step, Steps } from './styles'

export function BottomMultiStep() {
  const { stepTexts, step, currentStep } = useContext(StepContext)

  const displayStep = currentStep >= step ? 'none' : 'block'

  return (
    <MultiStepContainer style={{ display: displayStep }}>
      <Label>
        <Subtitle>
          Passo <strong>{currentStep}</strong> de <strong>{step}</strong>
        </Subtitle>
        <Steps steps={step}>
          {Array.from({ length: step }, (_, i) => i + 1).map((step, index) => {
            return (
              <Step
                key={step}
                active={currentStep >= step}
                title={stepTexts[index]}
              />
            )
          })}
        </Steps>
      </Label>
    </MultiStepContainer>
  )
}
