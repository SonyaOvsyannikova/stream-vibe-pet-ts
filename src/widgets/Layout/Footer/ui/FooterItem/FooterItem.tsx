import cl from './FooterItem.module.scss'

interface IProps {
  title: string
  links: string[]
}

const FooterItem = (props) => {
  const { title, links } = props

  return (
    <div className={cl.footerItem}>
      <h4 className={cl.footerTitle}>{title}</h4>
      <div className={cl.footerLinksContainer}>
        {links.map((link) => (
          <a key={link.label} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
    </div>
  )
}

export default FooterItem
