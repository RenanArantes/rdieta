import axios from 'axios'
import { GetServerSideProps } from 'next'
import { ArrowsDownUp } from 'phosphor-react'
import { ChangeEvent, useState } from 'react'
import Food from '../@types/food'
import { Title } from '../components/Title'
import { TooltipIcon } from '../components/TooltipIcon'
import {
  HomeContainer,
  TableFoods,
  TableFoodsHeaderContainer,
  TableFoodsTitleContainer,
} from '../styles/pages/foods'
import roundedDivision from '../utils/roundedDivision'

interface DietProps {
  foods: Food[]
  categories: string[]
}

type TFoodsProps =
  | 'description'
  | 'carbohydrate_g'
  | 'protein_g'
  | 'lipid_g'
  | 'energy_kcal'
  | 'sodium_mg'

// Novo tipo para colunas opcionais
const optionalColumns = [
  'carbohydrate_g',
  'protein_g',
  'lipid_g',
  'energy_kcal',
  'sodium_mg',
] as const;
type OptionalColumn = typeof optionalColumns[number];

export default function Foods({ foods, categories }: DietProps) {
  const [foodsList, setFoodsList] = useState<Food[]>(foods)
  const [foodListCategory, setFoodListCategory] = useState<string>(
    categories[0],
  )
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [orderBy, setOrderBy] = useState<TFoodsProps>('' as TFoodsProps)

  const [visibleColumns, setVisibleColumns] = useState<Record<OptionalColumn, boolean>>({
    carbohydrate_g: true,
    protein_g: true,
    lipid_g: true,
    energy_kcal: true,
    sodium_mg: false,
  })

  const orderFoodsBy = (keyName: TFoodsProps) => {
    setOrderBy(keyName)

    const sortedFoods = [...foodsList].sort((a: Food, b: Food) => {
      if (a[keyName] < b[keyName]) {
        if (order === 'asc') return -1
        return 1
      }
      if (a[keyName] > b[keyName]) {
        if (order === 'asc') return 1
        return -1
      }

      return 0
    })

    if (orderBy === keyName) {
      setOrder(order === 'asc' ? 'desc' : 'asc')
    }

    setFoodsList(() => sortedFoods)
  }

  function handleCategoryChange(e: ChangeEvent<HTMLSelectElement>) {
    setFoodListCategory(e.target.value)
  }

  function handleColumnToggle(column: OptionalColumn) {
    setVisibleColumns((prev) => ({
      ...prev,
      [column]: !prev[column],
    }))
  }

  return (
    <HomeContainer>
      <TableFoodsHeaderContainer>
        <TableFoodsTitleContainer>
          <Title>Comidas por categoria</Title>
          <TooltipIcon
            tooltipText="Listagem de calorias e macros nutrientes a cada 100g do alimento por categoria."
            size={18}
          />
        </TableFoodsTitleContainer>
        {/* <Subtitle>Listagem de calorias e macros nutrientes a cada 100g do alimento por categoria.</Subtitle> */}
        <select onChange={handleCategoryChange}>
          {categories &&
            categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </select>
      </TableFoodsHeaderContainer>

      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'center' }}>
        {/* Checkboxes para mostrar/esconder colunas, exceto Nome */}
        {optionalColumns.map((key) => (
          <label key={key} style={{ marginRight: 12 }}>
            <input
              type="checkbox"
              checked={visibleColumns[key]}
              onChange={() => handleColumnToggle(key)}
            />{' '}
            {(() => {
              switch (key) {
                case 'carbohydrate_g': return 'Carboidratos';
                case 'protein_g': return 'Proteínas';
                case 'lipid_g': return 'Gorduras';
                case 'energy_kcal': return 'Calorias';
                case 'sodium_mg': return 'Sódio';
                default: return key;
              }
            })()}
          </label>
        ))}
      </div>

      <div>
        <TableFoods>
          <thead>
            <tr>
              <th
                onClick={(event) => {
                  event.preventDefault()
                  orderFoodsBy('description')
                }}
              >
                Nome <ArrowsDownUp />
              </th>
              {visibleColumns.carbohydrate_g && (
                <th
                  onClick={(event) => {
                    event.preventDefault()
                    orderFoodsBy('carbohydrate_g')
                  }}
                >
                  Carboidratos
                  <ArrowsDownUp />
                </th>
              )}
              {visibleColumns.protein_g && (
                <th
                  onClick={(event) => {
                    event.preventDefault()
                    orderFoodsBy('protein_g')
                  }}
                >
                  Proteínas
                  <ArrowsDownUp />
                </th>
              )}
              {visibleColumns.lipid_g && (
                <th
                  onClick={(event) => {
                    event.preventDefault()
                    orderFoodsBy('lipid_g')
                  }}
                >
                  Gorduras
                  <ArrowsDownUp />
                </th>
              )}
              {visibleColumns.energy_kcal && (
                <th
                  onClick={(event) => {
                    event.preventDefault()
                    orderFoodsBy('energy_kcal')
                  }}
                >
                  Calorias
                  <ArrowsDownUp />
                </th>
              )}
              {visibleColumns.sodium_mg && (
                <th
                  onClick={(event) => {
                    event.preventDefault()
                    orderFoodsBy('sodium_mg')
                  }}
                >
                  Sódio
                  <ArrowsDownUp />
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {foodsList
              .filter((food): boolean => food.category === foodListCategory)
              .map((food) => {
                return (
                  <tr key={food.id}>
                    <td>{food.description}</td>
                    {visibleColumns.carbohydrate_g && <td>{food.carbohydrate_g} g</td>}
                    {visibleColumns.protein_g && <td>{food.protein_g} g</td>}
                    {visibleColumns.lipid_g && <td>{food.lipid_g} g</td>}
                    {visibleColumns.energy_kcal && <td>{food.energy_kcal} kcal</td>}
                    {visibleColumns.sodium_mg && <td>{food.sodium_mg} mg</td>}
                  </tr>
                )
              })}
          </tbody>
        </TableFoods>
      </div>
    </HomeContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await axios.get<Food[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/foods`)

  const categories = [] as string[]

  const fetchedFoods = response.data.map<Food>((food) => {
    if (categories.indexOf(food.category) === -1) {
      categories.push(food.category)
    }

    return {
      ...food,
      energy_kcal: isNaN(roundedDivision(food.energy_kcal))
        ? 0
        : roundedDivision(food.energy_kcal),
      carbohydrate_g: isNaN(roundedDivision(food.carbohydrate_g))
        ? 0
        : roundedDivision(food.carbohydrate_g),
      protein_g: isNaN(roundedDivision(food.protein_g))
        ? 0
        : roundedDivision(food.protein_g),
      lipid_g: isNaN(roundedDivision(food.lipid_g))
        ? 0
        : roundedDivision(food.lipid_g),
      sodium_mg: isNaN(roundedDivision(food.sodium_mg))
        ? 0
        : roundedDivision(food.sodium_mg),
    }
  })

  return {
    props: {
      foods: fetchedFoods,
      categories,
    },
  }
}
