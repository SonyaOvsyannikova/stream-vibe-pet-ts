import cl from './Description.module.scss'
import { IResponseApiMovie } from '@/shared/types'
import clsx from 'clsx'

interface IProps {
  movieData: IResponseApiMovie
  className?: string
}
const Description = (props: IProps) => {
  const { movieData, className } = props

  return (
    <div className={clsx(cl.movieCardDescription, className)}>
      <h6 className={cl.headerDescription}>Description</h6>
      {movieData && <p>{movieData.description}</p>}
    </div>
  )
}

export default Description
