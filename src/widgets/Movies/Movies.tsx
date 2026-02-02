import cl from './Movies.module.scss'
import { lazy, Suspense } from 'react'

const LazyOurGenres = lazy(() => import('@/shared/ui/LazyOurGenres'))
const LazyTopOurGenres = lazy(() => import('@/shared/ui/LazyOurTopGenres'))
const LazyMustWatchMovies = lazy(
  () => import('@/shared/ui/LazyMustWatchMovies'),
)
const LazyNewReleases = lazy(() => import('@/shared/ui/LazyNewReleases'))
const LazyTrendingNow = lazy(() => import('@/shared/ui/LazyTrendingNow'))

const Movies = () => {
  return (
    <div className={cl.ShowPageMovie}>
      <span className={cl.movieLabel}>Movies</span>

      <Suspense fallback={null}>
        <LazyOurGenres title={'Our Genres'} />
      </Suspense>
      <Suspense fallback={null}>
        <LazyTopOurGenres />
      </Suspense>
      <Suspense fallback={null}>
        <LazyMustWatchMovies />
      </Suspense>
      <Suspense fallback={null}>
        <LazyNewReleases />
      </Suspense>
      <Suspense fallback={null}>
        <LazyTrendingNow />
      </Suspense>
    </div>
  )
}

export default Movies
