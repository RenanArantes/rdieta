import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { DietContext } from '../../../contexts/Diet'
import { Button } from '../../Button'
import { Select } from '../../Select'
import { FormContainer } from './styles'
import { Title } from '../../Title'
import roundedDivision from '../../../utils/roundedDivision'
import { PersonContext } from '../../../contexts/Person'

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
  const { personData } = useContext(PersonContext)

  const { register, handleSubmit, reset } =
    useForm<NutritionalStrategyFormData>({
      resolver: zodResolver(nutritionalStrategyZodValidationSchema),
    })
  function handleNutritionalStrategy({
    nutritionalStrategy,
  }: NutritionalStrategyType) {
    console.log('nutritional strategy')
    console.log(nutritionalStrategy)

    if (nutritionalStrategy === 'corporalWeight') {
      console.log('Tentando calcular dieta de peso corporal.')
      console.log('Peso da pessoa: ' + personData.weight)
      
      //2g de proteína por kilo corporal
      const ptnMeta = personData.weight * 2 
      //1g de gordura por kilo corporal(multipliquei pq sim)
      const lipMeta = personData.weight * 1 
      // (meta calórica - (meta proteina *4 + meta de gordura * 9)) /4
      const choMeta = (dietData.dietType.dietKcal - ((ptnMeta * 4) + (lipMeta * 9))) / 4 

      console.log('Metas - proteica: ' + ptnMeta + '| gordura: ' + lipMeta + '| carbo: ' + choMeta)

      createDietKcalMeta({
        cho: roundedDivision(choMeta),
        ptn: roundedDivision(ptnMeta),
        lip: roundedDivision(lipMeta)
      })
    }

    if (nutritionalStrategy === 'percentualMacros') {
      createDietKcalMeta({
        cho: roundedDivision((dietData.dietType.dietKcal * 0.4) / 4), // 40% de caloria * 4 valor kcal da caloria,
        ptn: roundedDivision((dietData.dietType.dietKcal * 0.4) / 4), // 40% de proteina * 4 valor kcal da proteina,
        lip: roundedDivision((dietData.dietType.dietKcal * 0.2) / 9), // 20% de gordura * 9 valor kcal da gordura,
      })
    }

    reset()
  }

  return (
    <FormContainer>
      <Title>Estratégia Nutricional</Title>
      <form onSubmit={handleSubmit(handleNutritionalStrategy)}>
        <span>
          <label>Estratégia nutricional :</label>
          <Select defaultValue="" required {...register('nutritionalStrategy')}>
            <option value="" disabled>
              Selecione uma opção
            </option>
            <option value="percentualMacros">
              CHO:40% - PTN:40% - LIP:20%
            </option>
            <option value="corporalWeight">CHO:4g - PTN:2g - LIP:1g</option>
          </Select>
        </span>
        <Button type="submit">Enviar</Button>
      </form>
    </FormContainer>
  )
}
