import HeaderActions from '@/shared/ui/HeaderActions'
import cl from './ModalMenu.module.scss'

type Pages = {
  label: string
  path: string
}
type ModalMenuProps = {
  pages: Pages[]
  onClose: () => void
}

const ModalMenu = (props: ModalMenuProps) => {
  const { pages, onClose } = props

  return (
    <ul className={cl.modalMenu}>
      <HeaderActions />
      {pages.map((page) => (
        <li key={page.path}>
          <a href={page.path} onClick={onClose && onClose}>
            {page.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default ModalMenu
