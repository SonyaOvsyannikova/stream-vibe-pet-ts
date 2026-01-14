import Categories from "@/widgets/Categories/Categories.tsx";
import CategoriesCard from "@/shared/ui/CategoriesCard/CategoriesCard.tsx";
import MoviesCard from "@/shared/ui/MoviesCard";
import useShows  from "@/shared/hooks/useShows.ts";
import cl from './Shows.module.scss'
import {MovieCollectionByGrouped, useMoviesGrouped} from "@/shared/hooks/useMoviesGrouped.ts";
import {lazy, Suspense, useMemo} from "react";
import {MovieData} from "@/shared/hooks/useMovie.ts";
import LazyCategoriesWithObserver from "@/widgets/Categories/LazyCategoriesWithObserver";
import AllGenresTopCategories from "@/widgets/AllGenresTopCategories";
import LazyGreatestSeries from "@/shared/ui/LazyGreatestSeries";
import LazyTopSeries from "@/shared/ui/LazyTopSeries/LazyTopSeries.tsx";


// const LazyCategories = lazy(() => {
//     return (
//         import('@/widgets/Categories/Categories.tsx')
//             .then(module => {
//                 console.log('Загрузка категорий in Shows', performance.now())
//                 return module
//             })
//             .catch(error => {
//                 console.log('Категории не загружены in Shows', error)
//                 throw error;
//             })
//     )
// })

const Shows = () => {

    // const { groupedMoviesPageOne, groupedMoviesPageTwo, isLoadingPageOne, isLoadingPageTwo } = useMoviesGrouped()
    //
    // const {
    //     topSeries,
    //     popularSeries,
    //     greatestSeries,
    //     isLoading,
    //     isError,
    // }  = useShows();
    //
    //
    // if (isLoading) {
    //     return <div>Загрузка...</div>;
    // }
    //
    // if (isError) {
    //     return <div>Ошибка загрузки</div>;
    // }
    //
    // console.log(topSeries);



    const LazyOurGenres = lazy(() => import('@/shared/ui/LazyOurGenres'))
    const LazyTopOurGenres = lazy(() => import('@/shared/ui/LazyOurTopGenres'))
    const LazyPopularSeries = lazy(() => import('@/shared/ui/LazyPopularSeries'))
    const LazyGreatestSeries = lazy(() => import('@/shared/ui/LazyGreatestSeries'))
    const LazyTopSeries = lazy(() => import('@/shared/ui/LazyTopSeries'))

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
            {/*        title="Trending Shows Now"*/}
            {/*        items={popularSeries}*/}
            {/*        slidesPerView={4}*/}
            {/*        breakpoints={{*/}
            {/*            320: {*/}
            {/*                slidesPerView: 1.7,*/}
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
            {/*        renderItem={(collection: MovieData, index) => (*/}
            {/*            <MoviesCard variant = {'Trending Shows Now'} key={collection.movie.id}*/}
            {/*                        movieData = {collection.details}/>*/}
            {/*        )}/>*/}
            {/*</div>*/}

            {/*<div>*/}
            {/*    <Categories*/}
            {/*        className={cl.categorySection}*/}
            {/*        title="New Released Shows"*/}
            {/*        items={greatestSeries}*/}
            {/*        slidesPerView={4}*/}
            {/*        breakpoints={{*/}
            {/*            320: {*/}
            {/*                slidesPerView: 1.7,*/}
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
            {/*        renderItem={(collection: MovieData, index) => (*/}
            {/*            <MoviesCard variant = {'New Released Shows'} key={collection.movie.id}*/}
            {/*                        movieData = {collection.details}/>*/}
            {/*        )}/>*/}
            {/*</div>*/}

            {/*<div>*/}
            {/*    <Categories*/}
            {/*        className={cl.categorySection}*/}
            {/*        title="Must - Watch Shows"*/}
            {/*        items={topSeries}*/}
            {/*        slidesPerView={4}*/}
            {/*        breakpoints={{*/}
            {/*            320: {*/}
            {/*                slidesPerView: 1.7,*/}
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
            {/*        renderItem={(collection: MovieData, index) => (*/}
            {/*            <MoviesCard variant = {'Must - Watch Shows'} key={collection.movie.id}*/}
            {/*                        movieData = {collection.details}/>*/}
            {/*        )}/>*/}
            {/*</div>*/}
        </div>
    );
};

export default Shows;