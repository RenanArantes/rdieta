import axios from 'axios'
import { GetServerSideProps } from 'next/types'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { PersonContext } from '../contexts/Person'

interface Food {
  id: number
  description: string
  category: string
  energy_kcal: number
  protein_g: number
  lipid_g: number
  carbohydrate_g: number
}

interface MacroNutrients {
  cho: number
  ptn: number
  lip: number
}

interface DietType {
  dietType: 'cutting' | 'bulking'
  dietIntensity: 'low' | 'medium' | 'high'
}

interface NutritionalStrategyType {
  nutritionalStrategy: 'corporalWeight' | 'percentualMacros'
}

interface DietProps {
  foods: Food[]
  categories: string[]
}

interface MealProps {
  name: string
  foods: Food[]
  macroNutrients: MacroNutrients
  totalKcal: number
}

export default function Diet({ foods, categories }: DietProps) {
  const { personData } = useContext(PersonContext)
  const [dietKcal, setDietKcal] = useState(0)
  const [metaDietKcal, setMetaDietKcal] = useState({
    cho: 0,
    lip: 0,
    ptn: 0,
  } as MacroNutrients)
  const [mealFraction, setMealFraction] = useState(5)
  const [meal, setMeal] = useState([] as MealProps[])

  const [mealCreate, setMealCreate] = useState([])

  const { register, handleSubmit, reset } = useForm()

  function handleDiet(data: DietType) {
    const { dietIntensity, dietType } = data

    console.log(`Tipo: ${dietType} | Intensidade: ${dietIntensity}`)

    reset()

    if (dietType === 'cutting') {
      switch (dietIntensity) {
        case 'low':
          return setDietKcal((state) => personData.totalCaloricSpending * 0.8)
        case 'medium':
          return setDietKcal((state) => personData.totalCaloricSpending * 0.7)
        case 'high':
          return setDietKcal((state) => personData.totalCaloricSpending * 0.5)
      }
    }

    if (dietType === 'bulking') {
      switch (dietIntensity) {
        case 'low':
          return setDietKcal((state) => personData.totalCaloricSpending * 1.2)
        case 'medium':
          return setDietKcal((state) => personData.totalCaloricSpending * 1.5)
        case 'high':
          return setDietKcal((state) => personData.totalCaloricSpending * 2)
      }
    }
  }

  function handleNutritionalStrategy({
    nutritionalStrategy,
  }: NutritionalStrategyType) {
    console.log('nutritional strategy')
    console.log(nutritionalStrategy)

    if (nutritionalStrategy === 'percentualMacros') {
      setMetaDietKcal((state) => {
        return {
          cho: (dietKcal * 0.4) / 4, // 40% de caloria * 4 valor kcal da caloria,
          ptn: (dietKcal * 0.4) / 4, // 40% de proteina * 4 valor kcal da proteina,
          lip: (dietKcal * 0.2) / 9, // 20% de gordura * 9 valor kcal da gordura,
        }
      })
    }

    reset()
  }

  function handleMealFractionChange(e: any) {
    setMealFraction(e.target.value)
  }

  useEffect(() => {
    for (let index = 0; index < mealFraction; index++) {
      setMealCreate((state) => {
        return [...state, <p>mealcreateCampo</p>]
      })
    }
    console.log(mealCreate)
  }, [mealFraction])

  return (
    <div>
      <h1>Dieta</h1>
      <hr />
      <div>
        <h2>Gasto calórico Total: {personData.totalCaloricSpending}</h2>
      </div>
      <div>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
          onSubmit={handleSubmit(handleDiet)}
        >
          <span>
            <label>Tipo da Dieta: </label>
            <select defaultValue="" {...register('dietType')}>
              <option value="" disabled>
                Selecione uma opção
              </option>
              <option value="cutting">Perda de gordura</option>
              <option value="bulkinng">Ganho de massa</option>
            </select>
          </span>
          <span>
            <label>Intensidade da dieta: </label>
            <select defaultValue="" {...register('dietIntensity')}>
              <option value="" disabled>
                Selecione uma opção
              </option>
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>
          </span>
          <input type="submit" />
        </form>
        <h2>O gasto calórico da sua dieta é de: {dietKcal}</h2>
      </div>
      <hr />
      <div>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
          onSubmit={handleSubmit(handleNutritionalStrategy)}
        >
          <span>
            <label>Estratégia nutricional: </label>
            <select defaultValue="" {...register('nutritionalStrategy')}>
              <option value="" disabled>
                Selecione uma opção
              </option>
              <option value="percentualMacros">
                CHO:40% - PTN:40% - LIP:20%
              </option>
              <option value="corporalWeight">CHO:4g - PTN:2g - LIP:1g</option>
            </select>
          </span>
          {'  '}
          <input type="submit" />
        </form>
        <h2>Sua meta de macros nutrientes é de:</h2>
        <ul>
          <li>
            Carboidrato: <strong>{metaDietKcal.cho}</strong>g
          </li>
          <li>
            Proteína: <strong>{metaDietKcal.ptn}</strong>g
          </li>
          <li>
            Gordura: <strong>{metaDietKcal.lip}</strong>g
          </li>
        </ul>
      </div>
      <hr />
      <div>
        Divisão das refeições:{' '}
        <input type="number" onChange={handleMealFractionChange} />
        <h2>Seu número de refeições é de: {mealFraction}</h2>
        {mealCreate.map((p, index) => (
          <p key={index}>refeição: {index}</p>
        ))}
      </div>
      <hr />

      {/* <div>
        <h2>Valores nutricionais em 100g {'(TabelaTaco)'}</h2>
        <ul>
          {categories.map((category) => {
            return (
              <div key={category}>
                <h2>{category}</h2>
                {foods
                  .filter((food) => food.category === category)
                  .map((food) => {
                    return (
                      <div key={food.id}>
                        <li>
                          Comida: <strong>{food.description}</strong>
                          <br />- Kcal: <strong>{food.energy_kcal}</strong>
                          <ul>
                            <li>
                              Carboidrato:{' '}
                              <strong>{food.carbohydrate_g} g</strong>
                            </li>
                            <li>
                              Proteínas: <strong>{food.protein_g} g</strong>
                            </li>
                            <li>
                              Gorduras: <strong>{food.lipid_g} g</strong>
                            </li>
                          </ul>
                        </li>
                        <hr />
                      </div>
                    )
                  })}
              </div>
            )
          })}
        </ul>
      </div> */}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await axios.get<Food[]>('http://localhost:3000/api/foods')

  const categories = [] as string[]

  const fetchedFoods = response.data.map((food) => {
    if (categories.indexOf(food.category) === -1) {
      categories.push(food.category)
    }

    return food
  })

  return {
    props: {
      foods: fetchedFoods,
      categories,
    },
  }
}
