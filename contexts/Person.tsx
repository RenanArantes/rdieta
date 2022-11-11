import { createContext, ReactNode, useState } from 'react'
import { PersonDataType } from '../@types/person'

interface PersonContextType {
  personData: PersonDataType
  createPersonData: (personData: PersonDataType) => void
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

  return (
    <PersonContext.Provider value={{ personData, createPersonData }}>
      {children}
    </PersonContext.Provider>
  )
}
