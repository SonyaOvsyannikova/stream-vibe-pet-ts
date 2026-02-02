import useOurGenres from '@/shared/hooks/MoviesAndShowHooks/useOurGenres.ts'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import Categories from '@/widgets/Categories/Categories.tsx'
import cl from '@/widgets/Movies/Movies.module.scss'
import CategoriesCard from '@/shared/ui/CategoriesCard/CategoriesCard.tsx'
import description from '@/widgets/MovieCard/ui/Description'

type LazyOurGenresProps = {
  title?: string
  description?: string
}
const LazyOurGenres = (props: LazyOurGenresProps) => {
  const { title, description } = props

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '200px',
  })
  const { groupedMoviesPageOne, isLoadingPageOne, isError } =
    useOurGenres(inView)

  console.log(groupedMoviesPageOne)

  useEffect(() => {
    if (inView) {
      console.log('LazyOurGenres стал видимым, начинаю загрузку')
    }
  }, [inView])

  if (!inView) {
    return <div ref={ref} style={{ height: '200px' }} />
  }

  if (isLoadingPageOne) {
    return <div>Загрузка Our Genres...</div>
  }
  if (isError) {
    return (
      <div ref={ref} className={cl.error}>
        Ошибка загрузки Our Genres
      </div>
    )
  }

  return (
    <div ref={ref}>
      <Categories
        className={cl.categorySection}
        title={title}
        description={description}
        items={groupedMoviesPageOne}
        slidesPerView={5}
        spaceBetween={16}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          1023: {
            slidesPerView: 5,
            spaceBetween: 16,
          },
        }}
        renderItem={(collection, index) => (
          <CategoriesCard
            key={collection.id}
            variant={'Our Genres'}
            collection={collection}
            group={collection.movies}
          />
        )}
      />
    </div>
  )
}

export default LazyOurGenres
