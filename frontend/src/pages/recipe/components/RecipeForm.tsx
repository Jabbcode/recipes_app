import { useEffect, useState } from 'react'
import { Ingredient } from '@/types/Ingredient'
import { Category } from '@/types/Category'
import { toast } from 'sonner'
import MultiInputIngredient from './MultiInputIngredient'
import { addRecipe } from '@/services/recipes'
import { findAllCategories } from '@/services/categories'

type Props = {
  isOpenModalCategory: boolean
  isOpenModalIngredient: boolean
  onCloseModalCategory: (toggle: boolean) => void
  onCloseModalIngredient: (toggle: boolean) => void
}

const RecipeForm = ({
  isOpenModalCategory,
  isOpenModalIngredient,
  onCloseModalCategory,
  onCloseModalIngredient
}: Props) => {
  const [form, setForm] = useState<any>([])

  const [selectedCategoriesOptions, setSelectedCategoriesOptions] = useState<string[]>([])
  const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([
    { name: '', quantity: '', unit: { id: 0, name: '' } }
  ])
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fecthCategories = async () => {
      try {
        const {data} = await findAllCategories()
        setCategories(data.data)
      } catch (error) {
        console.log(error)
      }
    }

    fecthCategories()
  }, [isOpenModalCategory])

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setForm({
      ...form,
      [name]: value
    })
  }

  const onChangeMultiSelectCategories = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option: HTMLOptionElement) => option.value
    )
    setSelectedCategoriesOptions(selectedValues)

    setForm((prevForm: any) => ({
      ...prevForm,
      categories: selectedValues.map((id) => {
        return { id: Number(id) }
      })
    }))
  }

  const onChangeSetIngredients = (ingredientsList: Ingredient[]) => {
    return ingredientsList.map((ingredient) => {
      return {
        id: Number(ingredient.id),
        quantity: Number(ingredient.quantity),
        unit: {
          id: Number(ingredient.unit)
        }
      }
    })
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const ingredients = onChangeSetIngredients(ingredientsList)

    try {
      const response = await addRecipe({
        name: form.name,
        categories: form.categories,
        ingredients
      })
      toast(response.data.message)

      //TODO: lIMPIAR FORMULARIO AL TERMINAR
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h2>Añadir Receta</h2>
      <form onSubmit={onSubmit}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '1rem'
          }}
        >
          <label htmlFor="name" style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
            Nombre
          </label>
          <input type="text" name="name" onChange={onChangeInput} style={{ padding: '10px' }} />
        </div>
        <div
          style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: '1fr 0.2fr'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '1rem'
            }}
          >
            <label htmlFor="categories" style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
              Categorias
            </label>
            <select
              multiple
              value={selectedCategoriesOptions}
              onChange={onChangeMultiSelectCategories}
              name="categories"
              style={{ padding: '10px' }}
            >
              <option selected disabled>
                Seleccione una categoria
              </option>
              {categories?.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                )
              })}
            </select>
          </div>
          <button onClick={() => onCloseModalCategory(true)} type="button">
            +
          </button>
        </div>
        <MultiInputIngredient
          isOpenModalIngredient={isOpenModalIngredient}
          ingredientsList={ingredientsList}
          setIngredientsList={setIngredientsList}
          onShowModal={onCloseModalIngredient}
        />
        <div style={{ display: 'grid' }}>
          <button type="submit">Añadir</button>
        </div>
      </form>
    </>
  )
}
export default RecipeForm
