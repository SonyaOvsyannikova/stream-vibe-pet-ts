import { useInView } from 'react-intersection-observer'
import Categories from '@/widgets/Categories/Categories.tsx'
import cl from '@/widgets/Movies/Movies.module.scss'
import { MovieData } from '@/shared/hooks/useMovie.ts'
import MoviesCard from '@/shared/ui/MoviesCard'
import { useBestMovies } from '@/shared/hooks/MoviesAndShowHooks/useContent'

const LazyMustWatchMovies = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '150px',
  })

  const { data: bestMovies, isLoading, isError } = useBestMovies(inView)

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
        title="Must - Watch Movies"
        slidesPerView={4}
        breakpoints={{
          320: {
            slidesPerView: 1.5,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
        }}
        items={bestMovies}
        renderItem={(collection: MovieData, index) => (
          <MoviesCard
            variant={'Must - Watch Movies'}
            key={collection.movie.id}
            movieData={collection.movie}
          />
        )}
      />
    </div>
  )
}

export default LazyMustWatchMovies
