import axios from 'axios'
import { GetServerSideProps } from 'next/types'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { DietForm } from '../components/forms/DietForm'
import { MealForm } from '../components/forms/MealForm'
import { NutritionalStrategyForm } from '../components/forms/NutritionalStrategyForm'
import { FractionSelector } from '../components/FractionSelector'
import { DietContext } from '../contexts/Diet'
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
  const { dietData } = useContext(DietContext)

  const [mealCategory, setMealCategory] = useState('')
  const [meal, setMeal] = useState([] as MealProps[])
  const [foodInGrams, setFoodInGrams] = useState(100)
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

  return (
    <div>
      <h1>Dieta</h1>
      <hr />
      <div>
        {personData.totalCaloricSpending && (
          <h2>Gasto calórico Total: {personData.totalCaloricSpending}</h2>
        )}
      </div>
      <div>
        <DietForm />

        {dietData.dietType && (
          <h2>
            O gasto calórico da sua dieta é de: {dietData.dietType.dietKcal}
          </h2>
        )}
      </div>
      <hr />
      <div>
        <NutritionalStrategyForm />

        {dietData.metaKcal && (
          <>
            <h2>Sua meta de macros nutrientes é de:</h2>
            <ul>
              <li>
                Carboidrato: <strong>{dietData.metaKcal.cho}</strong>g
              </li>
              <li>
                Proteína: <strong>{dietData.metaKcal.ptn}</strong>g
              </li>
              <li>
                Gordura: <strong>{dietData.metaKcal.lip}</strong>g
              </li>
            </ul>
          </>
        )}
      </div>
      <hr />
      <FractionSelector />

      <hr />
      <div>
        <h2>Monte a sua refeição</h2>
        <MealForm />
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
              required
            />
            <br />
            <input
              type="number"
              min="0"
              max="1000"
              step="1"
              placeholder="Valor em gramas do alimento"
              onChange={(e) => setFoodInGrams(Number(e.target.value))}
            />
            <br />
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
                      {food.energy_kcal * (foodInGrams * 0.01)}
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
            {meal.length > 0 ? (
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
