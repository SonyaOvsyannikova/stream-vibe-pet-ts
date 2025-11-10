import cl from './HeaderList.module.scss'
import React from "react";

interface Pages {
    label: string,
    path: string,
}

interface Props {
    pages: Pages[]
}


const HeaderList = (props: Props) => {

    const {
        pages
    } = props

    return (
        <ul className={cl.headerList} >
            {pages.map(page => (
                <li key={page.path}>
                    <a href={page.path} className={cl.headerListLink}>
                        {page.label}
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default HeaderList;