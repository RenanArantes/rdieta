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
  const { dietData, mealFraction } = useContext(DietContext)

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
        <MealForm
          mealFraction={mealFraction}
          foods={foods}
          categories={categories}
        />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await axios.get<Food[]>('http://localhost:3000/api/foods')

  const categories = [] as string[]

  const fetchedFoods = response.data.map<Food>((food) => {
    if (categories.indexOf(food.category) === -1) {
      categories.push(food.category)
    }

    return {
      ...food,
      energy_kcal: Math.round(food.energy_kcal * 100) / 100,
      carbohydrate_g: Math.round(food.carbohydrate_g * 100) / 100,
      protein_g: Math.round(food.protein_g * 100) / 100,
      lipid_g: Math.round(food.lipid_g * 100) / 100,
    }
  })

  return {
    props: {
      foods: fetchedFoods,
      categories,
    },
  }
}
