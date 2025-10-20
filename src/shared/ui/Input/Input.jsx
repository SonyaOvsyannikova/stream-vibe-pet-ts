import {forwardRef} from 'react';
import cl from './Input.module.scss'

const Input = forwardRef((props, ref) => {
        return (
                <input
                    className={cl.inputSearch}
                    ref={ref}
                    {...props}>
                </input>

        );
    })
export default Input;