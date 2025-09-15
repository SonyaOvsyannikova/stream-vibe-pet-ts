import React from 'react';
import FooterList from "../../shared/ui/footer/FooterList/FooterList";
import '../../shared/styles/styles.scss'
import TwitterIcon from '../../assets/icons/twitter.svg?react'
import FacebookIcon from '../../assets/icons/facebook.svg?react'
import LinkedinIcon from '../../assets/icons/linkedIn.svg?react'
import SocialIcon from "../../shared/ui/footer/SocialIcon/SocialIcon";
import cl from './Footer.module.scss'

const Footer = () => {

    const linkFooterNavigation = {
        home: {
            title: 'Home',
            links: [{
                label: 'Categories',
                href: '/categories',
            },
            {
                label: 'Devices',
                href: '/devices',
            },
            {
                label: 'Pricing',
                href: '/pricing',
            },
            {
                label: 'Faq',
                href: '/faq',
            }
            ],
        },
        movies: {
            title: 'Movies',
            links: [
                {
                    label: 'Gernes',
                    href: '/gernes',
                },
                {
                    label: 'Trending',
                    href: '/trending',
                },
                {
                    label: 'New Release',
                    href: '/NewRelease',
                },
                {
                    label: 'Popular',
                    href: '/popular',
                },
            ]
        },
        shows: {
            title: 'Shows',
            links: [
                {
                    label: 'Gernes',
                    href: '/gernes',
                },
                {
                    label: 'Trending',
                    href: '/trending',
                },
                {
                    label: 'New Release',
                    href: '/NewRelease',
                },
                {
                    label: 'Popular',
                    href: '/popular',
                },
            ]
        },
        support: {
            title: 'Support',
            links: [
                {
                    label: 'Contact Us',
                }
            ]
        },
        subscription: {
            title: 'Subscription',
            links: [
                {
                    label: 'Plans',
                    href: '/plans',
                },
                {
                    label: 'Features',
                    href: '/features',
                }
            ]
        },
    }
    const socialLinkFooterNavigation = {
        ConnectWithUs: {
            title: 'Connect With Us',
            socials: [
            {
                name: 'twitter',
                url: 'https://x.com/?',
                alt: 'Twitter',
                IconComponent: TwitterIcon,
                },
            {
                name: 'facebook',
                url: 'https://x.com/?',
                alt: 'Facebook',
                IconComponent: FacebookIcon,

                },
            {
                name: 'linkedin',
                url: 'https://x.com/?',
                alt: 'LinkedIn',
                IconComponent: LinkedinIcon,
                }]
        }
    }
    const externalLinkFooterNavigation = [
        {
            title: 'Terms of Use',
            path: '/Legal/terms-of-use',
        },
        {
            title: 'Privacy Policy',
            path: '/Legal/privacy-policy',
        },
        {
            title: 'Cookie Policy',
            path: '/Legal/cookie-policy',
        },
    ]


    return (
        <div className = {`${cl.footer} container`}>
            <FooterList
            linkFooterNavigation={linkFooterNavigation}
            socialLinks = {socialLinkFooterNavigation.ConnectWithUs}
           />
            <div className={cl.footerExtra}>
                <p className={cl.footerCopyright}>
                    @<time dateTime="2023">2023</time> streamvib, All Rights Reserved
                </p>
                <ul className={cl.footerList}>
                    {externalLinkFooterNavigation.map((link) => (
                        <li key={link.path}
                        className={cl.footerItem}>
                            <a href={link.path}>{link.title}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
};

export default Footer;