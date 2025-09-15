import {useState} from "react";

//Если где-то еще нужно будет переиспользовать модальное окно

const modalType = {
    menu: 'menu',
}
const useModal = () => {
    const [activeModal, setActiveModal] = useState(null);

    const closeModal = () => {
        setActiveModal(null);
    }
    const openModal = (type) => {
        setActiveModal(type);
    }
    return {
        openModal,
        closeModal,
        activeModal,
        modalType,
    }

}
export default useModal;