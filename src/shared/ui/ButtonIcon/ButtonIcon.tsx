import cl from './ButtonIcon.module.scss'
import clsx from 'clsx';
import React from "react";

type ButtonIconProps = {
    label?: React.ReactNode | string,
    onClick?: (e: React.MouseEvent) => void,
    className?: string | undefined,
    children?: React.ReactNode
}

const ButtonIcon = (props:ButtonIconProps) => {

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