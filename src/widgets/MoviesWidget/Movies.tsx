import Categories from "@/widgets/Categories/Categories.tsx";
import MoviesCard from "@/shared/ui/MoviesCard";
import cl from './Movies.module.scss'
import useMovie, {Movie, MovieData} from "@/shared/hooks/useMovie.ts";
import { MovieCollectionFromUseMovies } from "@/shared/hooks/useMovie.ts";
import CategoriesCard from "@/shared/ui/CategoriesCard/CategoriesCard.tsx";
import {MovieCollectionByGrouped, useMoviesGrouped} from "@/shared/hooks/useMoviesGrouped.ts";
import {lazy, Suspense} from "react";
import {MovieCollection} from "@/shared/hooks/useShows.ts";
import LazyCategoriesWithObserver from "@/widgets/Categories/LazyCategoriesWithObserver";
import AllGenresCategories from "@/widgets/AllGenresCategories";
import AllGenresTopCategories from "@/widgets/AllGenresTopCategories";
import LazyOurGenres from "@/shared/ui/LazyOurGenres/LazyOurGenres.tsx";
import LazyNewReleases from "@/shared/ui/LazyNewReleases";



const Movies = () => {


    // const { groupedMoviesPageOne, groupedMoviesPageTwo, isLoadingPageOne, isLoadingPageTwo } = useMoviesGrouped()
    // const { topMovies, plannedMovies, bestMovies, isError, isLoading} = useMovie()

    // if (isLoading ) {
    //     return <div>Загрузка...</div>;
    // }
    //
    // if (isError ) {
    //     return <div>Ошибка загрузки</div>;
    // }

    const LazyOurGenres = lazy(() => import('@/shared/ui/LazyOurGenres'))
    const LazyTopOurGenres = lazy(() => import('@/shared/ui/LazyOurTopGenres'))
    const LazyMustWatchMovies = lazy(() => import('@/shared/ui/LazyMustWatchMovies'))
    const LazyNewReleases = lazy(() => import('@/shared/ui/LazyNewReleases'))
    const LazyTrendingNow = lazy(() => import('@/shared/ui/LazyTrendingNow'))

    return (
        <div className={cl.ShowPageMovie}>
            {/*{isLoading && (*/}
            {/*    <h5> Идет загрузка...</h5>*/}
            {/*)}*/}
            <span className={cl.movieLabel}>Movies</span>

            <Suspense fallback={null}>
                <LazyOurGenres />
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
            {/*<div>*/}
            {/*    <Categories*/}
            {/*        className={cl.categorySection}*/}
            {/*        title="Our Genres"*/}
            {/*        items={groupedMoviesPageOne}*/}
            {/*        slidesPerView={5}*/}
            {/*        spaceBetween={16}*/}
            {/*        breakpoints={{*/}
            {/*            320: {*/}
            {/*                slidesPerView: 2,*/}
            {/*                spaceBetween: 16*/}
            {/*            },*/}
            {/*            768: {*/}
            {/*                slidesPerView: 2,*/}
            {/*                spaceBetween: 16*/}
            {/*            },*/}
            {/*            1023: {*/}
            {/*                slidesPerView: 5,*/}
            {/*                spaceBetween: 16*/}
            {/*            },*/}
            {/*        }}*/}
            {/*        renderItem={(collection, index) => (*/}
            {/*            <CategoriesCard key={collection.id} variant={'Our Genres'} collection={collection} group={collection.movies} />*/}
            {/*        )}*/}
            {/*    />*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <Categories*/}
            {/*        className={cl.categorySection}*/}
            {/*        title="Popular Top 10 In Genres"*/}
            {/*        items={groupedMoviesPageTwo}*/}
            {/*        slidesPerView={5}*/}
            {/*        spaceBetween={16}*/}
            {/*        breakpoints={{*/}
            {/*            320: {*/}
            {/*                slidesPerView: 2,*/}
            {/*                spaceBetween: 16*/}
            {/*            },*/}
            {/*            768: {*/}
            {/*                slidesPerView: 2,*/}
            {/*                spaceBetween: 16*/}
            {/*            },*/}
            {/*            1023: {*/}
            {/*                slidesPerView: 4,*/}
            {/*                spaceBetween: 16*/}
            {/*            },*/}
            {/*        }}*/}
            {/*        renderItem={(collection, index) => (*/}
            {/*            <CategoriesCard key={collection.id} variant={'Popular Top 10 In Genres'} collection={collection} group={collection.nextMovies} />*/}
            {/*        )}*/}
            {/*    />*/}
            {/*</div>*/}

            {/*<div>*/}
            {/*    <Categories*/}
            {/*        className={cl.categorySection}*/}
            {/*        title="Trending Now"*/}
            {/*        items={topMovies}*/}
            {/*        slidesPerView={5}*/}
            {/*        spaceBetween={16}*/}
            {/*        breakpoints={{*/}
            {/*            320: {*/}
            {/*                slidesPerView: 2,*/}
            {/*                spaceBetween: 16*/}
            {/*            },*/}
            {/*            768: {*/}
            {/*                slidesPerView: 2,*/}
            {/*                spaceBetween: 16*/}
            {/*            },*/}
            {/*            1024: {*/}
            {/*                slidesPerView: 5,*/}
            {/*                spaceBetween: 16*/}
            {/*            },*/}
            {/*        }}*/}
            {/*        renderItem={(collection: MovieData, index) => (*/}
            {/*            <MoviesCard variant = {'Trending Now'} key={collection.movie.id}*/}
            {/*                        movieData = {collection.movie}/>*/}

            {/*        )}/>*/}
            {/*</div>*/}


            {/*<div>*/}
            {/*    <Categories*/}
            {/*        className={cl.categorySection}*/}
            {/*        title="New Releases"*/}
            {/*        items={plannedMovies}*/}
            {/*        slidesPerView={5}*/}

            {/*        breakpoints={{*/}
            {/*            320: {*/}
            {/*                slidesPerView: 2,*/}
            {/*                spaceBetween: 16*/}
            {/*            },*/}
            {/*            768: {*/}
            {/*                slidesPerView: 2,*/}
            {/*                spaceBetween: 16*/}
            {/*            },*/}
            {/*            1024: {*/}
            {/*                slidesPerView: 5,*/}
            {/*                spaceBetween: 16*/}
            {/*            },*/}
            {/*        }}*/}
            {/*        renderItem={(collection: MovieData, index) => (*/}
            {/*            <MoviesCard variant={'New Releases'} key={collection.movie.id}*/}
            {/*                        movieData={collection.movie}*/}
            {/*            />*/}
            {/*        )}/>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <Categories*/}
            {/*        className={cl.categorySection}*/}
            {/*        title="Must - Watch Movies"*/}
            {/*        slidesPerView={4}*/}
            {/*        breakpoints={{*/}
            {/*            320: {*/}
            {/*                slidesPerView: 1.5,*/}
            {/*                spaceBetween: 16*/}
            {/*            },*/}
            {/*            768: {*/}
            {/*                slidesPerView: 2,*/}
            {/*                spaceBetween: 16*/}
            {/*            },*/}
            {/*            1024: {*/}
            {/*                slidesPerView: 4,*/}
            {/*                spaceBetween: 16*/}
            {/*            },*/}
            {/*        }}*/}
            {/*        items={bestMovies}*/}
            {/*        renderItem={(collection: MovieData, index) => (*/}
            {/*            <MoviesCard variant={'Must - Watch Movies'} key={collection.movie.id}*/}
            {/*                        movieData={collection.movie} />*/}
            {/*        )}*/}
            {/*    />*/}
            {/*</div>*/}
        </div>
    );
};

export default Movies;