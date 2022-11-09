import axios from 'axios'
import { useForm } from 'react-hook-form'
import { GetServerSideProps } from 'next'
import { useState } from 'react'

interface Food {
  id: number
  description: string
  energy_kcal: number
}

interface BenedictEquation {
  weight: number
  height: number
  age: number
  gender: 'male' | 'female'
}

interface TotalKcal {
  dailyActivity: 'sedentary' | 'moderate' | 'high'
  workoutIntensity: 'adaptiation' | 'beginner' | 'intermediary' | 'advanced'
  cardioIntensity: 'low' | 'medium' | 'high'
}

interface HomeProps {
  foods: Food[]
}

export default function Home({ foods }: HomeProps) {
  const [bmr, setBmr] = useState(0)
  const [totalBmr, setTotalBmr] = useState(0)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  function handleBenedictEquation(data: BenedictEquation) {
    console.log('data: ')
    console.log(data)

    const { gender, weight, height, age } = data

    // Equação de Harris-Benedict
    if (gender === 'male') {
      const calculedWeight = 13.8 * weight
      const calculedHeight = 5 * height
      const calculedAge = 6.8 * age

      console.log(`PesoC:${calculedWeight}`)
      console.log(`AlturaC:${calculedHeight}`)
      console.log(`IdadeC:${calculedAge}`)

      setBmr(66 + (calculedWeight + calculedHeight) - calculedAge)
    }

    reset()
  }

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

    console.log(`TMB+Trabalho Diário ${bmrPlusDailyActivity}`)

    setTotalBmr(
      bmrPlusDailyActivity + workoutIntensityValue + cardioIntensityValue,
    )
    console.log(totalBmr)
    reset()
  }

  return (
    <div>
      <h1>Rdieta</h1>
      {bmr === 0 ? (
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
          onSubmit={handleSubmit(handleBenedictEquation)}
        >
          <span>
            <label>Peso:</label>
            <input
              type="number"
              min="0.00"
              max="500.0"
              step="0.1"
              value="66.6"
              placeholder="Peso em kg"
              {...register('weight')}
            />
          </span>
          <span>
            <label>Altura:</label>
            <input
              type="number"
              min="0.00"
              max="500.0"
              step="0.1"
              value="170"
              placeholder="Altura em cm"
              {...register('height')}
            />
          </span>
          <span>
            <label>Peso:</label>
            <input
              type="number"
              min="1"
              max="135"
              step="1"
              value="27"
              placeholder="Idade"
              {...register('age')}
            />
          </span>
          <span>
            <label>Gênero:</label>
            <select defaultValue="male" {...register('gender')}>
              <option value="" disabled>
                Selecione uma opção
              </option>
              <option value="male" selected>
                Masculino
              </option>
              <option value="female">Feminino</option>
            </select>
          </span>
          <input type="submit" />
        </form>
      ) : (
        <>
          <div>
            <p>
              Sua Taxa de Metabolismo Basal é de aproximadamente:{' '}
              <strong>{bmr} kcal</strong>
            </p>
            <button type="button" onClick={() => setBmr(0)}>
              Recarcular Basal
            </button>
          </div>
          <hr />
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
        </>
      )}
      {/* <div>
        <ul>
          {foods &&
            foods.map((food) => {
              return (
                <div key={food.id}>
                  <li>
                    Comida: <strong>{food.description}</strong>
                    <br />
                    Calorias: <strong>{food.energy_kcal}</strong>
                  </li>
                  <hr />
                </div>
              )
            })}
        </ul>
      </div> */}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await axios.get<Food[]>('http://localhost:3000/api/foods')

  const fetchedFoods = response.data.map((food) => {
    return food
  })

  return {
    props: {
      foods: fetchedFoods,
    },
  }
}
