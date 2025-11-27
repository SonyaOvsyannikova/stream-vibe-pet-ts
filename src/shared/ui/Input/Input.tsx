import React, { forwardRef, Ref } from 'react';
import cl from './Input.module.scss'


interface InputProps {
    value: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    className?: string
}

const Input = forwardRef<HTMLInputElement,InputProps>((props, ref) => {
        return (
                <input
                    className={cl.inputSearch}
                    ref={ref}
                    {...props}>
                </input>

        );
    })
export default Input;