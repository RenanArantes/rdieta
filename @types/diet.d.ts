import Food from './food'

export interface Diet {
  dietType: {
    type: 'cutting' | 'bulking'
    dietKcal: number
  }
  strategy: 'percentualMacros' | 'corporalWeight'
  fractioning: number
  meal: [
    {
      name: 'string'
      foods: Food[]
    },
  ]
}
