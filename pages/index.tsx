import { useForm } from 'react-hook-form'
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { PersonContext } from '../contexts/Person'
import { BMRForm } from '../components/forms/BMRForm'

interface TotalKcal {
  dailyActivity: 'sedentary' | 'moderate' | 'high'
  workoutIntensity: 'adaptiation' | 'beginner' | 'intermediary' | 'advanced'
  cardioIntensity: 'low' | 'medium' | 'high'
}

interface HomeProps {}

export default function Home(props: HomeProps) {
  const { personData, createPersonData, bmr } = useContext(PersonContext)

  const [gender, setGender] = useState('' as 'male' | 'female')

  const [totalCaloricSpending, setTotalCaloricSpending] = useState(0)

  const { push } = useRouter()

  const { register, handleSubmit, reset } = useForm()

  function handleTotalKcal(data: TotalKcal) {
    console.log('data')
    const { dailyActivity, workoutIntensity, cardioIntensity } = data
    console.log(data)

    function createDailyActivityValue(
      dailyActivityString: 'sedentary' | 'moderate' | 'high',
    ) {
      switch (dailyActivityString) {
        case 'sedentary':
          return 1.2 as number
        case 'moderate':
          return 1.3 as number
        case 'high':
          return 1.4 as number
      }
    }

    function createWorkoutIntensityValue(
      workoutIntensityString:
        | 'adaptiation'
        | 'beginner'
        | 'intermediary'
        | 'advanced',
    ) {
      switch (workoutIntensityString) {
        case 'adaptiation':
          return 200 as number
        case 'beginner':
          return 300 as number
        case 'intermediary':
          return 375 as number
        case 'advanced':
          return 550 as number
      }
    }

    function createCardioIntensityValue(cardioIntensity: string) {
      switch (cardioIntensity) {
        case 'low':
          return 181.5
        case 'medium':
          return 300
        case 'high':
          return 425
        default:
          return 181.5
      }
    }

    const dailyActivityValue = createDailyActivityValue(dailyActivity)
    const workoutIntensityValue = createWorkoutIntensityValue(workoutIntensity)
    const cardioIntensityValue = createCardioIntensityValue(cardioIntensity)

    const bmrPlusDailyActivity = dailyActivityValue * bmr

    const totaKcalSum =
      bmrPlusDailyActivity + workoutIntensityValue + cardioIntensityValue

    setTotalCaloricSpending((state) => totaKcalSum)

    createPersonData({
      bmr,
      gender,
      kcalSpender: {
        cardioIntensity,
        dailyActivity,
        workoutIntensity,
      },
      totalCaloricSpending: totaKcalSum,
    })
  }

  return (
    <div>
      <h1>Rdieta</h1>
      <div>
        <BMRForm />
        <div>
          <h2>
            Sua Taxa de Metabolismo Basal é de aproximadamente: {personData.bmr}{' '}
            kcal
          </h2>
        </div>
      </div>
      <hr />
      <div>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
          onSubmit={handleSubmit(handleTotalKcal)}
        >
          <span>
            <label>Atividade Diária: </label>
            <select defaultValue="" {...register('dailyActivity')}>
              <option value="" disabled>
                Selecione uma opção
              </option>
              <option value="sedentary">Sedentário</option>
              <option value="moderate">Moderado</option>
              <option value="high">Alto</option>
            </select>
          </span>
          <span>
            <label>Intensidade do cardio: </label>
            <select defaultValue="" {...register('cardioIntensity')}>
              <option value="" disabled>
                Selecione uma opção
              </option>
              <option value="beginner">Baixa</option>
              <option value="intermediary">Média</option>
              <option value="advanced">Alta</option>
            </select>
          </span>
          <span>
            <label>Intensidade do treino: </label>
            <select defaultValue="" {...register('workoutIntensity')}>
              <option value="" disabled>
                Selecione uma opção
              </option>
              <option value="beginner">Iniciante</option>
              <option value="intermediary">Intermediário</option>
              <option value="advanced">Avançado</option>
            </select>
          </span>
          <input type="submit" />
        </form>
        <h2>Gasto Calórico total: {totalCaloricSpending}</h2>
        <button type="button" onClick={() => push('/diet')}>
          Ir para Dieta
        </button>
      </div>
    </div>
  )
}
