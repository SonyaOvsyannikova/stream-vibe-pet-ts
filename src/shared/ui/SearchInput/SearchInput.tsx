import React, { ChangeEvent, Ref } from 'react'
import cl from './SearchInput.module.scss'
import ButtonIcon from '@/shared/ui/ButtonIcon'
import SearchIcon from '@/assets/icons/searchIcon.svg?react'
import Input from '@/shared/ui/Input'

type SearchInputProps = {
  inputRef: Ref<HTMLInputElement>
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
  onSearchClick?: () => void
  className?: string
  value: string
}

const SearchInput = (props: SearchInputProps) => {
  const { inputRef, value, onSearchChange, onSearchClick, className } = props

  return (
    <div>
      <form
        className={`${cl.searchForm} ${className || ''}`}
        onSubmit={(e) => e.preventDefault()}
      >
        <Input
          className={cl.searchInput}
          ref={inputRef}
          value={value}
          onChange={onSearchChange}
        />
        <ButtonIcon
          label={<SearchIcon />}
          onClick={() => {
            if (onSearchClick) onSearchClick()
          }}
        ></ButtonIcon>
      </form>
    </div>
  )
}

export default SearchInput
