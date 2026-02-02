import cl from './Shows.module.scss'
import { lazy, Suspense } from 'react'

const LazyOurGenres = lazy(() => import('@/shared/ui/LazyOurGenres'))
const LazyTopOurGenres = lazy(() => import('@/shared/ui/LazyOurTopGenres'))
const LazyPopularSeries = lazy(() => import('@/shared/ui/LazyPopularSeries'))
const LazyGreatestSeries = lazy(() => import('@/shared/ui/LazyGreatestSeries'))
const LazyTopSeries = lazy(() => import('@/shared/ui/LazyTopSeries'))

const Shows = () => {
  return (
    <div className={cl.ShowPageSeries}>
      <span className={cl.showsLabel}>Shows</span>

      <Suspense fallback={null}>
        <LazyOurGenres />
      </Suspense>
      <Suspense fallback={null}>
        <LazyTopOurGenres />
      </Suspense>
      <Suspense fallback={null}>
        <LazyPopularSeries />
      </Suspense>
      <Suspense fallback={null}>
        <LazyGreatestSeries />
      </Suspense>
      <Suspense fallback={null}>
        <LazyTopSeries />
      </Suspense>
    </div>
  )
}

export default Shows
