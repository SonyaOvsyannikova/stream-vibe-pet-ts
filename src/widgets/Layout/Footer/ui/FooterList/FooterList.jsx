import FooterItem from "../FooterItem/FooterItem";
import SocialIcon from "../SocialIcon/SocialIcon";
import cl from './FooterList.module.scss'

const FooterList = (props) => {

    const {
        linkFooterNavigation,
        socialLinks
    } = props

    return (
        <nav>
            <ul className={cl.footerList}>
                {Object.entries(linkFooterNavigation).map(([key, widgets]) => (
                    <li key={key}>
                        <FooterItem
                            title={widgets.title}
                            links={widgets.links}/>
                    </li>
                ))}
                <li
                key = 'socialLinks'>
                    <SocialIcon
                        title={socialLinks.title}
                        socialLinks={socialLinks.socials}>
                    </SocialIcon>
                </li>
            </ul>
        </nav>

    );
};

export default FooterList;