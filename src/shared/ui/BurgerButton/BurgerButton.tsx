import cl from './BurgerButton.module.scss'

type Props = {
    onClick?: () => void,
}
const BurgerButton = (props: Props) => {

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