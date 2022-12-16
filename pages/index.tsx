import { useContext, useState } from 'react'
import { PersonContext } from '../contexts/Person'
import { BMRForm } from '../components/forms/BMRForm'
import { TotalKcalForm } from '../components/forms/TotalKcalForm'
import { StepContext } from '../contexts/Step'
import { BottomMultiStep } from '../components/BottomMultiStep'
import {
  DataContainer,
  FormContainer,
  HomeAccordion,
  HomeContainer,
} from '../styles/pages'
import { Title } from '../components/Title'
import { Calculator } from 'phosphor-react'
import { Button } from '../components/Button'
import { Accordion } from '../components/Accordion'

export default function Home() {
  const {
    personData: { bmr, totalCaloricSpending },
  } = useContext(PersonContext)
  const { step, currentStep } = useContext(StepContext)

  const [bmrAccordion, setBmrAccordion] = useState(false)
  const [totalKcalAccordion, setTotalKcalAccordion] = useState(false)

  return (
    <HomeContainer>
      <FormContainer>
        <DataContainer>
          <Title>
            Sua Taxa de Metabolismo Basal é de aproximadamente:{' '}
            <strong>{bmr}</strong> kcal
          </Title>
          <Button onClick={() => setBmrAccordion(!bmrAccordion)}>
            <label>Recalcular</label>
            <Calculator size={32} />
          </Button>
        </DataContainer>
        <Accordion isDisplayed={bmrAccordion}>
          <BMRForm />
        </Accordion>
      </FormContainer>
      <FormContainer>
        <DataContainer>
          <Title>
            Gasto Calórico total: <strong>{totalCaloricSpending}</strong> kcal
          </Title>
          <Button onClick={() => setTotalKcalAccordion(!totalKcalAccordion)}>
            <label>Recalcular</label>
            <Calculator size={32} />
          </Button>
        </DataContainer>
        <Accordion isDisplayed={totalKcalAccordion}>
          <TotalKcalForm />
        </Accordion>
      </FormContainer>
      <BottomMultiStep step={step} currentStep={currentStep} />
    </HomeContainer>
  )
}
