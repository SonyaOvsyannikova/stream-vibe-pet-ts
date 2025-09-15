import React from 'react';

const HeaderItem = ({path, label}) => {

    return (
        <li>
            <a href={path}>{label}</a>
        </li>
    );
};

export default HeaderItem;