import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { DietContext } from '../../../contexts/Diet'

interface NutritionalStrategyType {
  nutritionalStrategy: 'corporalWeight' | 'percentualMacros'
}

const nutritionalStrategyZodValidationSchema = zod.object({
  nutritionalStrategy: zod.enum(['corporalWeight', 'percentualMacros']),
})

type NutritionalStrategyFormData = zod.infer<
  typeof nutritionalStrategyZodValidationSchema
>

export function NutritionalStrategyForm() {
  const { createDietKcalMeta, dietData } = useContext(DietContext)

  const { register, handleSubmit, reset } =
    useForm<NutritionalStrategyFormData>({
      resolver: zodResolver(nutritionalStrategyZodValidationSchema),
    })
  function handleNutritionalStrategy({
    nutritionalStrategy,
  }: NutritionalStrategyType) {
    console.log('nutritional strategy')
    console.log(nutritionalStrategy)

    if (nutritionalStrategy === 'percentualMacros') {
      createDietKcalMeta({
        cho: (dietData.dietType.dietKcal * 0.4) / 4, // 40% de caloria * 4 valor kcal da caloria,
        ptn: (dietData.dietType.dietKcal * 0.4) / 4, // 40% de proteina * 4 valor kcal da proteina,
        lip: (dietData.dietType.dietKcal * 0.2) / 9, // 20% de gordura * 9 valor kcal da gordura,
      })
    }

    reset()
  }

  return (
    <form
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
      onSubmit={handleSubmit(handleNutritionalStrategy)}
    >
      <span>
        <label>Estratégia nutricional: </label>
        <select defaultValue="" {...register('nutritionalStrategy')}>
          <option value="" disabled>
            Selecione uma opção
          </option>
          <option value="percentualMacros">CHO:40% - PTN:40% - LIP:20%</option>
          <option value="corporalWeight">CHO:4g - PTN:2g - LIP:1g</option>
        </select>
      </span>
      {'  '}
      <input type="submit" />
    </form>
  )
}
