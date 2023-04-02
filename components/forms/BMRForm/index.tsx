import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { PersonContext } from '../../../contexts/Person'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { Button } from '../../Button'
import { Input } from '../../Input'
import { Select } from '../../Select'
import { FormContainer } from './styles'
import roundedDivision from '../../../utils/roundedDivision'
import { BaseForm } from '../BaseForm'

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
  const { changeBmr, changeGender, changeWeight } = useContext(PersonContext)

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

      changeBmr(
        roundedDivision(665 + (calculedWeight + calculedHeight) - calculedAge),
      )
    }

    changeGender(gender)
    changeWeight(weight)

    resetField('gender', {
      defaultValue: '',
    })
    reset()
  }

  return (
    <BaseForm onSubmit={handleSubmit(handleBenedictEquation)}>
      <form>
        <span>
          <label>Peso</label>
          <Input
            type="number"
            min="0.00"
            max="500.0"
            step="0.1"
            placeholder="Peso em kg"
            required
            {...register('weight', { valueAsNumber: true })}
          />
        </span>
        <span>
          <label>Altura</label>
          <Input
            type="number"
            min="0.00"
            max="500.0"
            step="0.1"
            placeholder="Altura em cm"
            required
            {...register('height', { valueAsNumber: true })}
          />
        </span>
        <span>
          <label>Idade</label>
          <Input
            type="number"
            min="1"
            max="135"
            step="1"
            placeholder="Idade"
            required
            {...register('age', { valueAsNumber: true })}
          />
        </span>
        <span>
          <label>Gênero</label>
          <Select defaultValue="" required {...register('gender')}>
            <option value="" disabled>
              Selecione uma opção
            </option>
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
          </Select>
        </span>
        <Button type="submit">Enviar</Button>
      </form>
    </BaseForm>
  )
}
