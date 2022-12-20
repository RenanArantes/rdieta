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
import { Title } from '../components/Title'
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
import roundedDivision from '../utils/roundedDivision'

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
          kcal: roundedDivision(total.kcal + meal.totalKcal),
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
                <Title>
                  Refeição: <strong>{meal.name.toLocaleUpperCase()}</strong>
                </Title>
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
                <div style={{ width: '100%' }}>
                  {meal.foods.map((food) => {
                    return (
                      <div key={food.id}>
                        <List>
                          <Subtitle>{food.description}</Subtitle>
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
                  <Subtitle>Macros da refeição</Subtitle>
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
                <li>
                  Total: <strong>{totalMealsMacros.kcal}</strong> kcal
                </li>
              </List>
            </div>
          )}
          {dietData.metaKcal && (
            <div>
              <Subtitle>Sua meta de macros nutrientes</Subtitle>
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
                  Total:{' '}
                  <strong>
                    {dietData.metaKcal.cho * 4 +
                      dietData.metaKcal.ptn * 4 +
                      dietData.metaKcal.lip * 9}
                  </strong>{' '}
                  kcal
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
      energy_kcal: roundedDivision(food.energy_kcal),
      carbohydrate_g: roundedDivision(food.carbohydrate_g),
      protein_g: roundedDivision(food.protein_g),
      lipid_g: roundedDivision(food.lipid_g),
    }
  })

  return {
    props: {
      foods: fetchedFoods,
      categories,
    },
  }
}
