import Categories from "@/widgets/Categories/Categories.tsx";
import CategoriesCard from "@/shared/ui/CategoriesCard/CategoriesCard.tsx";
import MoviesCard from "@/shared/ui/MoviesCard";
import {MovieData} from "@/shared/hooks/useMoviesList.ts";
import {useGetMoviesLoader} from "@/shared/hooks/useGetMoviesOrSeries.ts";
import cl from './ShowsWidget.module.scss'
import {MovieCollection} from "@/shared/hooks/useMovies.ts";
import { useQuery } from "@tanstack/react-query";


type ShowsWidgetProps = {
    groupedMovies: MovieCollection[],
    sliderClassName?: string;
}



const ShowsWidget = (props: ShowsWidgetProps) => {

    const {
        groupedMovies,
        sliderClassName
    } = props;

    const { loadMovies } = useGetMoviesLoader()

    // const fetchAll = async() => {
    //
    //     try {
    //         const [popularSerial, newReleasedShow, mustWatchShows] = await Promise.all([
    //             loadMovies("popular-series", 10),
    //             loadMovies("series-top250", 10),
    //             loadMovies("100_greatest_TVseries", 10),
    //         ])
    //         // setPopularSerial(popularSerial)
    //         // setNewReleasedShow(newReleasedShow)
    //         // setMustWatchShows(mustWatchShows)
    //     }
    //
    //     catch(e) {
    //         console.log(e)
    //     }
    // }

    const { data: popularSerial, isLoading: isPopularSerialLoading } = useQuery<MovieData[]>({
        queryKey: ['popularSerial'],
        queryFn: () => loadMovies("popular-series", 10),
        staleTime: 12 * 60 * 60 * 1000, // 12 часов
        refetchOnWindowFocus: false,
    })

    const { data: newReleasedShow, isLoading: isReleasedShowLoading } = useQuery<MovieData[]>({
        queryKey: ['releasedShow'],
        queryFn: () => loadMovies("series-top250", 10),
        staleTime: 12 * 60 * 60 * 1000, // 12 часов
        refetchOnWindowFocus: false,
    })
    const { data: mustWatchShows, isLoading: isMustShowLoading } = useQuery<MovieData[]>({
        queryKey: ['releasedShow'],
        queryFn: () => loadMovies("100_greatest_TVseries", 10),
        staleTime: 12 * 60 * 60 * 1000, // 12 часов
        refetchOnWindowFocus: false,
    })

    console.log(mustWatchShows, popularSerial, newReleasedShow)

    // const {data, isLoading: error } = useQueries([
    //     queries: [
    //         {
    //             queryKey: ['releasedShow'],
    //             queryFn: () => loadMovies("series-top250", 10)
    //         },
    //         {
    //             queryKey: ['releasedShow'],
    //             queryFn: () => loadMovies("series-top250", 10)
    //         },
    //         {
    //             queryKey: ['releasedShow'],
    //             queryFn: () => loadMovies("100_greatest_TVseries", 10)
    //         }
    //     ]
    // ])

    return (

        <div className={cl.ShowPageSeries}>
            <span className={cl.showsLabel}>Shows</span>
            <div>
                <Categories<MovieCollection>
                    className={cl.categorySection}
                    title="Our Genres"
                    items={groupedMovies}
                    slidesPerView={5}

                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 16
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 16
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 16
                        },
                    }}
                    renderItem={(collection, index) => (
                        <CategoriesCard key={collection.id} group={collection} />
                    )}
                />
            </div>
            <div>
                <Categories
                    className={cl.categorySection}
                    title="Trending Shows Now"
                    items={newReleasedShow}
                    slidesPerView={4}

                    breakpoints={{
                        320: {
                            slidesPerView: 1.7,
                            spaceBetween: 16
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 16
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 16
                        },
                    }}
                    renderItem={(collection, index) => (
                        <MoviesCard variant = {'Trending Shows Now'} key={collection.movie.id}
                                    movieData = {collection.details}/>
                    )}/>
            </div>

            <div>
                <Categories
                    className={cl.categorySection}
                    title="New Released Shows"
                    items={popularSerial}
                    slidesPerView={4}
                    breakpoints={{
                        320: {
                            slidesPerView: 1.7,
                            spaceBetween: 16
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 16
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 16
                        },
                    }}
                    renderItem={(collection, index) => (
                        <MoviesCard variant = {'New Released Shows'} key={collection.movie.id}
                                    movieData = {collection.details}/>
                    )}/>
            </div>

            <div>
                <Categories
                    className={cl.categorySection}
                    title="Must - Watch Shows"
                    items={mustWatchShows}
                    slidesPerView={4}
                    breakpoints={{
                        320: {
                            slidesPerView: 1.7,
                            spaceBetween: 16
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 16
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 16
                        },
                    }}
                    renderItem={(collection, index) => (
                        <MoviesCard variant = {'Must - Watch Shows'} key={collection.movie.id}
                                    movieData = {collection.details}/>
                    )}/>
            </div>
        </div>
    );
};

export default ShowsWidget;