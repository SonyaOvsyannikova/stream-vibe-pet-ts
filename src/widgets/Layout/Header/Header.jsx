import Logo from "@/shared/ui/Logo/Logo";
import useModal from "@/shared/ui/Modal/useModal";
import Modal from "@/shared/ui/Modal/Modal";
import BurgerButton from "@/shared/ui/BurgerButton/BurgerButton";
import cl from './Header.module.scss'
import '@/shared/styles'
import ModalMenu from "@/widgets/Layout/Header/ui/ModalMenu/ModalMenu";
import HeaderList from "@/widgets/Layout/Header/ui/HeaderList";
import HeaderActions from "@/shared/ui/HeaderActions/HeaderActions";

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
                <Logo
                className={cl.logo}/>
                <HeaderList
                    pages={pagesItems}/>
                    <HeaderActions />
                    <BurgerButton
                        onClick={()=> openModal(modalType.menu)} />

            </div>
        </header>
    );
};

export default Header;