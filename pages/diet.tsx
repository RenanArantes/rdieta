import axios from 'axios'
import { GetServerSideProps } from 'next/types'
import { useContext } from 'react'
import Food from '../@types/food'
import { DietForm } from '../components/forms/DietForm'
import { MealForm } from '../components/forms/MealForm'
import { NutritionalStrategyForm } from '../components/forms/NutritionalStrategyForm'
import { FractionSelector } from '../components/FractionSelector'
import { DietContext } from '../contexts/Diet'
import { MealContext } from '../contexts/Meal'
import { PersonContext } from '../contexts/Person'

interface DietProps {
  foods: Food[]
  categories: string[]
}

export default function Diet({ foods, categories }: DietProps) {
  const { personData } = useContext(PersonContext)
  const { dietData } = useContext(DietContext)
  const { meals } = useContext(MealContext)

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
        <MealForm foods={foods} categories={categories} />
      </div>
      <hr />
      <div>
        {meals.map((meal) => {
          return (
            <div key={meal.name}>
              <p>
                Refeição: <strong>{meal.name}</strong>
              </p>
              {meal.foods.map((food) => {
                return (
                  <ul key={food.id}>
                    <li>{food.description}</li>
                    <li>Quantidade: {food.goals.weight}g</li>
                    <li>CHO: {food.carbohydrate_g}</li>
                    <li>PTN: {food.protein_g}</li>
                    <li>LIP: {food.lipid_g}</li>
                  </ul>
                )
              })}
              <p>Total Kcal: {meal.totalKcal}</p>
            </div>
          )
        })}
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
