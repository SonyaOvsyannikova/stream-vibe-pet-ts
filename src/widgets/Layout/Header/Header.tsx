import Logo from "@/shared/ui/Logo/Logo.tsx";
import useModal from "@/shared/ui/Modal/useModal.tsx";
import Modal from "@/shared/ui/Modal/Modal.tsx";
import BurgerButton from "@/shared/ui/BurgerButton/BurgerButton.tsx";
import cl from './Header.module.scss'
import '@/shared/styles'
import ModalMenu from "@/widgets/Layout/Header/ui/ModalMenu/ModalMenu.tsx";
import HeaderList from "@/widgets/Layout/Header/ui/HeaderList";
import HeaderActions from "@/shared/ui/HeaderActions/HeaderActions.tsx";
import React from "react";

const Header: React.FC = () => {


    interface Pages {
        label: string;
        path: string;
    }
    let pagesItems: Pages[] = [
        { label: 'Home', path: '/Home' },
        { label: 'Movies & Shows', path: '/MoviesAndShowsPage' },
        { label: 'Support', path: '/SupportPage' },
        { label: 'Subscriptions', path: '/SubscriptionPage' },
    ]

    const {
        openModal,
        closeModal,
        activeModal,
        modalType
    } = useModal()


    return (
        <header>
            <div className={`${cl.header} container`}>
                {activeModal === modalType.menu && (
                    <Modal
                        isOpen={true}
                        onClose={closeModal}
                        >
                            <ModalMenu
                            pages={pagesItems}
                            onClose={closeModal}
                            />
                    </Modal>
                )}
                <Logo />
                <HeaderList
                    pages = {pagesItems}/>
                <HeaderActions />
                <BurgerButton
                    onClick={
                    ()=> openModal(modalType.menu)}
                />

            </div>
        </header>
    );
};

export default Header;