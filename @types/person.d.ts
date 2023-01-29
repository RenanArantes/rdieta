export interface ActivityKcal {
  dailyActivity: 'sedentary' | 'moderate' | 'high'
  workoutIntensity: 'adaptiation' | 'beginner' | 'intermediary' | 'advanced'
  cardioIntensity: 'low' | 'medium' | 'high'
}

export interface PersonDataType {
  bmr: number
  kcalSpender: ActivityKcal
  totalCaloricSpending: number
  gender: 'male' | 'female'
  weight: number
}
