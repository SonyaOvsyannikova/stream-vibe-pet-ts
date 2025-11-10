import cl from './ButtonIcon.module.scss'
import clsx from 'clsx';
import React from "react";

interface IProps{
    label?: React.ReactNode | string,
    onClick?: () => void,
    className?: string | undefined,
    children?: React.ReactNode
}

const ButtonIcon = (props:IProps) => {

    const {
        label,
        onClick,
        className,
    } = props

    const combinedClassName = clsx(cl.buttonIcon, className)

    return (
            <button
                className={combinedClassName}
                onClick={onClick}>{label} </button>

    );
};

export default ButtonIcon;