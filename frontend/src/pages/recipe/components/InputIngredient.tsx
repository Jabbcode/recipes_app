import { useState, useEffect } from 'react'
import { Ingredient } from '@/types/Ingredient'
import { Unit } from '@/types/Unit'

type Props<T> = {
  index: number
  ingredients: Ingredient[]
  setIngredients: React.Dispatch<React.SetStateAction<T[]>>
}

type Event = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>

const InputIngredient = ({ index, ingredients, setIngredients }: Props<Ingredient>) => {
  const [units, setUnits] = useState<Unit[]>([])

  const onDeleteInput = (indexToDelete: number) => {
    setIngredients((prevArray) => prevArray.filter((_, index) => index !== indexToDelete))
  }

  useEffect(() => {
    const fecthUnits = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/units')
        const { data } = await response.json()
        setUnits(data)
      } catch (error) {
        console.log(error)
      }
    }

    fecthUnits()
  }, [])

  const handleChange = (index: number, event: Event) => {
    const { name, value } = event.target
    setIngredients((prevList) =>
      prevList.map((item, i) => (i === index ? { ...item, [name]: value } : item))
    )
  }

  return (
    <div style={{ display: 'flex', gap: '1rem', margin: '0.5rem 0' }}>
      <select
        onChange={(event) => handleChange(index, event)}
        name="id"
        style={{ padding: '10px' }}
      >
        <option selected disabled>
          Nombre
        </option>
        {ingredients?.map((ingredient) => {
          return (
            <option key={ingredient.id} value={ingredient.id}>
              {ingredient.name}
            </option>
          )
        })}
      </select>
      <input
        onChange={(event) => handleChange(index, event)}
        type="number"
        name="quantity"
        placeholder="Cantidad"
        style={{ padding: '10px' }}
      />
      <select
        onChange={(event) => handleChange(index, event)}
        name="unit"
        style={{ padding: '10px' }}
      >
        <option selected disabled>
          Seleccione una medida
        </option>
        {units.map((unit) => {
          return <option key={unit.id} value={unit.id}>{unit.name}</option>
        })}
      </select>
      {index !== 0 && (
        <button onClick={() => onDeleteInput(index)} type="button">
          x
        </button>
      )}
    </div>
  )
}
export default InputIngredient
