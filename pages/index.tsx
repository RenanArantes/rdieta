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

export default function Home() {
  const {
    personData: { bmr, totalCaloricSpending },
  } = useContext(PersonContext)
  const { step, currentStep } = useContext(StepContext)

  const [bmrAccordion, setBmrAccordion] = useState(false)
  const [totalKcalAccordion, setTotalKcalAccordion] = useState(false)

  function handleBmrAccordion() {
    setBmrAccordion((state) => !bmrAccordion)
  }

  function handleTotalKcalAccordion() {
    setTotalKcalAccordion((state) => !totalKcalAccordion)
  }

  return (
    <HomeContainer>
      <FormContainer>
        <DataContainer>
          <Title>
            Sua Taxa de Metabolismo Basal é de aproximadamente:{' '}
            <strong>{bmr}</strong> kcal
          </Title>
          <Button onClick={() => handleBmrAccordion()}>
            Recalcular
            <Calculator size={32} />
          </Button>
        </DataContainer>
        <HomeAccordion show={bmrAccordion}>
          <BMRForm />
        </HomeAccordion>
      </FormContainer>
      <FormContainer>
        <DataContainer>
          <Title>
            Gasto Calórico total: <strong>{totalCaloricSpending}</strong> kcal
          </Title>
          <Button onClick={() => handleTotalKcalAccordion()}>
            Recalcular
            <Calculator size={32} />
          </Button>
        </DataContainer>
        <HomeAccordion show={totalKcalAccordion}>
          <TotalKcalForm />
        </HomeAccordion>
      </FormContainer>
      <BottomMultiStep step={step} currentStep={currentStep} />
    </HomeContainer>
  )
}
