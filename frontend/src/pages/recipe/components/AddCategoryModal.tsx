import { useState } from 'react'
import Modal from '@/components/Modal'
import { toast } from 'sonner'
import { addCategory } from '@/services/categories'

type Props = {
  isOpen: boolean
  onClose: () => void
}

const AddCategoryModal = ({ isOpen, onClose }: Props) => {
  const [formModal, setFormModal] = useState({ name: '' })

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormModal((prevFormModalData) => ({
      ...prevFormModalData,
      [name]: value
    }))
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await addCategory({ name: formModal.name })
      toast(response.data.message)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Añadir Categoria</h2>
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
          <input type="text" name="name" onChange={onChange} style={{ padding: '10px' }} />
        </div>
        <button type="submit">Añadir</button>
      </form>
    </Modal>
  )
}
export default AddCategoryModal
