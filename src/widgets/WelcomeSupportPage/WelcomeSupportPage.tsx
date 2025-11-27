import cl from './WelcomeSupportPage.module.scss'
import {useRef, useState} from "react";
import MainButton from "@/shared/ui/MainButton";
import 'react-phone-number-input/style.css'
import  {  getCountries ,  getCountryCallingCode, Country  }  from  'react-phone-number-input'
import ReactCountryFlag from "react-country-flag"
import '@/app/flag.module.scss'
import parsePhoneNumber, { AsYouType } from 'libphonenumber-js'
import ButtonIcon from "@/shared/ui/ButtonIcon";
import CheckMark from '@/assets/icons/checkMark.svg?react'
import {useOutsideClick} from "@/shared/hooks/useOutsideClick.ts";




const WelcomeSupportPage = () => {


    const [value, setValue] = useState<string>('RU')
    const [selectCountryCode, setSelectCountryCode] = useState<Country>('RU')
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null)
    const [inputValue, setInputValue] = useState<string>('')
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const getCountryName = (countryCode: string): string => {
        try {
            // Объект Intl.DisplayNames позволяет локализовать названия,
            // в частности, названия стран и регионов, языков, некоторых других наименований
            return new Intl.DisplayNames(['en'], {type: 'region'}).of(countryCode)
        }
        catch {
            return countryCode;
        }
    }

    const formatNumber = (value: string, countryCode: Country) => {
        if(!value) return `+${getCountryCallingCode(countryCode)}`

        const clearValue = value.replace(/^\+\d+\s?/,'')
        const fullNumber = `+${getCountryCallingCode(countryCode)} ${clearValue}`
        const parseNumber = parsePhoneNumber(fullNumber)
        return parseNumber ? parseNumber.formatInternational() : fullNumber
    }

    const handleClick = (country: Country) => {
        if(inputRef.current) {
            inputRef.current.focus()
        }
        setSelectCountryCode(country)
        setInputValue('')
    }

    const outsideRef = useOutsideClick( ()=> {
        if(isOpen) { setIsOpen(false)}
    })
    const buttonRef = useRef(null);

    return (
        <div className={cl.welcomePageSection}>
            <div className={cl.welcomePageIntro}>
                <div className={cl.welcomePageIntroHeader}>
                    <h2 className={cl.welcomePageIntroTitle}>Welcome to our support page!</h2>
                    <p className={cl.welcomePageIntroDescription}>We're here to help you with any problems you may be having with our product.</p>
                </div>
                <img className={cl.welcomeSupportImage} src='./public/supportImage.png' alt='support-image'/>
            </div>
            <form className={cl.supportPageForm}>
                <div className={cl.supportPageFormName}>
                    <div className={cl.supportForm}>
                        <label>First Name</label>
                        <input/>
                    </div>
                    <div className={cl.supportForm}>
                        <label>Last Name</label>
                        <input/>
                    </div>
                </div>

                <div className={cl.supportPageFormContact}>
                    <div className={cl.supportForm}>
                        <label>Email</label>
                        <input/>
                    </div>
                    <div className={cl.supportForm}>
                        <label>Phone Number</label>
                        <div className={cl.enterPhone}>
                            <div
                                className={cl.choiseCountryNumber}
                            >
                                <ReactCountryFlag
                                    className={cl.countyFlag}
                                    countryCode={selectCountryCode}
                                    svg
                                />
                                <ButtonIcon
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setIsOpen(!isOpen) }}
                                    label={<CheckMark />}
                                    >
                                </ButtonIcon>

                            </div>
                            <input
                                className={cl.inputSupport}
                                placeholder={'Enter Phone Number'}
                                value={formatNumber(inputValue, selectCountryCode)}
                                onChange={(e) => {
                                    let digits = e.target.value.replace(/\D/g, '')
                                    if(digits.length <= 15 ) {
                                        setInputValue(e.target.value)
                                    }
                                }}
                                onFocus={() => setIsFocused(true)}
                                onBlur={(e) => {
                                    setIsFocused(false)
                                }}
                                ref={inputRef}
                                type='tel'
                                required>
                                </input>
                        </div>
                        <div className={cl.openList}
                        ref={outsideRef}>
                            {isOpen ? (
                                <ul className={cl.listCountry}>
                                    {getCountries().map((country) => (
                                            <li className={cl.itemCountry}
                                                key={country}
                                                value={country}
                                                onClick={() => {
                                                    handleClick(country)
                                                    setIsOpen(!isOpen)
                                                }}>
                                                +{getCountryCallingCode ( country )} {getCountryName(country)}
                                            </li>
                                    ))}
                                </ul>
                            ): null}
                        </div>
                    </div>
                </div>

                <div className={cl.supportPageFormMessage}>
                    <label>Message</label>
                    <textarea className={cl.formMessageTextArea}/>
                </div>
                <div className={cl.supportPageFormAgree}>
                    <div className={cl.agree}>
                        <input
                            className={cl.agreeCheckBox}
                            type='checkbox'
                        />
                        <label>I agree with Terms of Use and Privacy Policy</label>
                    </div>
                    <MainButton label={'Send Message'} onClick={() => {}} />
                </div>
            </form>
        </div>
    );
};

export default WelcomeSupportPage;