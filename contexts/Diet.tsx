import { createContext, ReactNode, useState } from 'react'
import { Diet } from '../@types/diet'

interface DietContextType {
  dietData: Diet
  createDietType: (newDietData: {
    type: 'cutting' | 'bulking'
    dietKcal: number
  }) => void
  createDietKcalMeta: (newDietMetaKcalData: {
    cho: number
    ptn: number
    lip: number
  }) => void
}

export const DietContext = createContext({} as DietContextType)

interface DietContextProviderProps {
  children: ReactNode
}

export function DietContextProvider({ children }: DietContextProviderProps) {
  const [dietData, setDietData] = useState({} as Diet)

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

  return (
    <DietContext.Provider
      value={{ dietData, createDietType, createDietKcalMeta }}
    >
      {children}
    </DietContext.Provider>
  )
}
