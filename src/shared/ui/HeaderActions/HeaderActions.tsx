import ButtonIcon from '@/shared/ui/ButtonIcon'
import NotificationsIcon from '@/assets/icons/notificationsIcon.svg?react'
import cl from './HeaderActions.module.scss'
import SearchIcon from '@/assets/icons/searchIcon.svg?react'
import UserIcon from '@/assets/icons/user.svg?react'
import React, { useState } from 'react'
import SearchWithSuggestions from '@/features/SearchWithSuggestions'
import { useNavigate } from 'react-router-dom'

const HeaderActions = () => {
  const [searchVisible, setSearchVisible] = useState<boolean>(false)
  const navigate = useNavigate()

  return (
    <div className={cl.searchContainer}>
      {searchVisible && (
        <SearchWithSuggestions onClose={() => setSearchVisible(false)} />
      )}
      {!searchVisible && (
        <ButtonIcon
          label={<SearchIcon />}
          onClick={() => setSearchVisible(true)}
        >
          <span className="visually-hidden">search icon</span>
        </ButtonIcon>
      )}
      <ButtonIcon label={<NotificationsIcon />}>
        <span className="visually-hidden">notifications icon</span>
      </ButtonIcon>
      <ButtonIcon
        label={<UserIcon />}
        onClick={() => {
          navigate('/auth')
        }}
      />
    </div>
  )
}

export default HeaderActions
