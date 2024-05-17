import { useState } from 'react'

import RecipeForm from '@/pages/recipe/components/RecipeForm'
import CreateIngredientModal from '@/components/CreateIngredientModal'
import CreateCategoryModal from '@/components/CreateCategoryModal'

export const RecipePage = () => {
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

      <CreateCategoryModal isOpen={isOpenModalCategory} onClose={onCloseModalCategory} />

      <CreateIngredientModal isOpen={isOpenModalIngredient} onClose={onCloseModalIngredient} />
    </>
  )
}
