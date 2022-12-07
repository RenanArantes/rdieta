import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { PersonContext } from '../../../contexts/Person'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { Button } from '../../Button'
import { Input } from '../../Input'
import { Select } from '../../Select'
import { FormContainer } from './styles'
import { Title } from '../../Title'

interface BenedictEquation {
  weight: number
  height: number
  age: number
  gender: 'male' | 'female'
}

const bmrZodValidationSchema = zod.object({
  weight: zod.number(),
  height: zod.number(),
  age: zod.number(),
  gender: zod.enum(['male', 'female']),
})

type BmrFormData = zod.infer<typeof bmrZodValidationSchema>

export function BMRForm() {
  const { changeBmr, changeGender } = useContext(PersonContext)

  const { register, handleSubmit, reset, resetField } = useForm<BmrFormData>({
    resolver: zodResolver(bmrZodValidationSchema),
  })

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

      changeBmr(66 + (calculedWeight + calculedHeight) - calculedAge)
    }

    if (gender === 'female') {
      const calculedWeight = 9.6 * weight
      const calculedHeight = 1.8 * height
      const calculedAge = 4.7 * age

      console.log(`PesoC:${calculedWeight}`)
      console.log(`AlturaC:${calculedHeight}`)
      console.log(`IdadeC:${calculedAge}`)

      changeBmr(665 + (calculedWeight + calculedHeight) - calculedAge)
    }

    changeGender(gender)

    resetField('gender', {
      defaultValue: '',
    })
    reset()
  }

  return (
    <FormContainer onSubmit={handleSubmit(handleBenedictEquation)}>
      <Title>Taxa de Metabolismo Basal</Title>
      <form>
        <span>
          <label>Peso :</label>
          <Input
            type="number"
            min="0.00"
            max="500.0"
            step="0.1"
            placeholder="Peso em kg"
            {...register('weight', { valueAsNumber: true })}
          />
        </span>
        <span>
          <label>Altura :</label>
          <Input
            type="number"
            min="0.00"
            max="500.0"
            step="0.1"
            placeholder="Altura em cm"
            {...register('height', { valueAsNumber: true })}
          />
        </span>
        <span>
          <label>Idade :</label>
          <Input
            type="number"
            min="1"
            max="135"
            step="1"
            placeholder="Idade"
            {...register('age', { valueAsNumber: true })}
          />
        </span>
        <span>
          <label>Gênero :</label>
          <Select
            defaultValue=""
            {...register('gender')}
            onMouseEnter={(e) => console.log(e.target.value)}
            onChange={(e) => console.log(e.target.value)}
          >
            <option value="" disabled>
              Selecione uma opção
            </option>
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
          </Select>
        </span>
        <Button type="submit">Enviar</Button>
      </form>
    </FormContainer>
  )
}
