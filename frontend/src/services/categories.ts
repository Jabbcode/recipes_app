import { Category } from '@/types/Category'
import { axiosInstance } from '@/utils/axiosHelper'

export const findAllCategories = async () => {
  return await axiosInstance.get('/categories')
}

export const addCategory = async (data: Category) => {
  return await axiosInstance.post('/categories', data)
}
