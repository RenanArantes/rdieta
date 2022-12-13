import { useContext, useState } from 'react'
import { PersonContext } from '../contexts/Person'
import { BMRForm } from '../components/forms/BMRForm'
import { TotalKcalForm } from '../components/forms/TotalKcalForm'
import { StepContext } from '../contexts/Step'
import { BottomMultiStep } from '../components/BottomMultiStep'
import {
  BmrContainer,
  DataContainer,
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

  const [bmrAccordion, setBmrAccordion] = useState(true)
  const [totalKcalAccordion, setTotalKcalAccordion] = useState(true)

  function handleBmrAccordion() {
    setBmrAccordion((state) => !bmrAccordion)
  }

  function handleTotalKcalAccordion() {
    setTotalKcalAccordion((state) => !totalKcalAccordion)
  }

  return (
    <HomeContainer>
      <BmrContainer>
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
      </BmrContainer>
      <BmrContainer>
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
      </BmrContainer>
      <BottomMultiStep step={step} currentStep={currentStep} />
    </HomeContainer>
  )
}
