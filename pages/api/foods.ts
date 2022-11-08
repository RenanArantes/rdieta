// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { foods } from './data/foods'

interface Food {
  id: number
  description: string
  energy_kcal: number
}

const foodsData = foods

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Food[]>,
) {
  const formatedFoods = foodsData.map((food) => {
    const { id, description, energy_kcal } = food

    return {
      id,
      description,
      energy_kcal,
    }
  })

  return res.status(200).json(formatedFoods)
}
