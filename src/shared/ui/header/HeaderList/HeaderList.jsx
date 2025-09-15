import React from 'react';
import HeaderItem from "../HeaderItem/HeaderItem";
import cl from './HeaderList.module.scss'

const HeaderList = ({pages}) => {

    return (
        <ul className={cl.headerList} >
            {pages.map(page => (
                <HeaderItem
                path={page.path}
                label={page.label}/>
            ))}
        </ul>
    );
};

export default HeaderList;