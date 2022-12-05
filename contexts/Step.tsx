import { createContext, ReactNode, useEffect, useState } from 'react'

interface StepContextType {
  step: number
  currentStep: number
  increaseStep: () => void
  decreaseStep: () => void
  resetSteps: () => void
}

export const StepContext = createContext({} as StepContextType)

interface StepContextProviderProps {
  children: ReactNode
}

export function StepContextProvidder({ children }: StepContextProviderProps) {
  const [step, setStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(step)

  function handleCurrentStep() {
    setCurrentStep(step)
  }

  useEffect(() => {
    handleCurrentStep()
  }, [step])

  function increaseStep() {
    setStep((state) => state + 1)
  }

  function decreaseStep() {
    setStep((state) => state - 1)
  }

  function resetSteps() {
    setStep(0)
  }

  return (
    <StepContext.Provider
      value={{ step, currentStep, increaseStep, decreaseStep, resetSteps }}
    >
      {children}
    </StepContext.Provider>
  )
}
