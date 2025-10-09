import cl from './ButtonIcon.module.scss'
import clsx from 'clsx';

const ButtonIcon = (props) => {

    const {
        label,
        onClick,
        className,
    } = props

    const combinedClassName = clsx(cl.buttonIcon, className)

    return (
        <button
        className={combinedClassName}
        onClick={onClick}>{label}</button>
    );
};

export default ButtonIcon;