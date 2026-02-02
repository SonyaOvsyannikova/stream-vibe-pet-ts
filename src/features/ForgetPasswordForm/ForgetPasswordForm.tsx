import React, { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import MainButton from '@/shared/ui/MainButton'
import cl from './ForgetPasswordForm.module.scss'
import { supabase } from '@/shared/api/supabase.ts'
import { Bounce, toast } from 'react-toastify'

const authScheme = z.object({
  email: z.string().email('Введите корректный email'),
})
type ForgotPasswordFormData = z.infer<typeof authScheme>

const ForgetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(authScheme),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (formData: ForgotPasswordFormData) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(
      formData.email,
      {
        redirectTo: `${window.location.origin}/resetPassword`,
      },
    )
    if (error) {
      toast.info(
        <div>
          <p>Ошибка отправки. Проверьте корректность введенных данных или </p>
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
    toast.info(
      <div>
        <p>Проверьте Вашу почту</p>
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
  }

  return (
    <div className={cl.forgetPasswordPage}>
      <form className={cl.forgetPasswordForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={cl.forgetPasswordDescription}>
          <p>
            Пожалуйста, введите ваш email. Вы получите письмо со ссылкой для
            создания нового пароля
          </p>
        </div>
        <div className={cl.forgetPasswordEmail}>
          <input {...register('email')} type="email" placeholder="Email" />
          {errors.email && <p>Введите корректный email</p>}
        </div>
        <MainButton
          label={'Получить новый пароль'}
          type={'submit'}
          disabled={!!errors.email}
        />
      </form>
    </div>
  )
}

export default ForgetPasswordForm
