import { SetStateAction, useEffect, useState } from 'react'
import { Ingredient } from '@/types/Ingredient'
import InputIngredient from './InputIngredient'
import { findAllIngredients } from '@/services/ingredients'

type Props = {
  ingredientsList: Ingredient[]
  isOpenModalIngredient: boolean
  setIngredientsList: React.Dispatch<SetStateAction<Ingredient[]>>
  onShowModal: (toggle: boolean) => void
}

const MultiInputIngredient = ({
  ingredientsList,
  isOpenModalIngredient,
  setIngredientsList,
  onShowModal
}: Props) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])

  useEffect(() => {
    const fecthIngredients = async () => {
      try {
        const {data} = await findAllIngredients()
        setIngredients(data.data)
      } catch (error) {
        console.log(error)
      }
    }

    fecthIngredients()
  }, [isOpenModalIngredient])

  const addInputIngredient = () => {
    setIngredientsList((prevArray) => [
      ...prevArray,
      { name: '', quantity: '', unit: { id: 0, name: '' } }
    ])
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '1rem'
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            marginBottom: '0.5rem',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label htmlFor="ingredients" style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
              Ingredientes
            </label>
            <button
              onClick={addInputIngredient}
              type="button"
              style={{ gridColumn: '3', padding: '12px 18px' }}
            >
              +
            </button>
          </div>
          <button onClick={() => onShowModal(true)} type="button">
            +
          </button>
        </div>
        {ingredientsList.map((_, index) => (
          <InputIngredient
            key={index}
            index={index}
            ingredients={ingredients}
            setIngredients={setIngredientsList}
          />
        ))}
      </div>
    </>
  )
}
export default MultiInputIngredient
