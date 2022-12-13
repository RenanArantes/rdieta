import axios from 'axios'
import { GetServerSideProps } from 'next/types'
import { Calculator } from 'phosphor-react'
import { useContext, useEffect, useState } from 'react'
import { MacroNutrients } from '../@types/diet'
import Food from '../@types/food'
import { BottomMultiStep } from '../components/BottomMultiStep'
import { Button } from '../components/Button'
import { DietForm } from '../components/forms/DietForm'
import { MealForm } from '../components/forms/MealForm'
import { MealUpdateForm } from '../components/forms/MealUpdateForm'
import { NutritionalStrategyForm } from '../components/forms/NutritionalStrategyForm'
import { FractionSelector } from '../components/FractionSelector'
import { List } from '../components/List'
import { Subtitle } from '../components/Subtitle'
import { Title } from '../components/Title'
import { DietContext } from '../contexts/Diet'
import { MealContext } from '../contexts/Meal'
import { PersonContext } from '../contexts/Person'
import { StepContext } from '../contexts/Step'
import { DataContainer, FormContainer } from '../styles/pages'
import { DietAccordion, DietContainer } from '../styles/pages/diet'

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
  const { meals, deleteMeal } = useContext(MealContext)
  const { step, currentStep } = useContext(StepContext)

  const [totalMealsMacros, setTotalMealsMacros] = useState({
    cho: 0,
    ptn: 0,
    lip: 0,
    kcal: 0,
  } as TotalMealMacrosProps)

  const [dietTypeAccordion, setDietTypeAccordion] = useState(false)
  const [nutritionalStrategyAccordion, setNutritionalStrategyAccordion] =
    useState(false)

  function handleDietTypeAccordion() {
    setDietTypeAccordion((state) => !dietTypeAccordion)
  }

  function handleNutritionalStrategyAccordion() {
    setNutritionalStrategyAccordion((state) => !nutritionalStrategyAccordion)
  }

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
      <div>
        {personData.totalCaloricSpending && (
          <Subtitle>
            Gasto calórico Total:{' '}
            <strong>{personData.totalCaloricSpending}</strong>
          </Subtitle>
        )}
      </div>
      <FormContainer>
        <DataContainer>
          <Title>
            O gasto calórico da sua dieta é de:{' '}
            <strong>{dietData.dietType.dietKcal}</strong>
          </Title>
          <Button onClick={() => handleDietTypeAccordion()}>
            Recalcular
            <Calculator size={32} />
          </Button>
        </DataContainer>
        <DietAccordion show={dietTypeAccordion}>
          <DietForm />
        </DietAccordion>
      </FormContainer>
      <FormContainer>
        <DataContainer>
          <div>
            <Title>Sua meta de macros nutrientes</Title>
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
            </List>
          </div>
          <Button onClick={() => handleNutritionalStrategyAccordion()}>
            Recalcular
            <Calculator size={32} />
          </Button>
        </DataContainer>
        <DietAccordion show={nutritionalStrategyAccordion}>
          <NutritionalStrategyForm />
        </DietAccordion>
      </FormContainer>

      <MealForm foods={foods} categories={categories} />

      <hr />
      <div>
        {meals.map((meal) => {
          return (
            <div
              key={meal.id}
              style={{
                border: '2px solid yellow',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <h3>Refeição: {meal.name.toLocaleUpperCase()}</h3>
                <div
                  style={{
                    display: 'flex',
                  }}
                >
                  <MealUpdateForm
                    categories={categories}
                    foods={foods}
                    mealToEdit={meal}
                  />
                  <Button type="button" onClick={() => deleteMeal(meal.id)}>
                    Excluir
                  </Button>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: 10,
                }}
              >
                <div>
                  <span>Alimentos da refeição</span>
                  {meal.foods.map((food) => {
                    return (
                      <div key={food.id}>
                        <h4>{food.description}</h4>
                        <ul key={food.id}>
                          <li>Quantidade: {food.goals.weight}g</li>
                          <li>CHO: {food.carbohydrate_g}</li>
                          <li>PTN: {food.protein_g}</li>
                          <li>LIP: {food.lipid_g}</li>
                        </ul>
                      </div>
                    )
                  })}
                  <p></p>
                </div>
                <div>
                  <p>
                    Quantidade de alimentos na refeição: {meal.foods.length}
                  </p>
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 30px',
          }}
        >
          {totalMealsMacros.kcal > 0 && (
            <div>
              <p>Valores totais de todas as refeições</p>
              <ul>
                <li>CHO: {totalMealsMacros.cho}</li>
                <li>PTN: {totalMealsMacros.ptn}</li>
                <li>LIP: {totalMealsMacros.lip}</li>
                <li>Total Kcal: {totalMealsMacros.kcal}</li>
              </ul>
            </div>
          )}
          {dietData.metaKcal && (
            <div>
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
                <li>
                  TotalKcal:{' '}
                  <strong>
                    {dietData.metaKcal.cho * 4 +
                      dietData.metaKcal.ptn * 4 +
                      dietData.metaKcal.lip * 9}
                  </strong>
                  g
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
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
