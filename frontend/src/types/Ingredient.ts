import { Unit } from './Unit'

export interface Ingredient {
  id?: number
  name: String
  quantity: number | string
  unit: Unit
}

export interface IngredientSimple {
  id?: number
  name: String
}
