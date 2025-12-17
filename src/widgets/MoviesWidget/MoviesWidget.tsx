import Categories from "@/widgets/Categories/Categories.tsx";
import MoviesCard from "@/shared/ui/MoviesCard";
import cl from './MoviesWidget.module.scss'
import {MovieData} from "@/shared/hooks/useMoviesList.ts";
import {MovieCollection} from "@/shared/hooks/useMovies.ts";
import CategoriesCard from "@/shared/ui/CategoriesCard/CategoriesCard.tsx";
import {kinopoiskAPI} from "@/shared/api/сlient.ts";
import {useQuery} from "@tanstack/react-query";
import logo from "@/shared/ui/Logo";

type MoviesWidgetProps = {
    groupedMovies: MovieCollection[],
    groupedLength: number,
    moviesTop: MovieData[],
}

const getMoviesMustWatch = async (slug: string) => {

    try {
        const response = await kinopoiskAPI.getSortedMoviesWithParametersSlug(slug, {
            limit: 10,
            sortField: 'year',
            sortType: 1,
        })

        return response.docs
    } catch(e) {
        console.log(e)
        throw new Error('Could not find movie with the movie name')
    }
}

const getMoviesNewReleases = async (slug: string) => {
    try {
        const response = await kinopoiskAPI.getSortedMoviesWithParametersSlug(slug, {
            limit:30,
            sortField: "year",
            sortType: 1,
        })
        const moviesWithYear = response.docs.filter(item => item.movie?.year)
        const filteredMovies = moviesWithYear.slice(0, 9)

        return filteredMovies

    } catch (e) {
        console.log(e)
        throw new Error('Could not find movie with the movie name')
    }
}

const MoviesWidget = ( props: MoviesWidgetProps) => {

    const {
        groupedMovies,
        groupedLength,
        moviesTop,
    } = props;

    const { data: mustMovies = [], isLoading: isLoadingMust } = useQuery<MovieData[]>({
        queryKey: ['movies', 'mustWatch'],
        queryFn: () => getMoviesMustWatch("best_501"),
        enabled: true,
        placeholderData: [],

        staleTime: 12 * 60 * 60 * 1000, // 12 часов данные "свежие"
        gcTime: 24 * 60 * 60 * 1000,    // 24 часа хранить в кеше

        refetchOnWindowFocus: false,    // не обновлять при фокусе окна
        refetchOnMount: false,          // не обновлять при монтировании
        refetchOnReconnect: false,      // не обновлять при reconnect
    })

    const { data: newMovies = [], isLoading: isLoadingNewMovies } = useQuery<MovieData[]>({
        queryKey: ['movies', 'newReleases', 'planned-to-watch-films'],
        queryFn: () => getMoviesNewReleases('planned-to-watch-films'),
        enabled: true,
        placeholderData: [],

        staleTime: 12 * 60 * 60 * 1000, // 12 часов данные "свежие"
        gcTime: 24 * 60 * 60 * 1000,    // 24 часа хранить в кеше

        refetchOnWindowFocus: false,    // не обновлять при фокусе окна
        refetchOnMount: false,          // не обновлять при монтировании
        refetchOnReconnect: false,      // не обновлять при reconnect
    })

    // console.log(mustMovies)
    // console.log(newMovies)

    return (
        <div className={cl.ShowPageMovie}>
            {isLoadingMust && (
                <h5> Идет загрузка...</h5>
            )}

            <span className={cl.movieLabel}>Movies</span>
            <div>
                <Categories<MovieCollection>
                    className={cl.categorySection}
                    title="Our Genres"
                    items={groupedMovies}
                    slidesPerView={5}
                    spaceBetween={16}
                    breakpoints={{
                        320: {
                            slidesPerView: 2,
                            spaceBetween: 16
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 16
                        },
                        1023: {
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
                    title="Trending Now"
                    items={moviesTop}
                    slidesPerView={5}
                    spaceBetween={16}
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
                        <MoviesCard variant = {'Trending Now'} key={collection.movie.id}
                                    movieData = {collection.movie}/>
                    )}/>
            </div>
            <div>
                <Categories
                    className={cl.categorySection}
                    title="New Releases"
                    items={newMovies}
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
                        <MoviesCard variant={'New Releases'} key={collection.movie.id}
                                    movieData={collection.movie}
                        />
                    )}/>
            </div>
            <div>
                <Categories
                    className={cl.categorySection}
                    title="Must - Watch Movies"
                    slidesPerView={4}

                    breakpoints={{
                        320: {
                            slidesPerView: 1.5,
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
                    items={mustMovies}
                    renderItem={(collection, index) => (
                        <MoviesCard variant={'Must - Watch Movies'} key={collection.movie.id}
                                    movieData={collection.movie} />
                    )}
                />
            </div>
        </div>
    );
};

export default MoviesWidget;