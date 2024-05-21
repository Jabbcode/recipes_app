import { Recipe } from '@/types/Recipe'
import { axiosInstance } from '@/utils/axiosHelper'

export const findAllRecipes = async () => {
  return await axiosInstance.get('/recipes')
}

export const addRecipe = async (data: Recipe) => {
  return await axiosInstance.post('/recipes', data)
}
