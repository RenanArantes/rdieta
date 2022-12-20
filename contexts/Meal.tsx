import { createContext, ReactNode, useEffect, useState } from 'react'
import { MacroNutrients } from '../@types/diet'
import Food from '../@types/food'
import roundedDivision from '../utils/roundedDivision'

interface GoalsValues {
  weight: number
  macroValue: number
  macroType: 'cho' | 'ptn' | 'lip'
}

interface FoodOnMeal extends Food {
  goals: GoalsValues
}

interface Meal {
  id: number
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
  deleteMeal: (mealId: number) => void
  updateMeal: (mealToEdit: Meal) => void
}

export const MealContext = createContext({} as MealContextType)

interface MealContextProviderProps {
  children: ReactNode
}

export function MealContextProvider({ children }: MealContextProviderProps) {
  const [meals, setMeals] = useState([] as Meal[])

  useEffect(() => {
    const existsMealsData = localStorage.getItem('@rdieta:meals')

    if (existsMealsData !== null) {
      setMeals(JSON.parse(existsMealsData))
    }
  }, [])

  useEffect(() => {
    if (Object.entries(meals).length > 0) {
      localStorage.setItem('@rdieta:meals', JSON.stringify(meals))
    }
  }, [meals])

  function createMeal(newMealData: {
    newName: string
    foods: FoodOnMeal[]
    totalMacros: MacroNutrients
  }) {
    const { newName, foods, totalMacros } = newMealData

    const { cho, ptn, lip } = totalMacros

    const roundedMacros = {
      cho: roundedDivision(cho),
      ptn: roundedDivision(ptn),
      lip: roundedDivision(lip),
    }

    const totalKcalOnMeal = roundedDivision(cho * 4 + ptn * 4 + lip * 9)

    const momentOfMealCreation = new Date()

    const newMeal = {
      id: Date.parse(String(momentOfMealCreation)),
      name: newName,
      foods,
      macroNutrients: roundedMacros,
      totalKcal: totalKcalOnMeal,
    } as Meal

    setMeals((state) => {
      return [...state, newMeal]
    })

    console.log(meals)
  }

  function deleteMeal(mealId: number) {
    const updatedMeals = meals.filter((meal) => meal.id !== mealId)

    setMeals(updatedMeals)
  }

  function updateMeal(mealToEdit: Meal) {
    const findedMeal = meals.find((meal) => meal.id === mealToEdit.id)

    if (findedMeal) {
      console.log('findedMeal.name')
      console.log(findedMeal.name)

      const updatedMeals = meals.map((meal) => {
        if (meal.id === findedMeal.id) {
          const { cho, lip, ptn } = mealToEdit.macroNutrients

          const totalKcalOnMeal = cho * 4 + ptn * 4 + lip * 9

          return {
            id: mealToEdit.id,
            name: mealToEdit.name,
            foods: mealToEdit.foods,
            macroNutrients: mealToEdit.macroNutrients,
            totalKcal: totalKcalOnMeal,
          } as Meal
        }

        return meal
      })

      setMeals(updatedMeals)
    } else {
      alert('Meal not found')
    }

    console.log('meals')
    console.log(meals)
  }

  return (
    <MealContext.Provider value={{ meals, createMeal, deleteMeal, updateMeal }}>
      {children}
    </MealContext.Provider>
  )
}
