import React from 'react';
import cl from './SocialIcon.module.scss'

const SocialIcon = ({title, socialLinks}) => {

    return (
        <li className={cl.footerItem}>
            <h4 className={cl.footerTitle}>{title}</h4>
            <div className={cl.footerLinksContainer}>
                {socialLinks.map((link) => (
                    <a className={cl.footerLink}
                        href={link.url} key={link.name}>
                        <link.IconComponent/>
                    </a>
                ))}
            </div>

        </li>
    );
};

export default SocialIcon;