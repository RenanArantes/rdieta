import { useContext, useState } from 'react'
import { PersonContext } from '../contexts/Person'
import { BMRForm } from '../components/forms/BMRForm'
import { TotalKcalForm } from '../components/forms/TotalKcalForm'
import { StepContext } from '../contexts/Step'
import { BottomMultiStep } from '../components/BottomMultiStep'
import { DataContainer, FormContainer, HomeContainer } from '../styles/pages'
import { Title } from '../components/Title'
import { Calculator } from 'phosphor-react'
import { Button } from '../components/Button'
import { Accordion } from '../components/Accordion'
import { DietContext } from '../contexts/Diet'
import { DietForm } from '../components/forms/DietForm'
import { List } from '../components/List'
import { NutritionalStrategyForm } from '../components/forms/NutritionalStrategyForm'
import { Subtitle } from '../components/Subtitle'

export default function Home() {
  const {
    personData: { bmr, totalCaloricSpending },
  } = useContext(PersonContext)
  const { step, currentStep } = useContext(StepContext)
  const { dietData } = useContext(DietContext)

  console.log(dietData)

  const { dietType, metaKcal } = dietData

  const [bmrAccordion, setBmrAccordion] = useState(false)
  const [totalKcalAccordion, setTotalKcalAccordion] = useState(false)
  const [dietTypeAccordion, setDietTypeAccordion] = useState(false)
  const [nutritionalStrategyAccordion, setNutritionalStrategyAccordion] =
    useState(false)

  return (
    <HomeContainer>
      {bmr ? (
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
      ) : (
        <FormContainer>
          <BMRForm />
        </FormContainer>
      )}
      {totalCaloricSpending ? (
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
      ) : (
        <FormContainer>
          <TotalKcalForm />
        </FormContainer>
      )}
      {dietType ? (
        <FormContainer>
          <DataContainer>
            <Title>
              O gasto calórico da sua dieta é de:{' '}
              <strong>{dietType.dietKcal}</strong> kcal
            </Title>
            <Button onClick={() => setDietTypeAccordion(!dietTypeAccordion)}>
              <label>Recalcular</label>
              <Calculator size={32} />
            </Button>
          </DataContainer>
          <Accordion isDisplayed={dietTypeAccordion}>
            <DietForm />
          </Accordion>
        </FormContainer>
      ) : (
        <FormContainer>
          <DietForm />
        </FormContainer>
      )}
      {metaKcal ? (
        <FormContainer>
          <DataContainer>
            <div>
              <Title>Sua meta de macros nutrientes</Title>
              <List>
                <li>
                  Carboidrato: <strong>{metaKcal.cho}</strong>g
                </li>
                <li>
                  Proteína: <strong>{metaKcal.ptn}</strong>g
                </li>
                <li>
                  Gordura: <strong>{metaKcal.lip}</strong>g
                </li>
              </List>
            </div>
            <Button
              onClick={() =>
                setNutritionalStrategyAccordion(!nutritionalStrategyAccordion)
              }
            >
              <label>Recalcular</label>
              <Calculator size={32} />
            </Button>
          </DataContainer>
          <Accordion isDisplayed={nutritionalStrategyAccordion}>
            <NutritionalStrategyForm />
          </Accordion>
        </FormContainer>
      ) : (
        <FormContainer>
          <NutritionalStrategyForm />
        </FormContainer>
      )}
      <BottomMultiStep step={step} currentStep={currentStep} />
    </HomeContainer>
  )
}
