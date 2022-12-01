import { useContext } from 'react'
import { useRouter } from 'next/router'
import { PersonContext } from '../contexts/Person'
import { BMRForm } from '../components/forms/BMRForm'
import { TotalKcalForm } from '../components/forms/TotalKcalForm'

export default function Home() {
  const {
    personData: { bmr, totalCaloricSpending },
  } = useContext(PersonContext)

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
      <button type="button" onClick={() => push('/diet')}>
        Ir para Dieta
      </button>
    </div>
  )
}
