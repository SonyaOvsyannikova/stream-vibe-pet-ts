import cl from './WelcomeSupportPage.module.scss'
import { useRef, useState } from 'react'
import MainButton from '@/shared/ui/MainButton'
import 'react-phone-number-input/style.css'
import {
  getCountries,
  getCountryCallingCode,
  Country,
} from 'react-phone-number-input'
import ReactCountryFlag from 'react-country-flag'
import { AsYouType, getExampleNumber } from 'libphonenumber-js'
import examples from 'libphonenumber-js/examples.mobile.json'
import { IMaskInput } from 'react-imask'
import ButtonIcon from '@/shared/ui/ButtonIcon'
import CheckMark from '@/assets/icons/checkMark.svg?react'
import { useOutsideClick } from '@/shared/hooks/useOutsideClick.ts'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const userSchema = z.object({
  firstName: z.string().min(1, 'Имя обязательно'),
  lastName: z.string().min(1, 'Фамилия обязательна'),
  email: z.string().min(1, 'email обязателен').email('Некорректный email'),
  phoneNumber: z
    .string()
    .transform((val) => val.replace(/\D/g, ''))
    .refine((val) => val.length >= 10, 'Неполный номер телефона')
    .refine((val) => val.length <= 15, 'Слишком длинный номер'),
  countryCode: z.custom<Country>().default('RU' as Country),
  message: z.string().min(1, 'Необходимо заполнить поле'),
  agree: z.boolean().refine((val) => val === true),
})

const WelcomeSupportPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      countryCode: 'RU',
      phoneNumber: '',
    },
  })

  const countryCode = watch('countryCode') as Country
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const inputRef = useRef(null)
  const [_isFocused, setIsFocused] = useState<boolean>(false)

  // Состояние для форматированного значения
  const [displayValue, setDisplayValue] = useState<string>('')

  // Экземпляр AsYouType для форматирования "на лету"
  const asYouType = new AsYouType(countryCode)

  const getCountryName = (countryCode: string): string => {
    try {
      return (
        new Intl.DisplayNames(['en'], { type: 'region' }).of(countryCode) ||
        countryCode
      )
    } catch {
      return countryCode
    }
  }

  // Функция для получения примера номера для страны
  const getExamplePhoneNumber = (country: Country) => {
    try {
      const exampleNumber = getExampleNumber(country, examples)
      return exampleNumber ? exampleNumber.formatNational() : ''
    } catch {
      return ''
    }
  }

  // Форматирование номера
  const formatPhoneNumber = (value: string) => {
    if (!value) return ''

    try {
      // Используем AsYouType для форматирования при вводе
      asYouType.reset()
      asYouType.input(value)
      return asYouType.getNumber()?.formatInternational() || value
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = (country: Country) => {
    setValue('countryCode', country)

    setValue('phoneNumber', '')
    setDisplayValue('')

    setTimeout(() => {
      if (inputRef.current) {
        const inputElement = inputRef.current.input || inputRef.current
        if (inputElement && typeof inputElement.focus === 'function') {
          inputElement.focus()
        }
      }
    }, 0)

    setIsOpen(false)
  }

  const handlePhoneChange = (value: string) => {
    setValue('phoneNumber', value.replace(/\D/g, ''), {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })

    // Форматируем для отображения
    const formatted = formatPhoneNumber(value)
    setDisplayValue(formatted)
  }

  const outsideRef = useOutsideClick(() => {
    if (isOpen) {
      setIsOpen(false)
    }
  })

  return (
    <div className={cl.welcomePageSection}>
      <div className={cl.welcomePageIntro}>
        <div className={cl.welcomePageIntroHeader}>
          <h2 className={cl.welcomePageIntroTitle}>
            Welcome to our support page!
          </h2>
          <p className={cl.welcomePageIntroDescription}>
            We're here to help you with any problems you may be having with our
            product.
          </p>
        </div>
        <div className={cl.bgImg} />
      </div>

      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        className={cl.supportPageForm}
      >
        <div className={cl.supportPageFormName}>
          <div className={cl.supportForm}>
            <label>First Name</label>
            <input {...register('firstName')} />
          </div>
          <div className={cl.supportForm}>
            <label>Last Name</label>
            <input {...register('lastName')} />
          </div>
        </div>

        <div className={cl.supportPageFormContact}>
          <div className={cl.supportForm}>
            <label>Email</label>
            <input {...register('email')} />
          </div>

          <div className={cl.supportForm}>
            <label>Phone Number</label>
            <div className={cl.enterPhone}>
              <div className={cl.choiseCountryNumber}>
                <ReactCountryFlag
                  className={cl.countyFlag}
                  countryCode={countryCode || 'RU'}
                  svg
                />
                <ButtonIcon
                  onClick={(e) => {
                    e.preventDefault()
                    setIsOpen(!isOpen)
                  }}
                  label={<CheckMark />}
                />
              </div>

              <IMaskInput
                mask={Number}
                value={displayValue || ''}
                unmask={true}
                onAccept={handlePhoneChange}
                placeholder={
                  getExamplePhoneNumber(countryCode) ||
                  `+${getCountryCallingCode(countryCode)} XXX XXX XX XX`
                }
                className={cl.inputSupport}
                type="tel"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                ref={inputRef}
              />
            </div>

            <div className={cl.openList} ref={outsideRef}>
              {isOpen && (
                <ul className={cl.listCountry}>
                  {getCountries().map((country) => (
                    <li
                      className={cl.itemCountry}
                      key={country}
                      onClick={() => handleClick(country)}
                    >
                      <ReactCountryFlag
                        countryCode={country}
                        svg
                        style={{
                          marginRight: '8px',
                          width: '20px',
                          height: '15px',
                        }}
                      />
                      +{getCountryCallingCode(country)}{' '}
                      {getCountryName(country)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className={cl.supportPageFormMessage}>
          <label>Message</label>
          <textarea
            {...register('message')}
            className={cl.formMessageTextArea}
          />
        </div>
        <div className={cl.supportPageFormAgree}>
          <div className={cl.agree}>
            <input
              {...register('agree')}
              className={cl.agreeCheckBox}
              type="checkbox"
            />
            <label>I agree with Terms of Use and Privacy Policy</label>
          </div>
          <MainButton label={'Send Message'} onClick={() => {}} />
        </div>
      </form>
    </div>
  )
}

export default WelcomeSupportPage
