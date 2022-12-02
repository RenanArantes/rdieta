import { createContext, ReactNode, useEffect, useState } from 'react'
import { Diet } from '../@types/diet'

interface DietContextType {
  dietData: Diet
  mealFraction: number
  createDietType: (newDietData: {
    type: 'cutting' | 'bulking'
    dietKcal: number
  }) => void
  createDietKcalMeta: (newDietMetaKcalData: {
    cho: number
    ptn: number
    lip: number
  }) => void
  changeMealFraction: (fraction: number) => void
}

export const DietContext = createContext({} as DietContextType)

interface DietContextProviderProps {
  children: ReactNode
}

export function DietContextProvider({ children }: DietContextProviderProps) {
  const [dietData, setDietData] = useState({} as Diet)
  const [mealFraction, setMealFraction] = useState(1)

  useEffect(() => {
    const existsDietData = localStorage.getItem('@rdiet:diet')

    if (existsDietData !== null) {
      setDietData(JSON.parse(existsDietData))
    }
  }, [])

  useEffect(() => {
    if (Object.entries(dietData).length > 0) {
      localStorage.setItem('@rdiet:diet', JSON.stringify(dietData))
    }
  }, [dietData])

  function createDietType(newDietData: {
    type: 'cutting' | 'bulking'
    dietKcal: number
  }) {
    setDietData((state) => {
      return {
        dietType: newDietData,
        fractioning: state.fractioning,
        metaKcal: state.metaKcal,
        strategy: state.strategy,
        meal: state.meal,
      }
    })
  }

  function createDietKcalMeta(newDietMetaKcalData: {
    cho: number
    ptn: number
    lip: number
  }) {
    setDietData((state) => {
      return {
        dietType: state.dietType,
        fractioning: state.fractioning,
        metaKcal: newDietMetaKcalData,
        strategy: state.strategy,
        meal: state.meal,
      }
    })
  }

  function changeMealFraction(fraction: number) {
    setMealFraction(fraction)
  }

  return (
    <DietContext.Provider
      value={{
        dietData,
        mealFraction,
        createDietType,
        createDietKcalMeta,
        changeMealFraction,
      }}
    >
      {children}
    </DietContext.Provider>
  )
}
