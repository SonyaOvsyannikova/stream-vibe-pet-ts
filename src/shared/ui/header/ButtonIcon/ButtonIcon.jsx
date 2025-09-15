import React from 'react';
import cl from './ButtonIcon.module.scss'

const ButtonIcon = ({label, onClick}) => {
    return (
        <button
        className={cl.buttonIcon}
        onClick={onClick}>{label}</button>
    );
};

export default ButtonIcon;