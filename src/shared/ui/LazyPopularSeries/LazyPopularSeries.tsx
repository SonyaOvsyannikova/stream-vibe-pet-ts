import Categories from '@/widgets/Categories/Categories.tsx'
import cl from '@/widgets/Shows/Shows.module.scss'
import { MovieData } from '@/shared/hooks/useMovie.ts'
import MoviesCard from '@/shared/ui/MoviesCard'
import { usePopularSeries } from '@/shared/hooks/MoviesAndShowHooks/useContent'
import { useInView } from 'react-intersection-observer'

const LazyPopularSeries = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '150px',
  })

  const { data: popularSeries, isError, isLoading } = usePopularSeries(inView)

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
        title="Trending Shows Now"
        items={popularSeries}
        slidesPerView={4}
        breakpoints={{
          320: {
            slidesPerView: 1.7,
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
        renderItem={(collection: MovieData, index) => (
          <MoviesCard
            variant={'Trending Shows Now'}
            key={collection.movie.id}
            movieData={collection.details}
          />
        )}
      />
    </div>
  )
}

export default LazyPopularSeries
