import axios from 'axios'
import { GetServerSideProps } from 'next'
import { ArrowsDownUp } from 'phosphor-react'
import { ChangeEvent, useState } from 'react'
import Food from '../@types/food'
import { Select } from '../components/Select'
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

export default function Foods({ foods, categories }: DietProps) {
  const [foodsList, setFoodsList] = useState<Food[]>(foods)
  const [foodListCategory, setFoodListCategory] = useState<string>(
    categories[0],
  )
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [orderBy, setOrderBy] = useState<TFoodsProps>('' as TFoodsProps)


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
        <Select onChange={handleCategoryChange}>
          {categories &&
            categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </Select>
      </TableFoodsHeaderContainer>

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
              <th
                onClick={(event) => {
                  event.preventDefault()
                  orderFoodsBy('carbohydrate_g')
                }}
              >
                Carboidratos
                <ArrowsDownUp />
              </th>
              <th
                onClick={(event) => {
                  event.preventDefault()
                  orderFoodsBy('protein_g')
                }}
              >
                Proteínas
                <ArrowsDownUp />
              </th>
              <th
                onClick={(event) => {
                  event.preventDefault()
                  orderFoodsBy('lipid_g')
                }}
              >
                Gorduras
                <ArrowsDownUp />
              </th>
              <th
                onClick={(event) => {
                  event.preventDefault()
                  orderFoodsBy('energy_kcal')
                }}
              >
                Calorias
                <ArrowsDownUp />
              </th>
              <th
                onClick={(event) => {
                  event.preventDefault()
                  orderFoodsBy('sodium_mg')
                }}
              >
                Sódio
                <ArrowsDownUp />
              </th>
            </tr>
          </thead>
          <tbody>
            {foodsList
              .filter((food): boolean => food.category === foodListCategory)
              .map((food) => {
                return (
                  <tr key={food.id}>
                    <td>{food.description}</td>
                    <td>{food.carbohydrate_g} g</td>
                    <td>{food.protein_g} g</td>
                    <td>{food.lipid_g} g</td>
                    <td>{food.energy_kcal} kcal</td>
                    <td>{food.sodium_mg} mg</td>
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
