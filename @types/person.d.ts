import { ActivityKcal } from './activityKcal'

export interface PersonDataType {
  bmr: number
  kcalSpender: ActivityKcal
  totalCaloricSpending: number
  gender: 'male' | 'female'
}
