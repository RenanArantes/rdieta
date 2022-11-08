import axios from 'axios'
import { GetServerSideProps } from 'next'

interface Food {
  id: number
  description: string
  energy_kcal: number
}

interface HomeProps {
  foods: Food[]
}

export default function Home({ foods }: HomeProps) {
  return (
    <div>
      <h1>Rdieta</h1>
      <div>
        <ul>
          {foods &&
            foods.map((food) => {
              return (
                <div key={food.id}>
                  <li>
                    Comida: <strong>{food.description}</strong>
                    <br />
                    Calorias: <strong>{food.energy_kcal}</strong>
                  </li>
                  <hr />
                </div>
              )
            })}
        </ul>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await axios.get<Food[]>('http://localhost:3000/api/foods')

  const fetchedFoods = response.data.map((food) => {
    return food
  })

  return {
    props: {
      foods: fetchedFoods,
    },
  }
}
