import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import cl from './ResetPasswordForm.module.scss'
import ButtonIcon from '@/shared/ui/ButtonIcon'
import Eyes from '@/assets/icons/Eyes.svg?react'
import ClosedEyes from '@/assets/icons/closedEyes.svg?react'
import { supabase } from '@/shared/api/supabase.ts'
import MainButton from '@/shared/ui/MainButton'
import { useNavigate } from 'react-router-dom'
import { Bounce, toast } from 'react-toastify'

const resetPasswordForm = z
  .object({
    newPassword: z.string().min(8, 'Минимум 8 символов'),
    repeatNewPassword: z.string().min(8, 'Минимум 8 символов'),
  })
  .refine((data) => data.newPassword === data.repeatNewPassword, {
    message: 'Пароли не совпадают',
    path: ['repeatNewPassword'],
  })
type ResetPasswordFormData = z.infer<typeof resetPasswordForm>

const ResetPasswordForm = () => {
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isReady, setIsReady] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordForm),
    defaultValues: {
      newPassword: '',
      repeatNewPassword: '',
    },
  })

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == 'PASSWORD_RECOVERY') {
        setIsReady(true)
      }
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!isReady) {
      toast.info(
        <div>
          <p>Ваша ссылка устарела</p>
          <a
            href="/auth"
            style={{ color: '#3b82f6', textDecoration: 'underline' }}
          >
            <p>вернитесь на главную страницу</p>
          </a>
        </div>,
        {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          transition: Bounce,
        },
      )
      return
    }

    setIsLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword,
      })

      if (error) {
        toast.info(
          <div>
            <p>Ошибка обновления пароля</p>
            <a
              href="/auth"
              style={{ color: '#3b82f6', textDecoration: 'underline' }}
            >
              <p>вернитесь на главную страницу</p>
            </a>
          </div>,
          {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
            transition: Bounce,
          },
        )
      } else {
        toast.info(
          <div>
            <p>Пароль успешно обновлен! </p>
          </div>,
          {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
            transition: Bounce,
          },
        )
        navigate('/auth')
      }
    } catch (e) {
      console.log('error', e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cl.resetPasswordPage}>
      <form className={cl.resetPasswordForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={cl.resetPasswordInput}>
          <label htmlFor="register">Новый пароль</label>
          <div className={cl.authInputFieldPassword}>
            <input
              {...register('newPassword')}
              type={showNewPassword ? 'text' : 'password'}
              placeholder="New Password"
            />
            {errors.newPassword && (
              <p style={{ color: 'red' }}>{errors.newPassword.message}</p>
            )}
            <ButtonIcon
              className={cl.authInputFieldIcon}
              label={showNewPassword ? <ClosedEyes /> : <Eyes />}
              onClick={() => {
                setShowNewPassword(!showNewPassword)
              }}
            />
          </div>
        </div>

        <div className={cl.resetPasswordInput}>
          <label htmlFor="register">Повторите новый пароль</label>
          <div className={cl.authInputFieldPassword}>
            <input
              {...register('repeatNewPassword')}
              type={showPassword ? 'text' : 'password'}
              placeholder="Repeate Password"
            />
            {errors.repeatNewPassword && (
              <p style={{ color: 'red' }}>{errors.repeatNewPassword.message}</p>
            )}
            <ButtonIcon
              className={cl.authInputFieldIcon}
              label={showPassword ? <ClosedEyes /> : <Eyes />}
              onClick={() => {
                setShowPassword(!showPassword)
              }}
            />
          </div>
        </div>
        <MainButton
          label={isLoading ? 'Обновление...' : 'Сменить пароль'}
          type="submit"
        />
      </form>
    </div>
  )
}

export default ResetPasswordForm
