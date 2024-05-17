import { useState } from 'react'
import Modal from './Modal'
import { toast } from 'sonner'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const CreateIngredientModal = ({ isOpen, onClose }: Props) => {
  const [formModal, setFormModal] = useState({ name: '' })

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormModal((prevFormModalData) => ({
      ...prevFormModalData,
      [name]: value
    }))
  }

  const createIngredient = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/ingredients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formModal.name
        })
      })
      const data = await response.json()
      toast(data.message)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Añadir Ingrediente</h2>
      <div>
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
          <input type="text" name="name" onChange={onChange} style={{ padding: '10px' }} />
        </div>
        <button type="button" onClick={createIngredient}>
          Añadir
        </button>
      </div>
    </Modal>
  )
}
export default CreateIngredientModal
