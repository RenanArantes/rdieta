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
  const [mealFraction, setMealFraction] = useState(1)
  const [mealCategory, setMealCategory] = useState('')
  const [meal, setMeal] = useState([] as MealProps[])
  const [checkedFood, setCheckedFood] = useState([] as Food[])
  const [lastCheckedFood, setLastCheckedFood] = useState({
    id: 0,
    category: 'nenhum',
    description: 'vazio',
    energy_kcal: 0,
    carbohydrate_g: 0,
    lipid_g: 0,
    protein_g: 0,
  } as Food)

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
    setMealFraction(Number(e.target.value))
  }

  function handleLastCheckedFood(e: any, newFood: Food) {
    if (e.target.checked) {
      console.log('------checked------')

      setCheckedFood((state) => [...state, newFood])
      setLastCheckedFood((state) => newFood)
    } else {
      console.log('------unchecked------')

      const updatedCheckedFood = checkedFood.filter(
        (food) => food.id !== newFood.id,
      )

      setCheckedFood(updatedCheckedFood)

      setLastCheckedFood((state) => {
        return {
          id: 0,
          category: 'nenhum',
          description: 'vazio',
          energy_kcal: 0,
          carbohydrate_g: 0,
          lipid_g: 0,
          protein_g: 0,
        }
      })
    }
  }

  function handleCreateNewMeal(data: {
    mealName: string
    foodsListOnMeal: []
  }) {
    console.log(data)
    const { mealName } = data

    console.log(mealName)
    console.log(checkedFood)

    let totalKcal = 0
    let totalCho = 0
    let totalPtn = 0
    let totalLip = 0

    checkedFood.forEach((food) => {
      totalKcal += food.energy_kcal
      totalCho += food.carbohydrate_g
      totalPtn += food.protein_g
      totalLip += food.lipid_g
    })

    const newMeal: MealProps = {
      name: mealName,
      foods: checkedFood,
      macroNutrients: {
        cho: totalCho,
        ptn: totalPtn,
        lip: totalLip,
      },
      totalKcal,
    }

    setMeal([...meal, newMeal])
  }

  useEffect(() => {
    console.log(mealFraction)
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
        <h2>Seu número de refeições é de: {mealFraction}</h2>
        <h2>Estimativa de Kcal por refeição</h2>
        <ul>
          <li>
            Carboidrato: <strong>{metaDietKcal.cho / mealFraction}</strong>g
          </li>
          <li>
            Proteína: <strong>{metaDietKcal.ptn / mealFraction}</strong>g
          </li>
          <li>
            Gordura: <strong>{metaDietKcal.lip / mealFraction}</strong>g
          </li>
        </ul>
      </div>
      <hr />
      <div>
        <h2>Monte a sua refeição</h2>
        <div style={{ display: 'flex', margin: '0 auto' }}>
          {/* <ul>
            {[...Array(mealFraction)].map((value, index) => (
              <li key={index}>
                <p>
                  Refeição {index + 1}: {meal[index]?.name}
                </p>
                <input
                  type="text"
                  placeholder="Digite um nome da refeição"
                  onChange={(e) => handleCreateNewMeal(e.target.value, index)}
                />
                <ul>
                  <select
                    onChange={() => {
                      setMealCategory(event?.target.value)
                    }}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <ul>
                    {foods
                      .filter((food) => food.category === mealCategory)
                      .map((food) => {
                        return (
                          <li key={food.id}>
                            {food.description}
                            {'  '}
                            <input
                              type="checkbox"
                              value={food.description}
                              onChange={(e) => {
                                handleLastCheckedFood(e, food)
                              }}
                            />
                          </li>
                        )
                      })}
                  </ul>
                </ul>
              </li>
            ))}
          </ul> */}
          <form onSubmit={handleSubmit(handleCreateNewMeal)}>
            <p>Criando uma refeição</p>
            <label>Nome da refeição:</label>
            <input
              type="text"
              placeholder="Digite o nome da refeição"
              {...register('mealName')}
            />
            <select
              onChange={() => {
                setMealCategory(event?.target.value)
              }}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <ul>
              {foods
                .filter((food) => food.category === mealCategory)
                .map((food) => {
                  return (
                    <li key={food.id}>
                      {food.description}
                      {' - '}
                      {food.energy_kcal}
                      <input
                        type="checkbox"
                        value={food.description}
                        {...register('foodListOnMeal')}
                        onChange={(e) => {
                          handleLastCheckedFood(e, food)
                        }}
                      />
                    </li>
                  )
                })}
            </ul>
            <input type="submit" />
          </form>
          <div>
            {lastCheckedFood.id !== 0 ? (
              <div>
                <p>Última comida selecionada</p>
                <h4>{lastCheckedFood.description}</h4>
                <p>
                  KCAL: <strong>{lastCheckedFood.energy_kcal}</strong>
                </p>
                <ul>
                  <li>
                    Calorias: <strong>{lastCheckedFood.carbohydrate_g}</strong>
                  </li>
                  <li>
                    Proteínas: <strong>{lastCheckedFood.protein_g}</strong>
                  </li>
                  <li>
                    Lipídeos: <strong>{lastCheckedFood.lipid_g}</strong>
                  </li>
                </ul>
              </div>
            ) : (
              <h3>Nenhuma comida selecionada</h3>
            )}
          </div>
          <div
            style={{
              marginLeft: 100,
            }}
          >
            <p>Todas as comidas selecionadas: </p>
            <ul>
              {checkedFood &&
                checkedFood.map((food) => (
                  <li key={food.id}>{food.description}</li>
                ))}
            </ul>
          </div>
          <div
            style={{
              marginLeft: 100,
            }}
          >
            Refeição :
            {meal !== undefined ? (
              <div>
                <p>Nome: {meal[0].name}</p>
                <p>Total Kcal: {meal[0].totalKcal}</p>
                Total Macros:{' '}
                <ul>
                  <li>CHO: {meal[0].macroNutrients.cho}</li>
                  <li>PTN: {meal[0].macroNutrients.ptn}</li>
                  <li>LIP: {meal[0].macroNutrients.lip}</li>
                </ul>
              </div>
            ) : (
              <h4>Nenhuma refeição cadastrada</h4>
            )}
          </div>
        </div>
      </div>
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
