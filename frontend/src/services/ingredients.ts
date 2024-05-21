import { IngredientSimple } from '@/types/Ingredient'
import { axiosInstance } from '@/utils/axiosHelper'

export const findAllIngredients = async () => {
  return await axiosInstance.get('/ingredients')
}

export const addIngredient = async (data: IngredientSimple) => {
  return await axiosInstance.post('/ingredients', data)
}
