import { useState } from 'react'

export function MealForm() {
  const [isDisplayed, setIsDisplayed] = useState('none')
  const [isOpen, setIsOpen] = useState(false)

  function handleDisplayModal() {
    isOpen ? setIsDisplayed('block') : setIsDisplayed('none')

    setIsOpen(!isOpen)
  }

  return (
    <div>
      <h1>Meal Form</h1>
      <button type="button" onClick={handleDisplayModal}>
        Mostrar Modal
      </button>
      <div
        style={{
          display: isDisplayed /* Hidden by default */,
          position: 'fixed' /* Stay in place */,
          zIndex: 1 /* Sit on top */,
          left: 0,
          top: 0,
          width: '100%' /* Full width */,
          height: '100%' /* Full height */,
          overflow: 'auto' /* Enable scroll if needed */,
          backgroundColor: 'rgba(0, 0, 0, 0.4)' /* Black w/ opacity */,
        }}
      >
        <div
          style={{
            backgroundColor: '#fefefe',
            margin: 'auto',
            marginTop: '20%',
            padding: '20px',
            border: '0px solid #888',
            width: '80%',
          }}
        >
          <span
            style={{
              color: 'black',
              float: 'right',
              fontSize: '28px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
            onClick={handleDisplayModal}
          >
            &times;
          </span>
          <p>Info do modal</p>
        </div>
      </div>
    </div>
  )
}
