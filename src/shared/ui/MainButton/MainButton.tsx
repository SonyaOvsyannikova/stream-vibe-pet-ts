import cl from '@/shared/ui/MainButton/MainButton.module.scss'
import { ReactNode, MouseEvent } from 'react'

interface MainButtonProps {
  label: string | ReactNode
  onClick?: (e: MouseEvent) => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const MainButton = (props: MainButtonProps) => {
  const { label, onClick, className, type, disabled } = props

  return (
    <button
      className={`${cl.mainButton} ${className || ''}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

export default MainButton
