import FooterList from "@/widgets/Layout/Footer/ui/FooterList/FooterList.tsx";
import '@/shared/styles';
import TwitterIcon from '@/assets/icons/twitter.svg?react'
import FacebookIcon from '@/assets/icons/facebook.svg?react'
import LinkedinIcon from '@/assets/icons/linkedIn.svg?react'
import cl from './Footer.module.scss'
import {FC, SVGProps} from "react";


export type Route = string;
export const FOOTER_SECTIONS = {
    HOME: 'home',
    MOVIES: 'movies',
    SHOWS: 'shows',
    SUPPORT: 'support',
    SUBSCRIPTION: 'subscription',
} as const;
export type footerSectionKey = keyof typeof FOOTER_SECTIONS
export interface FooterSection {
    title: string
    links?: Links[]
}
export type FooterNavigation = Record<footerSectionKey, FooterSection>;

export interface Links {
    label?: string
    href?: Route
}
export interface Socials {
    name: string,
    url: string,
    alt: string,
    IconComponent: FC<SVGProps<SVGSVGElement>>
}
export interface SocialLink {
    ConnectWithUs: Connect
}
export interface Connect {
    title: string,
    socials: Socials[]
}
export interface ExternalLink {
    title: string,
    path: Route,
}

const Footer = () => {

    const linkFooterNavigation: FooterNavigation = {
        HOME:  {
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
        MOVIES: {
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
        SHOWS: {
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
        SUPPORT: {
            title: 'Support',
            links: [
                {
                    label: 'Contact Us',
                }
            ]
        },
        SUBSCRIPTION: {
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

    const socialLinkFooterNavigation: SocialLink = {
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
    const externalLinkFooterNavigation: ExternalLink[] = [
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
        <div className = {`${cl.footer} `}>
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