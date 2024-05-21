import { Category } from './Category'
import { IngredientWithoutUnitId } from './Ingredient'

export interface Recipe {
  id?: number
  name: String
  categories: Category[]
  ingredients: IngredientWithoutUnitId[]
}
