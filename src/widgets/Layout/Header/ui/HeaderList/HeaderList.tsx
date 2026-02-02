import cl from './HeaderList.module.scss'
import React from 'react'

type Pages = {
  label: string
  path: string
}

type HeaderListProps = {
  pages: Pages[]
}

const HeaderList = (props: HeaderListProps) => {
  const { pages } = props

  return (
    <ul className={cl.headerList}>
      {pages.map((page) => (
        <li key={page.path}>
          <a href={page.path} className={cl.headerListLink}>
            {page.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default HeaderList
