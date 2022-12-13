import { useContext } from 'react'
import { PersonContext } from '../contexts/Person'
import { BMRForm } from '../components/forms/BMRForm'
import { TotalKcalForm } from '../components/forms/TotalKcalForm'
import { StepContext } from '../contexts/Step'
import { BottomMultiStep } from '../components/BottomMultiStep'

export default function Home() {
  const {
    personData: { bmr, totalCaloricSpending },
  } = useContext(PersonContext)
  const { step, currentStep } = useContext(StepContext)

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
      <BottomMultiStep step={step} currentStep={currentStep} />
    </div>
  )
}
