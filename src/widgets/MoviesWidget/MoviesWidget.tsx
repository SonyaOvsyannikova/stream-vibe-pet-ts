import Categories from "@/widgets/Categories/Categories.tsx";
import MoviesCard from "@/shared/ui/MoviesCard";
import cl from './MoviesWidget.module.scss'
import useMoviesList, { MovieWithCategory } from "@/shared/hooks/useMoviesList.ts";
import {MovieCollection} from "@/shared/hooks/useMovies.ts";
import CategoriesCard from "@/shared/ui/CategoriesCard/CategoriesCard.tsx";
import {kinopoiskAPI} from "@/shared/api/сlient.ts";
import {useQuery} from "@tanstack/react-query";

type MoviesWidgetProps = {
    groupedMovies: MovieCollection[],
    groupedLength: number,
    moviesTop: MovieWithCategory[],
}

const MoviesWidget = ( props: MoviesWidgetProps) => {

    const {
        groupedMovies,
        groupedLength,
    } = props;

    const { getTopMovies, getPlannedMovies, getBestMovies, isError, isLoading} = useMoviesList()




    return (
        <div className={cl.ShowPageMovie}>
            {isLoading && (
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
                        <CategoriesCard key={collection.id} variant={'Our Genres'} collection={collection} group={collection.movies} />
                    )}
                />
            </div>
            <div>
                <Categories<MovieCollection>
                    className={cl.categorySection}
                    title="Popular Top 10 In Genres"
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
                            slidesPerView: 4,
                            spaceBetween: 16
                        },
                    }}
                    renderItem={(collection, index) => (
                        <CategoriesCard key={collection.id} variant={'Popular Top 10 In Genres'} collection={collection} group={collection.nextMovies} />
                    )}
                />
            </div>
            <div>
                <Categories
                    className={cl.categorySection}
                    title="Trending Now"
                    items={getTopMovies()}
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
                    items={getPlannedMovies()}
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
                    items={getBestMovies()}
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