import { Trash, Warning, X } from 'phosphor-react'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
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
  CheckBox,
  CheckBoxContainer,
  ContentContainer,
  FoodListContainer,
  FoodsOnMealContainer,
  FoodsOnMealList,
  FormContainer,
  HeaderContainer,
  MealInputContainer,
  SelectedFoodContainer,
  SelectedFoodInputsContainer,
  TextFood,
  WarningToSelectFoodContainer,
} from './styles'

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

interface Meal {
  id: number
  name: string
  foods: FoodOnMeal[]
  macroNutrients: MacroNutrients
  totalKcal: number
}

interface MealFormModalProps {
  foodList: Food[]
  categories: string[]
  handleDisplayModal: () => void
  mealToEdit: Meal
}

export function MealUpdateFormModal({
  foodList,
  categories,
  handleDisplayModal,
  mealToEdit,
}: MealFormModalProps) {
  const { updateMeal } = useContext(MealContext)

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors },
  } = useForm()

  const [mealEdited, setMealEdited] = useState(mealToEdit)

  const [foods, setFoods] = useState([] as Food[])
  const [mealCategory, setMealCategory] = useState('')

  const [checkedFoods, setCheckedFoods] = useState([] as Food[])
  const [foodsOnMeal, setFoodsOnMeal] = useState(mealToEdit.foods)
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

    const foodsOfMealToEdit = mealEdited.foods.map((food) => food.id)

    console.log(foodsOfMealToEdit)

    const updatedFoods = foodList.filter(
      (food) => !foodsOfMealToEdit.includes(food.id),
    )

    console.log(foods)

    console.log('updatedFoods.length')
    console.log(updatedFoods.length)

    setFoods(updatedFoods)
    setMealName(mealEdited.name)
    setTotalMacrosOnMeal(mealEdited.macroNutrients)
  }, [])

  function findWeightOfSelectedFood(
    foodMacro: number,
    wantedMacroValue: number,
  ) {
    if (foodMacro === 0) {
      return 0
    } else {
      console.log(`${foodMacro} encontrou o seguinte peso: `)
      console.log(`Quantidade em Gramas do macro desejado: ${wantedMacroValue}`)
      console.log(`Valor do metaMacroValue: ${metaMacroValue}`)
      console.log(
        wantedMacroValue === 0 ? 0 : (100 * wantedMacroValue) / foodMacro,
      )

      return wantedMacroValue === 0 ? 0 : (100 * wantedMacroValue) / foodMacro
    }
  }

  function removeFoodOnMealOfFoods(foodToRemove: Food) {
    const updatedFoods = foods.filter((food) => food.id !== foodToRemove.id)

    setFoods(updatedFoods)
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

  function setMetaWeightGoal(macroType: string) {}

  function handleCheckedFoods(e: any, newFood: Food) {
    setGoalFoodWeight(0)
    setSelectedMetaMacro('' as 'cho' | 'ptn' | 'lip')

    if (mealEdited.foods.find((food) => food.id === newFood.id)) {
      const updatedFoods = foods.filter((food) => food.id !== newFood.id)

      setFoods(updatedFoods)
    }

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

    console.log(foods)
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

    console.log('foodToAddOnMeal')
    console.log(foodToAddOnMeal)

    setFoodsOnMeal((state) => [...state, foodToAddOnMeal])

    const updatedFoodsToList = foods.filter(
      (food) => food.id !== foodToAddOnMeal.id,
    )

    console.log(updatedFoodsToList)

    setFoods((state) => updatedFoodsToList)

    setTotalMacrosOnMeal((state) => {
      return {
        cho: roundedDivision(state.cho + macrosValuesOfSeletedFood.cho),
        ptn: roundedDivision(state.ptn + macrosValuesOfSeletedFood.ptn),
        lip: roundedDivision(state.lip + macrosValuesOfSeletedFood.lip),
      }
    })

    console.log('checkedFoods')
    console.log(checkedFoods)

    const updatedCheckedFoods = checkedFoods.filter(
      (food) => food.id !== newFood.id,
    )
    const emptyFood = {} as Food

    console.log('updatedCheckedFoods')
    console.log(updatedCheckedFoods)

    setSelectedFood((state) => emptyFood)
    setCheckedFoods(updatedCheckedFoods)
    resetGoalValues()

    console.log(updatedCheckedFoods.length)

    console.log('goalFoodWeight')
    console.log(goalFoodWeight)
  }

  function handleCategoryChange(e: ChangeEvent<HTMLSelectElement>) {
    setMealCategory(e.target.value)
  }

  function handleMetaMacroValue(e: ChangeEvent<HTMLInputElement>) {
    e.target.value === '' && console.log('string vazia')

    const inputValue = Number(e.target.value)

    setMetaMacroValue(inputValue)

    let macroValue = 0
    console.log('goalFoodWeight')
    console.log(goalFoodWeight)
    console.log(selectedMetaMacro)

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

    console.log('macro type')
    console.log(selectedMetaMacro)

    let macroValue = 0

    if (selectedMetaMacro === 'cho') {
      macroValue = selectedFood.carbohydrate_g
    } else if (selectedMetaMacro === 'ptn') {
      macroValue = selectedFood.protein_g
    } else if (selectedMetaMacro === 'lip') {
      macroValue = selectedFood.lipid_g
    }

    console.log('valor do macro')
    console.log(macroValue)

    if (metaMacroValue > 0) {
      const weightGoal = findWeightOfSelectedFood(macroValue, metaMacroValue)

      console.log('peso a ser alcançado')
      console.log(weightGoal)

      setGoalFoodWeight((state) => roundedDivision(weightGoal))
    }
  }

  function handleChangeMealName(e: ChangeEvent<HTMLInputElement>) {
    setMealName(e.target.value)
  }

  function handleMealUpdate(data: any) {
    console.log('foodsOnMeal')
    console.log(foodsOnMeal)

    updateMeal({
      ...mealEdited,
      name: mealName,
      foods: foodsOnMeal,
      macroNutrients: totalMacrosOnMeal,
    })

    resetGoalValues()
    // setMealName('' as string)
    setSelectedFood({} as Food)
    // setFoodsOnMeal([] as FoodOnMeal[])
    // setCheckedFoods([] as Food[])
    // setTotalMacrosOnMeal({
    //   cho: 0,
    //   ptn: 0,
    //   lip: 0,
    // } as MacroNutrients)
    // setFoods(foodList)

    console.log(categories[0])
    setMealCategory((state) => categories[0])

    console.log(mealCategory)

    handleDisplayModal()

    // reset()
  }

  return (
    <FormContainer>
      <HeaderContainer>
        <Title>Monte sua Refeição</Title>
        <X weight="bold" size={24} onClick={handleDisplayModal} />
      </HeaderContainer>
      <form>
        <ContentContainer>
          <div style={{ minWidth: '50%' }}>
            <MealInputContainer>
              <Subtitle>Nome da Refeição</Subtitle>{' '}
              <Input
                type="text"
                autoComplete="off"
                value={mealName}
                required
                onChange={(e) => handleChangeMealName(e)}
              />
            </MealInputContainer>
            <FoodListContainer>
              <Subtitle>Escolha um tipo de comida</Subtitle>
              <Select onChange={handleCategoryChange} value={mealCategory}>
                {categories &&
                  categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
              </Select>
              <Subtitle>Valores em 100g do alimento:</Subtitle>
              {checkedFoods.length === 0
                ? foods
                    .filter((food) => food.category === mealCategory)
                    .map((food) => (
                      <CheckBoxContainer key={food.id}>
                        <Input
                          type="checkbox"
                          value={food.id}
                          onChange={(e) => handleCheckedFoods(e, food)}
                        />
                        <CheckBox></CheckBox>
                        <TextFood>{food.description}</TextFood>
                      </CheckBoxContainer>
                    ))
                : checkedFoods
                    .filter((food) => food.category === mealCategory)
                    .map((food) => (
                      <div key={food.id}>
                        <CheckBoxContainer key={food.id}>
                          <Input
                            type="checkbox"
                            value={food.id}
                            checked
                            onChange={(e) => handleCheckedFoods(e, food)}
                          />
                          <CheckBox></CheckBox>
                          <TextFood>{food.description}</TextFood>
                        </CheckBoxContainer>
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
                <span>
                  <Subtitle>
                    Comida Selecionada:{' '}
                    <strong>{selectedFood.description}</strong>
                  </Subtitle>
                  <span>
                    <Subtitle>Defina a quantidade de macros da comida</Subtitle>
                    <div>
                      <label>Macro nutriente :</label>
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
                </span>
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
                          <strong>{' > '}</strong> Proteína:{' '}
                          {totalMacrosOnMeal.ptn}g
                        </Subtitle>
                      </li>
                      <li>
                        <Subtitle>
                          <strong>{' > '}</strong> Gordura:{' '}
                          {totalMacrosOnMeal.lip}g
                        </Subtitle>
                      </li>
                    </FoodsOnMealList>
                    <div>
                      <Button type="button" onClick={handleMealUpdate}>
                        Editar Refeição
                      </Button>
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
