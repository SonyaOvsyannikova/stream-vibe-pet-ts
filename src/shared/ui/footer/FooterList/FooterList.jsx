import React from 'react';
import FooterItem from "../FooterItem/FooterItem";
import SocialIcon from "../SocialIcon/SocialIcon";
import cl from './FooterList.module.scss'

const FooterList = ({linkFooterNavigation, socialLinks}) => {
    return (
        <nav>
            <ul className={cl.footerList}>
                {Object.entries(linkFooterNavigation).map(([key, widgets]) => (
                    <FooterItem
                        key={key}
                        title={widgets.title}
                        links={widgets.links}/>
                ))}
                <SocialIcon
                    title={socialLinks.title}
                    socialLinks={socialLinks.socials}>
                </SocialIcon>

            </ul>
        </nav>

    );
};

export default FooterList;