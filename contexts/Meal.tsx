import { createContext, ReactNode, useState } from 'react'
import { MacroNutrients } from '../@types/diet'
import Food from '../@types/food'

interface GoalsValues {
  weight: number
  macroValue: number
  macroType: 'cho' | 'ptn' | 'lip'
}

interface FoodOnMeal extends Food {
  goals: GoalsValues
}

interface Meal {
  name: string
  foods: FoodOnMeal[]
  macroNutrients: MacroNutrients
  totalKcal: number
}

interface MealContextType {
  meals: Meal[]
  createMeal: (newMealData: {
    newName: string
    foods: FoodOnMeal[]
    totalMacros: MacroNutrients
  }) => void
}

export const MealContext = createContext({} as MealContextType)

interface MealContextProviderProps {
  children: ReactNode
}

export function MealContextProvider({ children }: MealContextProviderProps) {
  const [meals, setMeals] = useState([] as Meal[])

  function createMeal(newMealData: {
    newName: string
    foods: FoodOnMeal[]
    totalMacros: MacroNutrients
  }) {
    const { newName, foods, totalMacros } = newMealData

    const { cho, lip, ptn } = totalMacros

    const totalKcalOnMeal = cho * 4 + ptn * 4 + lip * 9

    const newMeal = {
      name: newName,
      foods,
      macroNutrients: totalMacros,
      totalKcal: totalKcalOnMeal,
    } as Meal

    setMeals((state) => {
      return [...state, newMeal]
    })

    console.log(meals)
  }

  return (
    <MealContext.Provider value={{ meals, createMeal }}>
      {children}
    </MealContext.Provider>
  )
}
