import { useState } from 'react'

import RecipeForm from '@/pages/recipe/components/RecipeForm'
import AddIngredientModal from '@/pages/recipe/components/AddIngredientModal'
import AddCategoryModal from '@/pages/recipe/components/AddCategoryModal'

const RecipePage = () => {
  const [isOpenModalCategory, setIsOpenModalCategory] = useState(false)
  const [isOpenModalIngredient, setIsOpenModalIngredient] = useState(false)

  const onCloseModalCategory = () => {
    setIsOpenModalCategory(false)
  }

  const onCloseModalIngredient = () => {
    setIsOpenModalIngredient(false)
  }

  return (
    <>
      <RecipeForm
        isOpenModalIngredient={isOpenModalIngredient}
        isOpenModalCategory={isOpenModalCategory}
        onCloseModalCategory={setIsOpenModalCategory}
        onCloseModalIngredient={setIsOpenModalIngredient}
      />

      <AddCategoryModal isOpen={isOpenModalCategory} onClose={onCloseModalCategory} />

      <AddIngredientModal isOpen={isOpenModalIngredient} onClose={onCloseModalIngredient} />
    </>
  )
}

export default RecipePage
