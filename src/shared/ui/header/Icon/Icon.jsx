import React, {useEffect, useRef, useState} from 'react';
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import cl from './Icon.module.scss'
import SearchIcon from '../../../../assets/icons/searchIcon.svg?react'
import NotificationsIcon from '../../../../assets/icons/notificationsIcon.svg?react'
import Input from "../../Input/Input";

const Icon = () => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const inputRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if(inputRef.current) {
            inputRef.current.focus();
        }
    })

   useEffect(() => {
       const handleClickOutside = (event) => {
           if(containerRef.current && !containerRef.current.contains(event.target)) {
               setIsSearchVisible(false);
           }
       }
       document.addEventListener('click', handleClickOutside);
       return () => {
           document.removeEventListener('click', handleClickOutside);
       }
   })

    const openSearchInput = (event) => {
        event.stopPropagation();
        setIsSearchVisible(true);
    }


    return (
        <div
            className={cl.iconInner}
        ref={containerRef}
        >
            {
                isSearchVisible ?
                    <Input
                    ref={inputRef}
                    placeholder="Search..."/>
                    : null
            }

            <ButtonIcon
                onClick={openSearchInput}
            label={<SearchIcon
            />}
            >
                <span className='visually-hidden'>search icon</span>
            </ButtonIcon>

            <ButtonIcon
            label={<NotificationsIcon/>}>
                <span className="visually-hidden">notifications icon</span>
            </ButtonIcon>
        </div>
    );
};

export default Icon;