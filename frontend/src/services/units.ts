import { Unit } from '@/types/Unit'
import { axiosInstance } from '@/utils/axiosHelper'

export const findAllUnits = async () => {
  return await axiosInstance.get('/units')
}

export const addUnit = async (data: Unit) => {
  return await axiosInstance.post('/units', data)
}
