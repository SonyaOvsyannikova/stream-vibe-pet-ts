import React, {useState} from 'react';
import Logo from "../../shared/ui/header/Logo/Logo";
import HeaderItem from "../../shared/ui/header/HeaderItem/HeaderItem";
import HeaderList from "../../shared/ui/header/HeaderList/HeaderList";
import Icon from "../../shared/ui/header/Icon/Icon";
import useModal from "../../shared/ui/header/Modal/useModal";
import Modal from "../../shared/ui/header/Modal/Modal";
import BurgerButton from "../../shared/ui/header/BurgerButton/BurgerButton";
import cl from './Header.module.scss'
import '../../shared/styles/styles.scss'
import ModalMenu from "../../shared/ui/header/Modal/ModalMenu/ModalMenu";

const Header = () => {
    const pagesItems = [
        { label: 'Home', path: '/Home' },
        { label: 'Movies & Shows', path: '/MoviesAndShowsPage' },
        { label: 'Support', path: '/SupportPage' },
        { label: 'Subscriptions', path: '/SubscriptionPage' },
    ];
    const {openModal, closeModal, activeModal, modalType} = useModal()


    return (
        <header>
            <div className={`${cl.header} container`}>
                {activeModal === modalType.menu && (
                    <Modal
                        isOpen={true}
                        onClose={closeModal}
                        items={pagesItems}>
                        <ModalMenu
                        pages={pagesItems}
                        onClose={closeModal}
                        />
                    </Modal>
                )}
                <Logo />
                <HeaderList
                    pages={pagesItems}/>
                <Icon />
                <BurgerButton
                    onClick={()=> openModal(modalType.menu)}/>
            </div>
        </header>
    );
};

export default Header;