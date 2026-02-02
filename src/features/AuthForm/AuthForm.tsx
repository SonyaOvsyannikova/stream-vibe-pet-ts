import React, { useState } from 'react'
import cl from './AuthForm.module.scss'
import { supabase } from '@/shared/api/supabase.ts'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import MainButton from '@/shared/ui/MainButton'
import Eyes from '@/assets/icons/Eyes.svg?react'
import ClosedEyes from '@/assets/icons/closedEyes.svg?react'
import ButtonIcon from '@/shared/ui/ButtonIcon'
import { useNavigate } from 'react-router-dom'

const authScheme = z.object({
  email: z.string().email('Введите корректный email'),
  password: z.string().min(8, 'Минимум 8 символов'),
  rememberMe: z.boolean().optional(),
})

type LoginFormData = z.infer<typeof authScheme>
type AuthFormProps = {
  label?: string
  type?: 'signup' | 'login'
}
const AuthForm = (props: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { label, type } = props
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(authScheme),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })
  const navigate = useNavigate()

  const onSubmit = async (formData: LoginFormData) => {
    if (type === 'login') {
      const response = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (response.error) {
        switch (response.error.message) {
          case 'Invalid login credentials':
            break
          case 'Email not confirmed':
            break
          default:
            console.error('Auth error:', response.error.message)
        }
        return
      }
      const { user, session } = response.data
      console.log(user, 'Авторизация прошла успешно!')
      console.log(session, 'Начало сессии пользователя')
    } else if (type === 'signup') {
      const response = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })
      if (response.error) {
        console.log('Auth error:', response.error.message)
        return
      }
      console.log('Регистрация прошла успешна', response.data)
    }
  }

  return (
    <form className={cl.authPageForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={cl.authInputField}>
        <label htmlFor="email">Email</label>
        <input {...register('email')} type="email" placeholder="Email" />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>

      <div className={cl.authInputField}>
        <label htmlFor="register">Password</label>
        <div className={cl.authInputFieldPassword}>
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
          />
          <ButtonIcon
            className={cl.authInputFieldIcon}
            label={showPassword ? <ClosedEyes /> : <Eyes />}
            onClick={() => {
              setShowPassword(!showPassword)
            }}
          />
        </div>
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}
      </div>

      <label className={cl.authInputFieldRememberMe}>
        <input
          {...register('rememberMe')}
          type="checkbox"
          className={cl.authRemember}
        />
        <span>Запомнить меня</span>
      </label>
      <MainButton
        type={'submit'}
        label={label}
        onClick={() => {
          navigate('/home')
        }}
      />
      {type === 'login' && (
        <a className={cl.forgetPassword} href={'/forgetPassword'}>
          Забыли пароль
        </a>
      )}
    </form>
  )
}

export default AuthForm
