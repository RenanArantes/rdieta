import axios from 'axios'
import { GetServerSideProps } from 'next/types'
import { useContext, useEffect, useState } from 'react'
import { MacroNutrients } from '../@types/diet'
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

interface TotalMealMacrosProps extends MacroNutrients {
  kcal: number
}

export default function Diet({ foods, categories }: DietProps) {
  const { personData } = useContext(PersonContext)
  const { dietData } = useContext(DietContext)
  const { meals } = useContext(MealContext)

  const [totalMealsMacros, setTotalMealsMacros] = useState({
    cho: 0,
    ptn: 0,
    lip: 0,
    kcal: 0,
  } as TotalMealMacrosProps)

  useEffect(() => {
    const sumOfTotalMealsMacros = meals.reduce(
      (
        total = {
          cho: 0,
          ptn: 0,
          lip: 0,
          kcal: 0,
        },
        meal,
      ) => {
        return {
          cho: total.cho + meal.macroNutrients.cho,
          ptn: total.ptn + meal.macroNutrients.ptn,
          lip: total.lip + meal.macroNutrients.lip,
          kcal: total.kcal + meal.totalKcal,
        }
      },
      {
        cho: 0,
        ptn: 0,
        lip: 0,
        kcal: 0,
      },
    )

    setTotalMealsMacros(sumOfTotalMealsMacros)
  }, [meals])

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
            <div
              key={meal.name}
              style={{
                border: '2px solid yellow',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ width: '100%' }}>
                <h3>Refeição: {meal.name.toLocaleUpperCase()}</h3>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: 10,
                }}
              >
                <div>
                  <p>Alimentos na refeição {meal.foods.length}</p>
                  {meal.foods.map((food) => {
                    return (
                      <>
                        <h4>{food.description}</h4>
                        <ul key={food.id}>
                          <li>Quantidade: {food.goals.weight}g</li>
                          <li>CHO: {food.carbohydrate_g}</li>
                          <li>PTN: {food.protein_g}</li>
                          <li>LIP: {food.lipid_g}</li>
                        </ul>
                      </>
                    )
                  })}
                  <p></p>
                </div>
                <div>
                  <p>Macros da refeição</p>
                  <ul>
                    <li>CHO: {meal.macroNutrients.cho}</li>
                    <li>PTN: {meal.macroNutrients.ptn}</li>
                    <li>LIP: {meal.macroNutrients.lip}</li>
                    <li>Total Kcal: {meal.totalKcal}</li>
                  </ul>
                </div>
              </div>
            </div>
          )
        })}
        <p>Valores totais de todas as refeições</p>
        <ul>
          <li>CHO: {totalMealsMacros.cho}</li>
          <li>PTN: {totalMealsMacros.ptn}</li>
          <li>LIP: {totalMealsMacros.lip}</li>
          <li>Total Kcal: {totalMealsMacros.kcal}</li>
        </ul>
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
