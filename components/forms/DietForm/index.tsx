import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { PersonContext } from '../../../contexts/Person'
import { DietContext } from '../../../contexts/Diet'
import { Button } from '../../Button'
import { Select } from '../../Select'
import { FormContainer } from './styles'
import { Title } from '../../Title'
import roundedDivision from '../../../utils/roundedDivision'

interface DietType {
  dietType: 'cutting' | 'bulking'
  dietIntensity: 'low' | 'medium' | 'high'
}

const dietZodValidationSchema = zod.object({
  dietType: zod.enum(['cutting', 'bulking']),
  dietIntensity: zod.enum(['low', 'medium', 'high']),
})

type DietFormData = zod.infer<typeof dietZodValidationSchema>

export function DietForm() {
  const { personData } = useContext(PersonContext)
  const { createDietType } = useContext(DietContext)

  const { register, handleSubmit, reset } = useForm<DietFormData>({
    resolver: zodResolver(dietZodValidationSchema),
  })

  function getDietKcalValue(dietData: DietType) {
    const { dietType, dietIntensity } = dietData

    if (dietType === 'cutting') {
      switch (dietIntensity) {
        case 'low':
          return personData.totalCaloricSpending * 0.8
        case 'medium':
          return personData.totalCaloricSpending * 0.7
        case 'high':
          return personData.totalCaloricSpending * 0.5
      }
    } else {
      switch (dietIntensity) {
        case 'low':
          return personData.totalCaloricSpending * 1.2
        case 'medium':
          return personData.totalCaloricSpending * 1.5
        case 'high':
          return personData.totalCaloricSpending * 2
      }
    }
  }

  function handleDiet(data: DietType) {
    const { dietIntensity, dietType } = data

    console.log(`Tipo: ${dietType} | Intensidade: ${dietIntensity}`)

    const newDietKcal = getDietKcalValue(data)

    createDietType({ dietKcal: roundedDivision(newDietKcal), type: dietType })

    reset()
  }

  return (
    <FormContainer>
      <Title>Tipo da Dieta</Title>
      <form onSubmit={handleSubmit(handleDiet)}>
        <span>
          <label>Tipo da Dieta</label>
          <Select defaultValue="" required {...register('dietType')}>
            <option value="" disabled>
              Selecione uma opção
            </option>
            <option value="cutting">Perda de gordura</option>
            <option value="bulkinng">Ganho de massa</option>
          </Select>
        </span>
        <span>
          <label>Intensidade da dieta</label>
          <Select defaultValue="" required {...register('dietIntensity')}>
            <option value="" disabled>
              Selecione uma opção
            </option>
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
          </Select>
        </span>
        <Button type="submit">Enviar</Button>
      </form>
    </FormContainer>
  )
}
