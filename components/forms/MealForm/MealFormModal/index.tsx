import { ChangeEvent, useEffect, useState } from 'react'

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

interface Food {
  id: number
  description: string
  category: string
  energy_kcal: number
  protein_g: number
  lipid_g: number
  carbohydrate_g: number
}

interface FoodOnMeal extends Food {
  goals: GoalsValues
}

interface MealFormModalProps {
  foods: Food[]
  categories: string[]
  mealName: string
  handleDisplayModal: () => void
}

interface MealProps {
  name: string
  foods: Food[]
  macroNutrients: MacroNutrients
  totalKcal: number
}

export function MealFormModal({
  foods,
  categories,
  mealName,
  handleDisplayModal,
}: MealFormModalProps) {
  const [mealCategory, setMealCategory] = useState('')

  const [checkedFoods, setCheckedFoods] = useState([] as Food[])
  const [foodsOnMeal, setFoodsOnMeal] = useState([] as FoodOnMeal[])
  const [selectedFood, setSelectedFood] = useState({} as Food)

  const [goalFoodWeight, setGoalFoodWeight] = useState(0)
  const [metaMacro, setMetaMacro] = useState(0)
  const [selectedMetaMacro, setSelectedMetaMacro] = useState(
    '' as 'cho' | 'ptn' | 'lip',
  )

  const [meal, setMeal] = useState([] as MealProps[])

  useEffect(() => {
    setMealCategory(categories[0])
  }, [])

  function findMacroValue(foodMacro: number) {
    const weightGoal =
      metaMacro === 0 ? foodMacro : (100 * metaMacro) / foodMacro

    return weightGoal
  }

  function handleMetaMacroChange(macroType: 'cho' | 'ptn' | 'lip') {
    console.log('macro type')
    console.log(macroType)

    setMetaMacro(macroType)

    let macroValue = 0

    if (macroType === 'cho') {
      macroValue = selectedFood.carbohydrate_g
    } else if (macroType === 'ptn') {
      macroValue = selectedFood.protein_g
    } else {
      macroValue = selectedFood.lipid_g
    }

    const weightGoal = findMacroValue(macroValue)

    setGoalFoodWeight(weightGoal)
  }

  function handleAddFoodOnMeal(newFood: Food) {
    console.log(foodsOnMeal)

    const foodToAddOnMeal: FoodOnMeal = {
      ...newFood,
      goals: {
        macroType: selectedMetaMacro,
        macroValue: metaMacro,
        weight: goalFoodWeight,
      },
    }

    setFoodsOnMeal((state) => [...state, foodToAddOnMeal])

    const updatedCheckedFoods = checkedFoods.filter(
      (food) => food.id !== newFood.id,
    )
    const emptyFood = {} as Food

    setSelectedFood((state) => emptyFood)
    setCheckedFoods(updatedCheckedFoods)
  }

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

  function handleCategoryChange(e: ChangeEvent<HTMLSelectElement>) {
    setMealCategory(e.target.value)
  }

  function handleMetaMacroValue(e: ChangeEvent<HTMLInputElement>) {
    setMetaMacro(Number(e.target.value))
  }

  return (
    <div
      style={{
        backgroundColor: '#fefefe',
        margin: 'auto',
        marginTop: '50px',
        padding: '20px',
        border: '0px solid #888',
        width: '80%',
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
      <div>
        <span>
          <label>Valor do macro</label>
          <input
            type="number"
            min="0"
            max="1000"
            step="1"
            defaultValue={metaMacro}
            onChange={handleMetaMacroValue}
          />
          <label>g de Macro Nutriente</label>
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
            <ul>
              {foods
                .filter((food) => food.category === mealCategory)
                .map((food) => {
                  const verifiedCheckedFoods = checkedFoods.filter(
                    (foodChecked) => foodChecked.id === food.id,
                  )
                  if (verifiedCheckedFoods.length === 0) {
                    return (
                      <li key={food.id} style={{ listStyle: 'none' }}>
                        <input
                          type="checkbox"
                          value={food.description}
                          onChange={(e) => {
                            handleCheckedFoods(e, food)
                          }}
                        />
                        {'  '}
                        {food.description}
                        {' : '}
                        <span>
                          {'[ '}Cho: <strong>{food.carbohydrate_g}</strong>{' '}
                          {' ]'}-{' '}
                        </span>
                        <span>
                          {'[ '}Ptn: <strong>{food.protein_g}</strong> {' ]'}-{' '}
                        </span>
                        <span>
                          {'[ '}Lip: <strong>{food.lipid_g}</strong>
                          {' ]'}
                        </span>
                      </li>
                    )
                  } else {
                    return (
                      <li key={food.id} style={{ listStyle: 'none' }}>
                        <input
                          type="checkbox"
                          value={food.description}
                          checked
                          onChange={(e) => {
                            handleCheckedFoods(e, food)
                          }}
                        />
                        {'  '}
                        {food.description}
                        {' : '}
                        <span>
                          {'[ '}Cho: <strong>{food.carbohydrate_g}</strong>{' '}
                          {' ]'}-{' '}
                        </span>
                        <span>
                          {'[ '}Ptn: <strong>{food.protein_g}</strong> {' ]'}-{' '}
                        </span>
                        <span>
                          {'[ '}Lip: <strong>{food.lipid_g}</strong>
                          {' ]'}
                        </span>
                      </li>
                    )
                  }
                })}
            </ul>
          </span>
          <span>
            <div>
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
                        min="0"
                        max="1000"
                        step="1"
                        defaultValue={metaMacro}
                        onChange={handleMetaMacroValue}
                        style={{ width: '40px' }}
                        title="Defina aqui a quantidade do macronutriente que deseja alcançar"
                      />
                      g de{' '}
                      <select
                        defaultValue=""
                        onChange={(e) => handleMetaMacroChange(e.target.value)}
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
              <h3>Alimentos na refeição: {mealName}</h3>
              {foodsOnMeal.length > 0 ? (
                <ul>
                  {foodsOnMeal.map((food) => (
                    <li key={food.id}>
                      {food.description} | {food.goals.weight}g
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: 'red' }}>
                  <strong>0</strong> comidas selecionadas
                </p>
              )}
            </div>
          </span>
        </div>
      </div>
    </div>
  )
}
