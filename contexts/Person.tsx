import { createContext, ReactNode, useState } from 'react'
import { PersonDataType } from '../@types/person'

interface PersonContextType {
  personData: PersonDataType
  createPersonData: (personData: PersonDataType) => void
  changeBmr: (newBmr: number) => void
  changeGender: (newGender: 'male' | 'female') => void
}

export const PersonContext = createContext({} as PersonContextType)

interface PersonContextProviderProps {
  children: ReactNode
}

export function PersonContextProvider({
  children,
}: PersonContextProviderProps) {
  const [personData, setPersonData] = useState({} as PersonDataType)

  function createPersonData(personData: PersonDataType) {
    setPersonData(personData)
  }

  function changeBmr(newBmr: number) {
    setPersonData((state) => {
      return {
        bmr: newBmr,
        gender: state.gender,
        kcalSpender: state.kcalSpender,
        totalCaloricSpending: state.totalCaloricSpending,
      }
    })
  }

  function changeGender(newGender: 'male' | 'female') {
    setPersonData((state) => {
      return {
        bmr: state.bmr,
        gender: newGender,
        kcalSpender: state.kcalSpender,
        totalCaloricSpending: state.totalCaloricSpending,
      }
    })
  }

  return (
    <PersonContext.Provider
      value={{ personData, createPersonData, changeBmr, changeGender }}
    >
      {children}
    </PersonContext.Provider>
  )
}
