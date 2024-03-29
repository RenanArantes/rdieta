import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { ActivityKcal, PersonDataType } from '../@types/person'
import roundedDivision from '../utils/roundedDivision'
import { StepContext } from './Step'

interface PersonContextType {
  personData: PersonDataType
  createPersonData: (personData: PersonDataType) => void
  changeBmr: (newBmr: number) => void
  changeWeight: (newWeight: number) => void
  changeGender: (newGender: 'male' | 'female') => void
  changeKcalSpenders: (
    kcalSpenderMetrics: ActivityKcal,
    totalCaloricSpendingValue: number,
  ) => void
}

export const PersonContext = createContext({} as PersonContextType)

interface PersonContextProviderProps {
  children: ReactNode
}

export function PersonContextProvider({
  children,
}: PersonContextProviderProps) {
  const [personData, setPersonData] = useState({} as PersonDataType)
  const { increaseCurrentStep } = useContext(StepContext)

  useEffect(() => {
    const existsPersonData = localStorage.getItem('@rdieta:person')

    if (existsPersonData !== null) {
      setPersonData(JSON.parse(existsPersonData))
    }
  }, [])

  useEffect(() => {
    if (Object.entries(personData).length > 0) {
      localStorage.setItem('@rdieta:person', JSON.stringify(personData))
    }
  }, [personData])

  function createPersonData(personData: PersonDataType) {
    setPersonData(personData)
  }

  function changeBmr(newBmr: number) {
    setPersonData((state) => {
      return {
        ...state,
        bmr: roundedDivision(newBmr),
      }
    })

    increaseCurrentStep()
  }

  function changeWeight(newWeight: number) {
    setPersonData((state) => {
      return {
        ...state,
        weight: newWeight,
      }
    })

    increaseCurrentStep()
  }

  function changeGender(newGender: 'male' | 'female') {
    setPersonData((state) => {
      return {
        ...state,
        gender: newGender,
      }
    })
  }

  function changeKcalSpenders(
    kcalSpenderMetrics: ActivityKcal,
    totalCaloricSpendingValue: number,
  ) {
    setPersonData((state) => {
      return {
        ...state,
        kcalSpender: kcalSpenderMetrics,
        totalCaloricSpending: roundedDivision(totalCaloricSpendingValue),
      }
    })

    increaseCurrentStep()
  }

  return (
    <PersonContext.Provider
      value={{
        personData,
        createPersonData,
        changeBmr,
        changeWeight,
        changeGender,
        changeKcalSpenders,
      }}
    >
      {children}
    </PersonContext.Provider>
  )
}
