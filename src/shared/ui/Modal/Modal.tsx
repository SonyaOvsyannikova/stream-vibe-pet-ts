import cl from './Modal.module.scss'
import { ReactNode } from 'react'

type ModalProps = {
  isOpen: boolean
  children?: ReactNode
  onClose: () => void
}

const Modal = (props: ModalProps) => {
  const { isOpen, children, onClose } = props

  if (!isOpen) {
    return null
  }

  return (
    <div>
      <div className={cl.modal}>
        <div className={cl.modalContent}>
          <div className={cl.closeModal} onClick={onClose && onClose}></div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
