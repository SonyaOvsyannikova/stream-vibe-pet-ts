import React from 'react';
import cl from './FooterItem.module.scss'

const FooterItem = ({title, links}) => {
    return (
        <li className={cl.footerItem}>
            <h4 className={cl.footerTitle}>{title}</h4>
            <div className={cl.footerLinksContainer}>
                {links.map(link => (
                    <a
                        key={link.label}
                        href={link.href}>{link.label}</a>
                ))}
            </div>
        </li>
    );
};

export default FooterItem;