import { useContext } from 'react'
import { useRouter } from 'next/router'
import { PersonContext } from '../contexts/Person'
import { BMRForm } from '../components/forms/BMRForm'
import { TotalKcalForm } from '../components/forms/TotalKcalForm'
import { StepContext } from '../contexts/Step'
import { BottomMultiStep } from '../components/BottomMultiStep'
import { Button } from '../components/Button'

export default function Home() {
  const {
    personData: { bmr, totalCaloricSpending },
  } = useContext(PersonContext)
  const { step, currentStep } = useContext(StepContext)

  const { push } = useRouter()

  return (
    <div>
      <div>
        <BMRForm />
        <div>
          {bmr && (
            <h2>
              Sua Taxa de Metabolismo Basal é de aproximadamente: {bmr} kcal
            </h2>
          )}
        </div>
      </div>
      <hr />
      <div>
        <TotalKcalForm />
        <div>
          {totalCaloricSpending && (
            <h2>Gasto Calórico total: {totalCaloricSpending}</h2>
          )}
        </div>
      </div>
      <Button type="button" onClick={() => push('/diet')}>
        Ir para Dieta
      </Button>
      <BottomMultiStep step={step} currentStep={currentStep} />
    </div>
  )
}
