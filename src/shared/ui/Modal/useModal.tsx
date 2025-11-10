import { useState } from "react";

interface IModalType {
    openModal: (type: keyof typeof modalType) => void;
    closeModal: () => void;
    activeModal: keyof typeof modalType | null;
    modalType: typeof modalType;
}

export const modalType = {
    menu: 'menu',
} as const

const stateClasses = {
    isLocked: 'isLocked',
}

const useModal = (): IModalType => {
    const [activeModal, setActiveModal] = useState<keyof typeof modalType| null>(null);

    const closeModal = (): void => {
        setActiveModal(null);
        document.documentElement.classList.remove(stateClasses.isLocked);
    }

    const openModal = (type: keyof typeof modalType): void => {
        setActiveModal(type);
        document.documentElement.classList.add(stateClasses.isLocked);
    }

    return {
        openModal,
        closeModal,
        activeModal,
        modalType,
    }
}
export default useModal;