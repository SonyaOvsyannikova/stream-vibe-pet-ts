import React, {forwardRef} from 'react';
import cl from './Input.module.scss'

const Input = forwardRef((props, ref) => {
        return (
                <input
                    type='search'
                    className={cl.inputSearch}
                    ref={ref}
                    {...props}>

                </input>

        );
    })
export default Input;