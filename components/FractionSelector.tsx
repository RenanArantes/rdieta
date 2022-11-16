import { ChangeEvent, useContext } from 'react'
import { DietContext } from '../contexts/Diet'

export function FractionSelector() {
  const { dietData, mealFraction, changeMealFraction } = useContext(DietContext)

  function handleMealFractionChange(event: ChangeEvent<HTMLSelectElement>) {
    changeMealFraction(Number(event.target.value))
  }

  return (
    <div>
      Quantas refeições serão feitas por dia:{' '}
      <select onChange={handleMealFractionChange}>
        <option disabled selected value="">
          Selecione um valor
        </option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
      </select>
      {dietData.metaKcal && (
        <>
          {' '}
          <h2>Estimativa de Kcal por refeição: </h2>
          <ul>
            <li>
              Carboidrato:{' '}
              <strong>{dietData.metaKcal.cho / mealFraction}</strong>g
            </li>
            <li>
              Proteína: <strong>{dietData.metaKcal.ptn / mealFraction}</strong>g
            </li>
            <li>
              Gordura: <strong>{dietData.metaKcal.lip / mealFraction}</strong>g
            </li>
          </ul>
        </>
      )}
    </div>
  )
}
