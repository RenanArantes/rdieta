import { Trash, Warning, X } from 'phosphor-react'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import Food from '../../../../@types/food'
import { MealContext } from '../../../../contexts/Meal'
import roundedDivision from '../../../../utils/roundedDivision'
import { Button } from '../../../Button'
import { Input } from '../../../Input'
import { List } from '../../../List'
import { Select } from '../../../Select'
import { Subtitle } from '../../../Subtitle'
import { Title } from '../../../Title'
import {
  ContentContainer,
  FoodListContainer,
  FoodsOnMealContainer,
  FoodsOnMealList,
  FormContainer,
  HeaderContainer,
  MealInputContainer,
  SelectedFoodContainer,
  SelectedFoodInputsContainer,
  WarningToSelectFoodContainer,
} from './styles'
import { FoodSearchBar } from '../../../SearchBar'

interface MacroNutrients {
  cho: number
  ptn: number
  lip: number
}

interface GoalsValues {
  weight: number
  macroValue: number
  macroType: 'cho' | 'ptn' | 'lip'
}
interface FoodOnMeal extends Food {
  goals: GoalsValues
}

interface MealFormModalProps {
  foodList: Food[]
  categories: string[]
  handleDisplayModal: () => void
}

const mealZodValidationSchema = zod.object({
  mealName: zod.string(),
})

type MealFormData = zod.infer<typeof mealZodValidationSchema>

