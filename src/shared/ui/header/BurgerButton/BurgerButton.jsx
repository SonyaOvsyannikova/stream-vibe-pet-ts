import React from 'react';
import cl from './BurgerButton.module.scss'

const BurgerButton = ({onClick}) => {

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