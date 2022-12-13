import { Subtitle } from '../Subtitle'
import { Label, MultiStepContainer, Step, Steps } from './styles'

interface BottomMultiStepProps {
  step: number
  currentStep: number
}

export function BottomMultiStep({ step, currentStep }: BottomMultiStepProps) {
  const displayStep = currentStep >= step ? 'none' : 'block'

  return (
    <MultiStepContainer style={{ display: displayStep }}>
      <Label>
        <Subtitle>
          Passo <strong>{currentStep}</strong> de <strong>{step}</strong>
        </Subtitle>
        <Steps steps={step}>
          {Array.from({ length: step }, (_, i) => i + 1).map((step) => {
            return <Step key={step} active={currentStep >= step} />
          })}
        </Steps>
      </Label>
    </MultiStepContainer>
  )
}
