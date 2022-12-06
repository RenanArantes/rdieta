import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { PersonContext } from '../../../contexts/Person'
import { Button } from '../../Button'

interface TotalKcal {
  dailyActivity: 'sedentary' | 'moderate' | 'high'
  workoutIntensity: 'adaptiation' | 'beginner' | 'intermediary' | 'advanced'
  cardioIntensity: 'low' | 'medium' | 'high'
}

const totalKcalZodValidationSchema = zod.object({
  dailyActivity: zod.enum(['sedentary', 'moderate', 'high']),
  workoutIntensity: zod.enum([
    'adaptiation',
    'beginner',
    'intermediary',
    'advanced',
  ]),
  cardioIntensity: zod.enum(['low', 'medium', 'high']),
})

type TotalKcalFormData = zod.infer<typeof totalKcalZodValidationSchema>

export function TotalKcalForm() {
  const {
    personData: { bmr },
    changeKcalSpenders,
  } = useContext(PersonContext)

  const { register, handleSubmit, reset } = useForm<TotalKcalFormData>({
    resolver: zodResolver(totalKcalZodValidationSchema),
  })

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

  function handleTotalKcal(data: TotalKcal) {
    console.log('data')
    const { dailyActivity, workoutIntensity, cardioIntensity } = data
    console.log(data)

    const dailyActivityValue = createDailyActivityValue(dailyActivity)
    const workoutIntensityValue = createWorkoutIntensityValue(workoutIntensity)
    const cardioIntensityValue = createCardioIntensityValue(cardioIntensity)

    const bmrPlusDailyActivity = dailyActivityValue * bmr

    const totaKcalSum =
      bmrPlusDailyActivity + workoutIntensityValue + cardioIntensityValue

    changeKcalSpenders(
      { dailyActivity, workoutIntensity, cardioIntensity },
      totaKcalSum,
    )

    reset()
  }

  return (
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
          <option value="low">Baixa</option>
          <option value="medium">Média</option>
          <option value="high">Alta</option>
        </select>
      </span>
      <span>
        <label>Intensidade do treino: </label>
        <select defaultValue="" {...register('workoutIntensity')}>
          <option value="" disabled>
            Selecione uma opção
          </option>
          <option value="adptation">Adaptação</option>
          <option value="beginner">Iniciante</option>
          <option value="intermediary">Intermediário</option>
          <option value="advanced">Avançado</option>
        </select>
      </span>
      <Button type="submit">Enviar</Button>
    </form>
  )
}
