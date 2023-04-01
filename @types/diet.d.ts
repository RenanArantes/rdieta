import Food from './food'

interface MacroNutrients {
  cho: number
  ptn: number
  lip: number
}

export interface Diet {
  dietType: {
    type: 'cutting' | 'bulking' | 'basal'
    dietKcal: number
  }
  metaKcal: MacroNutrients
  strategy: 'percentualMacros' | 'corporalWeight'
  fractioning: number
  meal: [
    {
      name: 'string'
      foods: Food[]
    },
  ]
}
