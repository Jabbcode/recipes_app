import { PropsWithChildren } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
}
3
const Modal = ({ isOpen, onClose, children }: PropsWithChildren<Props>) => {
  const handleClose = () => {
    onClose()
  }

  const modalStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  }

  const modalContentStyles: React.CSSProperties = {
    width: '350px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
    zIndex: 1100
  }

  const closeButtonStyles: React.CSSProperties = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    color: '#333'
  }

  return (
    <>
      {isOpen && (
        <div className="modal-overlay" style={modalStyles}>
          <div className="modal" style={modalContentStyles}>
            <button className="close-btn" onClick={handleClose} style={closeButtonStyles}>
              Cerrar
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
