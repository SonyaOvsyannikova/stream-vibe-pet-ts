import { JSX } from "react";

const Logo = (): JSX.Element => {

    return (
        <a href="/public">
            <img
            src='../public/LogoHeader.png'
            alt='Logo'
            loading="lazy"
            />
        </a>
    );
};

export default Logo;