export function MealFormModal({
  foodList,
  categories,
  handleDisplayModal,
}: MealFormModalProps) {
  const { createMeal } = useContext(MealContext)

  const { register, handleSubmit, reset } = useForm<MealFormData>({
    resolver: zodResolver(mealZodValidationSchema),
  })

  const [foods, setFoods] = useState([] as Food[])
  const [mealCategory, setMealCategory] = useState('')

  const [checkedFoods, setCheckedFoods] = useState([] as Food[])
  const [foodsOnMeal, setFoodsOnMeal] = useState([] as FoodOnMeal[])
  const [selectedFood, setSelectedFood] = useState({} as Food)
  const [totalMacrosOnMeal, setTotalMacrosOnMeal] = useState({
    cho: 0,
    ptn: 0,
    lip: 0,
  } as MacroNutrients)

  const [goalFoodWeight, setGoalFoodWeight] = useState(0)
  const [metaMacroValue, setMetaMacroValue] = useState(0)
  const [selectedMetaMacro, setSelectedMetaMacro] = useState(
    '' as 'cho' | 'ptn' | 'lip',
  )
  const [mealName, setMealName] = useState('')

  useEffect(() => {
    setMealCategory(categories[0])
    setFoods(foodList)
  }, [])

  function findWeightOfSelectedFood(
    foodMacro: number,
    wantedMacroValue: number,
  ) {
    if (foodMacro === 0) {
      return 0
    } else {
      return wantedMacroValue === 0 ? 0 : (100 * wantedMacroValue) / foodMacro
    }
  }

  function resetGoalValues() {
    setSelectedMetaMacro('' as 'cho' | 'ptn' | 'lip')
    setMetaMacroValue((state) => 0)
    setGoalFoodWeight((state) => 0)
  }

  function findMacrosOfSelectedFood() {
    const choGoal = roundedDivision(
      (selectedFood.carbohydrate_g / 100) * goalFoodWeight,
    )
    const ptnGoal = roundedDivision(
      (selectedFood.protein_g / 100) * goalFoodWeight,
    )
    const lipGoal = roundedDivision(
      (selectedFood.lipid_g / 100) * goalFoodWeight,
    )

    return { cho: choGoal, ptn: ptnGoal, lip: lipGoal }
  }

  function handleCheckedFoods(e: any, newFood: Food) {
    resetGoalValues()

    if (e.target.checked) {
      setSelectedFood((state) => newFood)
      setCheckedFoods((state) => [...state, newFood])
    } else {
      const updatedCheckedFoods = checkedFoods.filter(
        (food) => food.id !== newFood.id,
      )
      const emptyFood = {} as Food

      setSelectedFood((state) => emptyFood)
      setCheckedFoods(updatedCheckedFoods)
    }
  }

  function handleRemoveFoodOfMeal(foodOnMeal: Food) {
    const updatedFoodsOnMeal = foodsOnMeal.filter(
      (food) => food.id !== foodOnMeal.id,
    )

    setTotalMacrosOnMeal((state) => {
      return {
        cho: state.cho - foodOnMeal.carbohydrate_g,
        ptn: state.ptn - foodOnMeal.protein_g,
        lip: state.lip - foodOnMeal.lipid_g,
      }
    })

    setFoodsOnMeal(updatedFoodsOnMeal)

    const updatedFoodList = foods

    updatedFoodList.splice(foodOnMeal.id - foodsOnMeal.length, 0, foodOnMeal)

    setFoods((state) => updatedFoodList)
  }

  function handleAddFoodOnMeal(newFood: Food) {
    const macrosValuesOfSeletedFood = findMacrosOfSelectedFood()

    const foodToAddOnMeal: FoodOnMeal = {
      ...newFood,
      carbohydrate_g: macrosValuesOfSeletedFood.cho,
      protein_g: macrosValuesOfSeletedFood.ptn,
      lipid_g: macrosValuesOfSeletedFood.lip,
      goals: {
        macroType: selectedMetaMacro,
        macroValue: roundedDivision(metaMacroValue),
        weight: roundedDivision(goalFoodWeight),
      },
    }

    setFoodsOnMeal((state) => [...state, foodToAddOnMeal])

    const updatedFoodsToList = foods.filter(
      (food) => food.id !== foodToAddOnMeal.id,
    )

    setFoods(updatedFoodsToList)

    setTotalMacrosOnMeal((state) => {
      return {
        cho: roundedDivision(state.cho + macrosValuesOfSeletedFood.cho),
        ptn: roundedDivision(state.ptn + macrosValuesOfSeletedFood.ptn),
        lip: roundedDivision(state.lip + macrosValuesOfSeletedFood.lip),
      }
    })

    const updatedCheckedFoods = checkedFoods.filter(
      (food) => food.id !== newFood.id,
    )
    const emptyFood = {} as Food

    setSelectedFood((state) => emptyFood)
    setCheckedFoods(updatedCheckedFoods)
    resetGoalValues()
  }

  function handleCategoryChange(e: ChangeEvent<HTMLSelectElement>) {
    setMealCategory(e.target.value)

    setSelectedFood({} as Food)
    setCheckedFoods([] as Food[])
  }

  function handleMetaMacroValue(e: ChangeEvent<HTMLInputElement>) {
    e.target.value === '' && console.log('string vazia')

    const inputValue = Number(e.target.value)

    setMetaMacroValue(inputValue)

    let macroValue = 0

    switch (selectedMetaMacro) {
      case 'cho':
        macroValue = selectedFood.carbohydrate_g
        break
      case 'ptn':
        macroValue = selectedFood.protein_g
        break
      case 'lip':
        macroValue = selectedFood.lipid_g
        break
      default:
        macroValue = 0
        break
    }

    const weightGoal = findWeightOfSelectedFood(macroValue, inputValue)

    e.target.value === ''
      ? setGoalFoodWeight((state) => 0)
      : setGoalFoodWeight((state) => roundedDivision(weightGoal))
  }

  function handleSelectedMetaMacro(e: ChangeEvent<HTMLSelectElement>) {
    const selectedMetaMacro = e.target.value as 'cho' | 'ptn' | 'lip'

    setSelectedMetaMacro(selectedMetaMacro)

    let macroValue = 0

    if (selectedMetaMacro === 'cho') {
      macroValue = selectedFood.carbohydrate_g
    } else if (selectedMetaMacro === 'ptn') {
      macroValue = selectedFood.protein_g
    } else if (selectedMetaMacro === 'lip') {
      macroValue = selectedFood.lipid_g
    }

    if (metaMacroValue > 0) {
      const weightGoal = findWeightOfSelectedFood(macroValue, metaMacroValue)

      setGoalFoodWeight((state) => roundedDivision(weightGoal))
    }
  }

  function handleMealCreation(data: { mealName: string }) {
    const newMealData = {
      newName: data.mealName,
      foods: foodsOnMeal,
      totalMacros: totalMacrosOnMeal,
    }

    createMeal(newMealData)

    resetGoalValues()
    setMealName('' as string)
    setSelectedFood({} as Food)
    setFoodsOnMeal([] as FoodOnMeal[])
    setCheckedFoods([] as Food[])
    setTotalMacrosOnMeal({
      cho: 0,
      ptn: 0,
      lip: 0,
    } as MacroNutrients)
    setFoods(foodList)
    setMealCategory(categories[0])

    handleDisplayModal()

    reset()
  }

  return (
    <FormContainer>
      <HeaderContainer>
        <Title>Monte sua Refeição</Title>
        <X weight="bold" size={24} onClick={handleDisplayModal} />
      </HeaderContainer>
      <form onSubmit={handleSubmit(handleMealCreation)}>
        <ContentContainer>
          <div style={{ minWidth: '50%' }}>
            <MealInputContainer>
              <Subtitle>Nome da refeição</Subtitle>
              <Input
                type="text"
                autoComplete="off"
                required
                {...register('mealName', {
                  value: mealName,
                  max: 255,
                  min: 3,
                  required: true,
                })}
              />
            </MealInputContainer>
            <FoodListContainer>
              <Subtitle>Escolha um tipo de comida</Subtitle>
              <Select onChange={handleCategoryChange}>
                {categories &&
                  categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
              </Select>
              <Subtitle>Valores em 100g do alimento:</Subtitle>
              <FoodSearchBar
                data={foods}
                selectedFood={selectedFood}
                mealCategory={mealCategory}
                checkedFoods={handleCheckedFoods}
              ></FoodSearchBar>
              {checkedFoods.length > 0 &&
                checkedFoods
                  .filter((food) => food.category === mealCategory)
                  .map((food) => (
                    <div key={food.id}>
                      <List>
                        <Subtitle>
                          Macros de {/* First word of the selected food */}
                          <strong>{food.description.split(',')[0]}</strong>
                        </Subtitle>
                        <li>CHO: {food.carbohydrate_g}</li>
                        <li>PTN: {food.protein_g}</li>
                        <li>LIP: {food.lipid_g}</li>
                      </List>
                    </div>
                  ))}
            </FoodListContainer>
          </div>
          <SelectedFoodContainer>
            <SelectedFoodInputsContainer>
              {Object.entries(selectedFood).length > 0 ? (
                <div>
                  <Subtitle>
                    Comida Selecionada:{' '}
                    <strong>{selectedFood.description}</strong>
                  </Subtitle>
                  <span>
                    <Subtitle>Defina a quantidade de macros da comida</Subtitle>
                    <div>
                      <label>Macronutriente :</label>
                      <Select
                        name="metaMacroType"
                        defaultValue=""
                        onChange={(e) => handleSelectedMetaMacro(e)}
                        required
                      >
                        <option value="" disabled>
                          Selecione um Macro
                        </option>
                        <option value="cho">Carboidrato</option>
                        <option value="ptn">Proteína</option>
                        <option value="lip">Gordura</option>
                      </Select>
                    </div>
                    <div>
                      <label>Quantidade em Gramas :</label>
                      <Input
                        type="number"
                        min="0.1"
                        max="1000"
                        step="0.1"
                        name="metaMacroValue"
                        title="Defina aqui a quantidade do macronutriente que deseja alcançar"
                        onChange={(e) => handleMetaMacroValue(e)}
                        required
                        style={{ width: '40px' }}
                      />
                    </div>
                    <div>
                      <label>
                        Quantidade do alimento:{' '}
                        <strong>
                          {goalFoodWeight} {' g'}
                        </strong>
                      </label>
                    </div>
                    <div>
                      <Button
                        type="button"
                        onClick={() => handleAddFoodOnMeal(selectedFood)}
                        disabled={
                          metaMacroValue === 0 || selectedMetaMacro.length === 0
                        }
                      >
                        Adicionar
                      </Button>
                    </div>
                  </span>
                </div>
              ) : (
                <WarningToSelectFoodContainer>
                  <Warning size={42} />
                  <Title>Selecione um alimento</Title>
                </WarningToSelectFoodContainer>
              )}
            </SelectedFoodInputsContainer>

            <FoodsOnMealContainer>
              <Title>Alimentos da refeição: </Title>
              {foodsOnMeal.length > 0 ? (
                <div>
                  <span>
                    <FoodsOnMealList>
                      {foodsOnMeal.map((food) => (
                        <li key={food.id}>
                          <div>
                            <Subtitle>
                              {food.description} | {food.goals.weight}g
                            </Subtitle>

                            <Trash
                              type="button"
                              onClick={() => handleRemoveFoodOfMeal(food)}
                              size={32}
                            />
                          </div>
                        </li>
                      ))}
                    </FoodsOnMealList>
                  </span>
                  <span>
                    <FoodsOnMealList>
                      <li>
                        <Subtitle>
                          <strong>{' > '}</strong>
                          Carboidratos: {totalMacrosOnMeal.cho}g
                        </Subtitle>
                      </li>
                      <li>
                        <Subtitle>
                          <strong>{' > '}</strong>
                          Proteína: {totalMacrosOnMeal.ptn}g
                        </Subtitle>
                      </li>
                      <li>
                        <Subtitle>
                          <strong>{' > '}</strong>
                          Gordura: {totalMacrosOnMeal.lip}g
                        </Subtitle>
                      </li>
                    </FoodsOnMealList>
                    <div>
                      <Button type="submit">Criar Refeição</Button>
                    </div>
                  </span>
                </div>
              ) : (
                <Subtitle>Nenhuma comida na refeição</Subtitle>
              )}
            </FoodsOnMealContainer>
          </SelectedFoodContainer>
        </ContentContainer>
      </form>
    </FormContainer>
  )
}
