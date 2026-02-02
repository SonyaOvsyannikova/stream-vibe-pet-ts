import '@/shared/styles'
import cl from './HomePage.module.scss'
import Devices from '@/widgets/Devices/Devices.tsx'
import Questions from '@/widgets/Questions'
import Plan from '@/widgets/Plan/Plan.tsx'
import Hero from '@/widgets/Hero'
import { lazy, Suspense } from 'react'

const HomePage = () => {
  const LazyOurGenres = lazy(() => import('@/shared/ui/LazyOurGenres'))

  return (
    <>
      <Hero variant={'HomePage'} classNamePosterHomePage={cl.posterHomePage} />
      <div className="container">
        <Suspense fallback={null}>
          <LazyOurGenres
            description={
              "Whether you're looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new"
            }
            title={'Explore our wide variety of categories'}
          />
        </Suspense>
        <Devices />
        <Questions />
        <Plan />
      </div>
    </>
  )
}

export default HomePage
