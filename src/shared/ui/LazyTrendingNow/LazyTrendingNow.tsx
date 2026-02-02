import React from 'react'
import { useInView } from 'react-intersection-observer'
import Categories from '@/widgets/Categories/Categories.tsx'
import cl from '@/widgets/Movies/Movies.module.scss'
import { MovieData } from '@/shared/hooks/useMovie.ts'
import MoviesCard from '@/shared/ui/MoviesCard'
import { useTopMovies } from '@/shared/hooks/MoviesAndShowHooks/useContent'

const LazyTrendingNow = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '150px',
  })

  const { data: topMovies, isError, isLoading } = useTopMovies(inView)

  if (!inView) {
    return <div ref={ref} style={{ height: '200px' }} />
  }

  if (isLoading) {
    return <div>Загрузка секции ...</div>
  }
  if (isError) {
    return <div ref={ref}>Ошибка загрузки данных</div>
  }

  return (
    <div ref={ref}>
      <Categories
        className={cl.categorySection}
        title="Trending Now"
        items={topMovies}
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
          1024: {
            slidesPerView: 5,
            spaceBetween: 16,
          },
        }}
        renderItem={(collection: MovieData, index) => (
          <MoviesCard
            variant={'Trending Now'}
            key={collection.movie.id}
            movieData={collection.movie}
          />
        )}
      />
    </div>
  )
}

export default LazyTrendingNow
