import cl from './Modal.module.scss'

const Modal = (props) => {

    const {
        isOpen,
        children,
        onClose
    } = props

    if (!isOpen) {
        return null
    }

    return (
            <div>
                <div className={cl.modal}>
                    <div className={cl.modalContent}>
                        <div className = {cl.closeModal}
                             onClick={onClose}>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
    );
};

export default Modal;