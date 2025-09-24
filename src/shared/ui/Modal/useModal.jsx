import {useState} from "react";

//Если где-то еще нужно будет переиспользовать модальное окно

export const modalType = {
    menu: 'menu',
}

const stateClasses = {
    isLocked: 'isLocked',
}

const useModal = () => {
    const [activeModal, setActiveModal] = useState(null);

    const closeModal = () => {
        setActiveModal(null);
        document.documentElement.classList.remove(stateClasses.isLocked);
    }

    const openModal = (type) => {
        setActiveModal(type);
        document.documentElement.classList.add(stateClasses.isLocked);
    }

    return {
        openModal,
        closeModal,
        activeModal,
        modalType
    }
}
export default useModal;