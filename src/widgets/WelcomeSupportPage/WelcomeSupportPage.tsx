import cl from './WelcomeSupportPage.module.scss'
import {useRef, useState} from "react";
import MainButton from "@/shared/ui/MainButton";
import 'react-phone-number-input/style.css'
import  {  getCountries ,  getCountryCallingCode, Country  }  from  'react-phone-number-input'
import ReactCountryFlag from "react-country-flag"
import parsePhoneNumber, { AsYouType } from 'libphonenumber-js'
import ButtonIcon from "@/shared/ui/ButtonIcon";
import CheckMark from '@/assets/icons/checkMark.svg?react'
import {useOutsideClick} from "@/shared/hooks/useOutsideClick.ts";
import  {  useForm, Controller  }  from  'react-hook-form' ;
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const userSchema = z.object({
    firstName: z.string().min(1, 'Имя обязательно'),
    lastName: z.string().min(1, 'Фамилия обязательна'),
    email: z.string()
        .min(1, 'email обязателен')
        .email('Некорректный email'),
    phoneNumber: z.string().
        transform(val => val.replace(/\D/g, ''))
        .refine(val => val.length >= 10, 'Неполный номер телефона')
        .refine(val => val.length <= 15, 'Слишком длинный номер'),
    countryCode: z.custom<Country>().default('RU' as Country),
    message: z.string().min(1, 'Необходимо заполнить поле'),
    agree: z.boolean().refine(val => val === true),
})


const WelcomeSupportPage = () => {


    const  {
        register ,
        handleSubmit ,
        control,
        watch,
        setValue,
        formState : { errors } ,
    }  =  useForm({
        resolver: zodResolver(userSchema),
        defaultValues: {
            countryCode: 'RU',
            phoneNumber: '',
          }
    }) ;

    const countryCode = watch('countryCode') as Country;
    const phoneValue = watch('phoneNumber')

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null)
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
        // setSelectCountryCode(country)
        // setInputValue('')
        setValue('countryCode', country)
        setValue('phoneNumber', '')
        setIsOpen(false)
    }

    const outsideRef = useOutsideClick( ()=> {
        if(isOpen) { setIsOpen(false)}
    })


    return (
        <div className={cl.welcomePageSection}>
            <div className={cl.welcomePageIntro}>
                <div className={cl.welcomePageIntroHeader}>
                    <h2 className={cl.welcomePageIntroTitle}>Welcome to our support page!</h2>
                    <p className={cl.welcomePageIntroDescription}>We're here to help you with any problems you may be having with our product.</p>
                </div>
                <div className={cl.bgImg} />
            </div>

            <form
                onSubmit = { handleSubmit ( ( data )  =>  console.log ( data ) ) }
                className={cl.supportPageForm}>
                <div className={cl.supportPageFormName}>
                    <div className={cl.supportForm}>
                        <label>First Name</label>
                        <input {...register('firstName')}/>
                    </div>
                    <div className={cl.supportForm}>
                        <label>Last Name</label>
                        <input {...register('lastName')}/>
                    </div>
                </div>

                <div className={cl.supportPageFormContact}>
                    <div className={cl.supportForm}>
                        <label>Email</label>
                        <input {...register('email')}/>
                    </div>
                    <div className={cl.supportForm}>
                        <label>Phone Number</label>
                        <div className={cl.enterPhone}>
                            <div
                                className={cl.choiseCountryNumber}
                            >
                                <ReactCountryFlag
                                    className={cl.countyFlag}
                                    countryCode={countryCode || 'RU'}
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
                            <Controller
                                control={control}
                                name={'phoneNumber'}
                                render={({field}) => (
                                <input
                                    {...field}
                                    className={cl.inputSupport}
                                    placeholder={'Enter Phone Number'}
                                    value={formatNumber(phoneValue || '', countryCode || 'RU')}
                                    onChange={(e) => {
                                        setValue('phoneNumber', e.target.value);
                                    }}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    ref={inputRef}
                                    type='tel'
                                    required />
                            )} />

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
                    <textarea {...register('message')} className={cl.formMessageTextArea}/>
                </div>
                <div className={cl.supportPageFormAgree}>
                    <div className={cl.agree}>
                        <input
                            {...register('agree')}
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