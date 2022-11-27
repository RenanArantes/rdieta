import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Food from '../../../../@types/food'
import { MealContext } from '../../../../contexts/Meal'

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
  mealToEdit?: Meal
}

export function MealFormModal({
  foodList,
  categories,
  handleDisplayModal,
  mealToEdit,
}: MealFormModalProps) {
  const { createMeal } = useContext(MealContext)

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors },
  } = useForm()

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
    console.log('setou food list')
    setFoods(foodList)
  }, [])

  useEffect(() => {
    console.log('mealToEdit')
    console.log(mealToEdit?.name)
  }, [mealToEdit])

  useEffect(() => {
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

    const weightGoal = findWeightOfSelectedFood(macroValue)

    setGoalFoodWeight(weightGoal)
  }, [selectedMetaMacro])

  function findWeightOfSelectedFood(foodMacro: number) {
    const weightGoal =
      metaMacroValue === 0 ? foodMacro : (100 * metaMacroValue) / foodMacro

    return weightGoal
  }

  function removeFoodOnMealOfFoods(foodToRemove: Food) {
    const updatedFoods = foods.filter((food) => food.id !== foodToRemove.id)

    setFoods(updatedFoods)
  }

  function findMacrosOfSelectedFood() {
    const choGoal = (selectedFood.carbohydrate_g / 100) * goalFoodWeight
    const ptnGoal = (selectedFood.protein_g / 100) * goalFoodWeight
    const lipGoal = (selectedFood.lipid_g / 100) * goalFoodWeight

    return { cho: choGoal, ptn: ptnGoal, lip: lipGoal }
  }

  function setMetaWeightGoal(macroType: string) {}

  function handleCheckedFoods(e: any, newFood: Food) {
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

  function handleAddFoodOnMeal(newFood: Food) {
    const macrosValuesOfSeletedFood = findMacrosOfSelectedFood()

    const foodToAddOnMeal: FoodOnMeal = {
      ...newFood,
      carbohydrate_g: macrosValuesOfSeletedFood.cho,
      protein_g: macrosValuesOfSeletedFood.ptn,
      lipid_g: macrosValuesOfSeletedFood.lip,
      goals: {
        macroType: selectedMetaMacro,
        macroValue: metaMacroValue,
        weight: goalFoodWeight,
      },
    }

    console.log('foodToAddOnMeal')
    console.log(foodToAddOnMeal)

    setFoodsOnMeal((state) => [...state, foodToAddOnMeal])

    const updatedFoodsToList = foods.filter(
      (food) => food.id !== foodToAddOnMeal.id,
    )

    setFoods(updatedFoodsToList)

    setTotalMacrosOnMeal((state) => {
      return {
        cho: state.cho + macrosValuesOfSeletedFood.cho,
        ptn: state.ptn + macrosValuesOfSeletedFood.ptn,
        lip: state.lip + macrosValuesOfSeletedFood.lip,
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

    setGoalFoodWeight(0)
    setSelectedFood((state) => emptyFood)
    setCheckedFoods(updatedCheckedFoods)
  }

  function handleCategoryChange(e: ChangeEvent<HTMLSelectElement>) {
    setMealCategory(e.target.value)
  }

  function handleMetaMacroValue(e: ChangeEvent<HTMLInputElement>) {
    setMetaMacroValue(Number(e.target.value))
  }

  function handleSelectedMetaMacro(e: ChangeEvent<HTMLSelectElement>) {
    const selectedMetaMacro = e.target.value as 'cho' | 'ptn' | 'lip'

    setSelectedMetaMacro(selectedMetaMacro)
  }

  function handleMealCreation(data: { mealName: string }) {
    console.log(data)

    const newMealData = {
      newName: data.mealName,
      foods: foodsOnMeal,
      totalMacros: totalMacrosOnMeal,
    }

    createMeal(newMealData)

    setGoalFoodWeight(0)
    setMealName('' as string)
    setFoodsOnMeal([] as FoodOnMeal[])
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

  console.log('errors')
  console.log(errors)

  return (
    <div
      style={{
        backgroundColor: '#fefefe',
        margin: 'auto',
        marginTop: '50px',
        padding: '20px',
        border: '0px solid #888',
        width: '80%',
        height: '85%',
        overflow: 'auto',
      }}
    >
      <span
        style={{
          color: 'black',
          float: 'right',
          fontSize: '28px',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
        onClick={handleDisplayModal}
      >
        &times;
      </span>
      <form onSubmit={handleSubmit(handleMealCreation)}>
        <span>
          <label>Nome da Refeição</label>{' '}
          <input
            type="text"
            autoComplete="off"
            {...register('mealName', {
              value: '',
              max: 255,
              min: 3,
              required: true,
            })}
          />
        </span>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <span>
            <select onChange={handleCategoryChange}>
              {categories &&
                categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
            <p>
              <strong>Valor em 100g de macros do alimento: </strong>
            </p>
            {checkedFoods.length === 0
              ? foods
                  .filter((food) => food.category === mealCategory)
                  .map((food) => (
                    <div key={food.id}>
                      <input
                        type="checkbox"
                        value={food.id}
                        onChange={(e) => handleCheckedFoods(e, food)}
                      />
                      {food.description}
                    </div>
                  ))
              : checkedFoods
                  .filter((food) => food.category === mealCategory)
                  .map((food) => (
                    <div key={food.id}>
                      <input
                        type="checkbox"
                        value={food.id}
                        onChange={(e) => handleCheckedFoods(e, food)}
                      />
                      {food.description}
                      <ul>
                        {/* First word of the selected food */}
                        <h3>Macros de {food.description.split(',')[0]}</h3>
                        <li>CHO: {food.carbohydrate_g}</li>
                        <li>PTN: {food.protein_g}</li>
                        <li>LIP: {food.lipid_g}</li>
                      </ul>
                    </div>
                  ))}
          </span>
          <span>
            <div style={{ padding: 25, marginLeft: 25 }}>
              {Object.entries(selectedFood).length > 0 ? (
                <span>
                  <p>
                    Comida Selecionada:{' '}
                    <strong>{selectedFood.description}</strong>
                  </p>
                  <ul>
                    <span>
                      Para alcançar{' '}
                      <input
                        type="number"
                        min="0.1"
                        max="1000"
                        step="1"
                        name="metaMacroValue"
                        title="Defina aqui a quantidade do macronutriente que deseja alcançar"
                        onChange={(e) => handleMetaMacroValue(e)}
                        required
                        style={{ width: '40px' }}
                      />
                      g de{' '}
                      <select
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
                      </select>{' '}
                      serão necessários <strong>{goalFoodWeight}</strong>g do
                      alimento.
                      <button
                        type="button"
                        onClick={() => handleAddFoodOnMeal(selectedFood)}
                      >
                        Adicionar na refeição
                      </button>
                    </span>
                  </ul>
                </span>
              ) : (
                <p>Nenhuma comida selecionada</p>
              )}
            </div>

            <div>
              <p>
                Alimentos na refeição: <strong>{mealName}</strong>
              </p>
              {foodsOnMeal.length > 0 ? (
                <div>
                  <ul>
                    {foodsOnMeal.map((food) => (
                      <li key={food.id}>
                        {food.description} | {food.goals.weight}g
                      </li>
                    ))}
                  </ul>
                  <div>
                    <ul
                      style={{
                        listStyle: 'none',
                      }}
                    >
                      <li>
                        <strong style={{ fontSize: 20 }}>{' > '}</strong>
                        Carboidratos: {totalMacrosOnMeal.cho}
                      </li>
                      <li>
                        <strong style={{ fontSize: 20 }}>{' > '}</strong>{' '}
                        Proteína: {totalMacrosOnMeal.ptn}
                      </li>
                      <li>
                        <strong style={{ fontSize: 20 }}>{' > '}</strong>{' '}
                        Gordura: {totalMacrosOnMeal.lip}
                      </li>
                    </ul>
                    <div>
                      <button type="submit">Criar Refeição</button>
                    </div>
                  </div>
                </div>
              ) : (
                <p style={{ color: 'red' }}>
                  <strong>0</strong> comidas selecionadas
                </p>
              )}
            </div>
          </span>
        </div>
      </form>
    </div>
  )
}