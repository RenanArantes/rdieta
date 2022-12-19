import axios from 'axios'
import { GetServerSideProps } from 'next/types'
import { PencilLine, Trash } from 'phosphor-react'
import { useContext, useEffect, useState } from 'react'
import { MacroNutrients } from '../@types/diet'
import Food from '../@types/food'
import { BottomMultiStep } from '../components/BottomMultiStep'
import { Button } from '../components/Button'
import { MealForm } from '../components/forms/MealForm'
import { MealUpdateForm } from '../components/forms/MealUpdateForm'
import { List } from '../components/List'
import { Subtitle } from '../components/Subtitle'
import { DietContext } from '../contexts/Diet'
import { MealContext } from '../contexts/Meal'
import { StepContext } from '../contexts/Step'
import {
  DietContainer,
  MacrosContainer,
  MealContainer,
  MealFunctionsContainer,
  MealHeader,
  MealInfoContainer,
  MealListContainer,
} from '../styles/pages/meal'

interface DietProps {
  foods: Food[]
  categories: string[]
}

interface TotalMealMacrosProps extends MacroNutrients {
  kcal: number
}

export default function Diet({ foods, categories }: DietProps) {
  const { dietData } = useContext(DietContext)
  const { meals, deleteMeal } = useContext(MealContext)
  const { step, currentStep } = useContext(StepContext)

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
    <DietContainer>
      <MealForm foods={foods} categories={categories} />

      <MealContainer>
        {meals.map((meal) => {
          return (
            <MealListContainer key={meal.id}>
              <MealHeader>
                <Subtitle>
                  Refeição: <strong>{meal.name.toLocaleUpperCase()}</strong>
                </Subtitle>
                <MealFunctionsContainer>
                  <MealUpdateForm
                    categories={categories}
                    foods={foods}
                    mealToEdit={meal}
                    icon={<PencilLine size={24} />}
                  />
                  <Button type="button" onClick={() => deleteMeal(meal.id)}>
                    <Trash size={24} />
                    <span>Excluir</span>
                  </Button>
                </MealFunctionsContainer>
              </MealHeader>
              <MealInfoContainer>
                <div>
                  <span>Alimentos da refeição</span>
                  {meal.foods.map((food) => {
                    return (
                      <div key={food.id}>
                        <Subtitle>{food.description}</Subtitle>
                        <List>
                          <li>
                            Quantidade: <strong>{food.goals.weight}</strong>g
                          </li>
                          <li>
                            CHO: <strong>{food.carbohydrate_g}</strong>g
                          </li>
                          <li>
                            PTN: <strong>{food.protein_g}</strong>g
                          </li>
                          <li>
                            LIP: <strong>{food.lipid_g}</strong>g
                          </li>
                        </List>
                      </div>
                    )
                  })}
                </div>
                <div>
                  <Subtitle>
                    Quantidade de alimentos na refeição:{' '}
                    <strong>{meal.foods.length}</strong>
                  </Subtitle>
                  <p>Macros da refeição</p>
                  <List>
                    <li>
                      CHO: <strong>{meal.macroNutrients.cho}</strong>g
                    </li>
                    <li>
                      PTN: <strong>{meal.macroNutrients.ptn}</strong>g
                    </li>
                    <li>
                      LIP: <strong>{meal.macroNutrients.lip}</strong>g
                    </li>
                    <li>
                      Total Kcal: <strong>{meal.totalKcal}</strong>
                    </li>
                  </List>
                </div>
              </MealInfoContainer>
            </MealListContainer>
          )
        })}
        <MacrosContainer>
          {totalMealsMacros.kcal > 0 && (
            <div>
              <Subtitle>Valores totais de todas as refeições</Subtitle>
              <List>
                <li>
                  CHO: <strong>{totalMealsMacros.cho}</strong>g
                </li>
                <li>
                  PTN: <strong>{totalMealsMacros.ptn}</strong>g
                </li>
                <li>
                  LIP: <strong>{totalMealsMacros.lip}</strong>g
                </li>
                <li>Total Kcal: {totalMealsMacros.kcal}</li>
              </List>
            </div>
          )}
          {dietData.metaKcal && (
            <div>
              <Subtitle>Sua meta de macros nutrientes é de:</Subtitle>
              <List>
                <li>
                  Carboidrato: <strong>{dietData.metaKcal.cho}</strong>g
                </li>
                <li>
                  Proteína: <strong>{dietData.metaKcal.ptn}</strong>g
                </li>
                <li>
                  Gordura: <strong>{dietData.metaKcal.lip}</strong>g
                </li>
                <li>
                  TotalKcal:{' '}
                  <strong>
                    {dietData.metaKcal.cho * 4 +
                      dietData.metaKcal.ptn * 4 +
                      dietData.metaKcal.lip * 9}
                  </strong>
                </li>
              </List>
            </div>
          )}
        </MacrosContainer>
      </MealContainer>
      <BottomMultiStep step={step} currentStep={currentStep} />
    </DietContainer>
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
