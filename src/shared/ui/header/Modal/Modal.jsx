import React from 'react';
import cl from './Modal.module.scss'


const Modal = ({isOpen, children, onClose}) => {
    return (
        isOpen ?
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
            : null
    );
};

export default Modal;