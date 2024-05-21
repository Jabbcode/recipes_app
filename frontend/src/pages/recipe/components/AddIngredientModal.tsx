import { useState } from 'react'
import Modal from '../../../components/Modal'
import { toast } from 'sonner'
import { addIngredient } from '@/services/ingredients'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const AddIngredientModal = ({ isOpen, onClose }: Props) => {
  const [formModal, setFormModal] = useState({ name: '' })

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormModal((prevFormModalData) => ({
      ...prevFormModalData,
      [name]: value
    }))
  }

  const handleSubmit = async () => {
    try {
      const response = await addIngredient({ name: formModal.name })
      toast(response.data.message)
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
        <button type="button" onClick={handleSubmit}>
          Añadir
        </button>
      </div>
    </Modal>
  )
}
export default AddIngredientModal
