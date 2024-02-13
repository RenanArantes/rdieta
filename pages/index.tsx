import { useContext } from 'react'
import { PersonContext } from '../contexts/Person'
import { BMRForm } from '../components/forms/BMRForm'
import { TotalKcalForm } from '../components/forms/TotalKcalForm'
import { DataContainer, FormContainer, HomeContainer } from '../styles/pages'
import { Title } from '../components/Title'
import { Calculator } from 'phosphor-react'
import { DietContext } from '../contexts/Diet'
import { DietForm } from '../components/forms/DietForm'
import { NutritionalStrategyForm } from '../components/forms/NutritionalStrategyForm'
import { Modal } from '../components/Modal'
import MacrosInformer from '../components/MacrosInformer'
import getTotalKcal from '../utils/getTotalKcal'

export default function Home() {
  const {
    personData: { bmr, totalCaloricSpending },
  } = useContext(PersonContext)
  const { dietData } = useContext(DietContext)

  const { dietType, metaKcal } = dietData

  return (
    <HomeContainer>
      {bmr ? (
        <FormContainer>
          <DataContainer>
            <Title>
              Sua Taxa de Metabolismo Basal é de aproximadamente:{' '}
              <strong>{bmr}</strong> kcal
            </Title>

            <Modal
              buttonTitle="TMB"
              icon={<Calculator size={32} />}
              title="Taxa de Metabolismo Basal"
            >
              <BMRForm />
            </Modal>
          </DataContainer>
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
            <Modal
              buttonTitle="Gasto Kcal"
              icon={<Calculator size={32} />}
              title="Gasto Calórico Total"
            >
              <TotalKcalForm />
            </Modal>
          </DataContainer>
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
            <Modal
              buttonTitle="Tipo"
              icon={<Calculator size={32} />}
              title="Tipo da Dieta"
            >
              <DietForm />
            </Modal>
          </DataContainer>
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
              <MacrosInformer
                macrosData={{
                  cho: metaKcal.cho,
                  ptn: metaKcal.ptn,
                  lip: metaKcal.lip,
                  kcal: getTotalKcal(metaKcal.cho, metaKcal.ptn, metaKcal.lip),
                }}
              />
            </div>
            <Modal
              buttonTitle="Estratégia"
              icon={<Calculator size={32} />}
              title="Tipo da Dieta"
            >
              <NutritionalStrategyForm />
            </Modal>
          </DataContainer>
        </FormContainer>
      ) : (
        <FormContainer>
          <NutritionalStrategyForm />
        </FormContainer>
      )}
      {/* <BottomMultiStep /> */}
    </HomeContainer>
  )
}
