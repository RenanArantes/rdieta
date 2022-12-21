import { createContext, ReactNode, useState } from 'react'

interface StepContextType {
  stepTexts: string[]
  step: number
  currentStep: number
  increaseCurrentStep: () => void
  decreaseCurrentStep: () => void
  resetCurrentStep: () => void
}

export const StepContext = createContext({} as StepContextType)

interface StepContextProviderProps {
  children: ReactNode
}

export function StepContextProvider({ children }: StepContextProviderProps) {
  const stepTexts = [
    'Taxa de Metabolismo Basal',
    'Gasto Calórico Total',
    'Gasto Calórico da Dieta',
    'Meta de Macronutrientes',
  ]

  const [step, setStep] = useState(stepTexts.length)
  const [currentStep, setCurrentStep] = useState(0)

  function increaseCurrentStep() {
    setCurrentStep((state) => state + 1)
  }

  function decreaseCurrentStep() {
    setCurrentStep((state) => state - 1)
  }

  function resetCurrentStep() {
    setCurrentStep(0)
  }

  return (
    <StepContext.Provider
      value={{
        stepTexts,
        step,
        currentStep,
        increaseCurrentStep,
        decreaseCurrentStep,
        resetCurrentStep,
      }}
    >
      {children}
    </StepContext.Provider>
  )
}
