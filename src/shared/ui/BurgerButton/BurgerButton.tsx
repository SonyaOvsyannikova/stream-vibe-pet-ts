import cl from './BurgerButton.module.scss'

type BurgerButtonProps = {
    onClick?: () => void,
}
const BurgerButton = (props: BurgerButtonProps) => {

    const {
        onClick
    } = props;

    return (
        <button
            onClick={onClick}
            className={`${cl.burgerButton} visible-tablet`}>
            <span className={cl.burgerButtonLine}></span>
            <span className={cl.burgerButtonLine}></span>
            <span className={cl.burgerButtonLineThird}></span>
        </button>
    );
};

export default BurgerButton;