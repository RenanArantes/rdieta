import { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import {
  Bar,
  CheckBox,
  CheckBoxContainer,
  FoodInputContainer,
  TextFood,
} from './styles'
import { Input } from '../Input'
import Food from '../../@types/food'
import { Subtitle } from '../Subtitle'

interface FoodSearchBarProps {
  data: Food[]
  selectedFood: Food
  mealCategory: string
  checkedFoods: (e: any, newFood: Food) => void
  children?: ReactNode
}

export function FoodSearchBar({
  data,
  selectedFood,
  mealCategory,
  checkedFoods,
  children,
}: FoodSearchBarProps) {
  const [searchValue, setSearchValue] = useState('')
  const [searchType, setSearchType] = useState('exact' || 'contains')
  const [searchResults, setSearchResults] = useState<[] | Food[]>([])
  const [foods, setFoods] = useState<[] | Food[]>([])

  useEffect(() => {
    setFoods(data)
    setSearchResults(data)

    console.log('searchType')
    console.log(searchType)
  }, [data, foods])

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.length > 0 ? event.target.value : ''
    if (value === '') {
      setSearchValue(value)
      setSearchResults((state) => foods)
    } else {
      setSearchValue(value)

      const results = foods.filter((food) => {
        if (searchType === 'exact') {
          // transforma 'Arroz, Integral, Cozido' em 'arroz integral cozido'
          return food.description
            .toLocaleLowerCase()
            .split(', ')
            .join(' ')
            .startsWith(value.toLowerCase())
        } else if (searchType === 'contains') {
          // !! Essa lógica ainda não está terminada //
          const foodDescriptionArray = food.description
            .toLowerCase()
            .split(', ')

          return foodDescriptionArray.includes(value.toLowerCase())
        } else {
          return food.description.toLowerCase() === value.toLowerCase()
        }
      })

      setSearchResults(results)
    }
  }

  function handleCheckedFoods(e: any, newFood: Food) {
    checkedFoods(e, newFood)
    if (Object.keys(selectedFood).length === 0) {
      setSearchResults((state) => [newFood])
    } else {
      setSearchResults((state) => data)
      setSearchValue('')
    }
  }

  return (
    <FoodInputContainer>
      {Object.keys(selectedFood).length === 0 && (
        <Input
          type="text"
          value={searchValue}
          onChange={handleSearch}
          placeholder="Pesquise uma comida"
        />
      )}

      <ul>
        {searchResults
          .filter((result) => result.category === mealCategory)
          .map((result) => (
            <CheckBoxContainer key={result.id}>
              <Input
                type="checkbox"
                value={result.id}
                onChange={(e) => handleCheckedFoods(e, result)}
              />
              <CheckBox></CheckBox>
              <TextFood>{result.description}</TextFood>
            </CheckBoxContainer>
          ))}
      </ul>
      {children}
    </FoodInputContainer>
  )
}
