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
        bmr: roundedDivision(newBmr),
        gender: state.gender,
        kcalSpender: state.kcalSpender,
        totalCaloricSpending: state.totalCaloricSpending,
        weight: state.weight,
      }
    })

    increaseCurrentStep()
  }
  function changeWeight(newWeight: number) {
    console.log('Salvando o peso:' + newWeight)

    setPersonData((state) => {
      return {
        bmr: state.bmr,
        gender: state.gender,
        kcalSpender: state.kcalSpender,
        totalCaloricSpending: state.totalCaloricSpending,
        weight: newWeight,
      }
    })

    increaseCurrentStep()
  }

  function changeGender(newGender: 'male' | 'female') {
    setPersonData((state) => {
      return {
        bmr: state.bmr,
        gender: newGender,
        kcalSpender: state.kcalSpender,
        totalCaloricSpending: state.totalCaloricSpending,
        weight: state.weight
      }
    })
  }

  function changeKcalSpenders(
    kcalSpenderMetrics: ActivityKcal,
    totalCaloricSpendingValue: number,
  ) {
    setPersonData((state) => {
      return {
        bmr: state.bmr,
        gender: state.gender,
        kcalSpender: kcalSpenderMetrics,
        totalCaloricSpending: roundedDivision(totalCaloricSpendingValue),
        weight: state.weight
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
