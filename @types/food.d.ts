import CompleteFood from './completeFood'

export default interface Food extends CompleteFood {
  id: number
  description: string
  energy_kcal: number
}
