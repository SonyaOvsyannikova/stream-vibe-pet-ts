import cl from './AuthPage.module.scss'
import Tab from '@/shared/ui/Tab/Tab.tsx'
import { useState } from 'react'
import AuthForm from '@/features/AuthForm'

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<number>(1)

  return (
    <div className={cl.authPage}>
      <div className={cl.authPageForm}>
        <Tab
          classNameForTab={cl.authPageTab}
          classNameForButton={cl.authPageButton}
          labels={[
            { id: 1, label: 'Регистрация' },
            { id: 2, label: 'Вход' },
          ]}
          onChange={(id) => {
            setActiveTab(id)
          }}
        />
        {activeTab === 1 ? (
          <AuthForm type={'signup'} label={'Зарегистрироваться'} />
        ) : (
          <AuthForm type={'login'} label={'Войти'} />
        )}
      </div>
    </div>
  )
}

export default AuthPage
