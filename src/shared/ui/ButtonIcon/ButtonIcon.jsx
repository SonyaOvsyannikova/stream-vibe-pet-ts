import cl from './ButtonIcon.module.scss'

const ButtonIcon = (props) => {

    const {
        label,
        onClick
    } = props

    return (
        <button
        className={cl.buttonIcon}
        onClick={onClick}>{label}</button>
    );
};

export default ButtonIcon;