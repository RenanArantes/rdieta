// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { foods } from './data/foods'

interface Food {
  id: number
  description: string
  category: string
  energy_kcal: number
  protein_g: number
  lipid_g: number
  carbohydrate_g: number
}

const foodsData = foods

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Food[]>,
) {
  const formatedFoods = foodsData.map((food) => {
    const {
      id,
      description,
      category,
      energy_kcal,
      protein_g,
      lipid_g,
      carbohydrate_g,
    } = food

    return {
      id,
      description,
      category,
      energy_kcal,
      protein_g,
      lipid_g,
      carbohydrate_g,
    }
  })

  return res.status(200).json(formatedFoods)
}
