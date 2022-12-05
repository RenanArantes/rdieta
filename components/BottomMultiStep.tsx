interface BottomMultiStepProps {
  step: number
  currentStep: number
}

export function BottomMultiStep({ step, currentStep }: BottomMultiStepProps) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: 35,
      }}
    >
      <span>
        Multi-step passo {currentStep} de {step}
      </span>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(' + step + ', 1fr)',
          gap: '3px',
          marginTop: '5px',
        }}
      >
        {Array.from({ length: step }, (_, i) => i + 1).map((step) => {
          return (
            <div
              key={step}
              style={{
                height: '1.5px',
                borderRadius: '1px',
                backgroundColor:
                  currentStep && currentStep >= step ? 'blue' : 'red',
                marginRight: 20,
                marginLeft: 10,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
