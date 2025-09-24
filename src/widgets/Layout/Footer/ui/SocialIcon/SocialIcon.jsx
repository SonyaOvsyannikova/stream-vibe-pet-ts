import cl from './SocialIcon.module.scss'

const SocialIcon = (props) => {

    const {
        title,
        socialLinks
    } = props

    return (
        <div className={cl.footerItem}>
            <h4 className={cl.footerTitle}>{title}</h4>
            <div className={cl.footerLinksContainer}>
                {socialLinks.map((link) => (
                    <a className={cl.footerLink}
                        href={link.url} key={link.name}>
                        <link.IconComponent/>
                    </a>
                ))}
            </div>

        </div>
    );
};

export default SocialIcon;