import Categories from "@/widgets/Categories/Categories.tsx";
import CategoriesCard from "@/shared/ui/CategoriesCard/CategoriesCard.tsx";
import MoviesCard from "@/shared/ui/MoviesCard";
import { useGetMoviesLoader } from "@/shared/hooks/useGetMoviesOrSeries.ts";
import cl from './ShowsWidget.module.scss'
import { MovieCollection } from "@/shared/hooks/useMovies.ts";



type ShowsWidgetProps = {
    groupedMovies: MovieCollection[],
    sliderClassName?: string;
}

const ShowsWidget = (props: ShowsWidgetProps) => {


    const {
        groupedMovies,
        sliderClassName
    } = props;

    const {
        getPopularSeries,
        getGreatestSeries,
        getTopSeries,
        isLoading,
        isError,
        isSuccess
    }  = useGetMoviesLoader();

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (isError) {
        return <div>Ошибка загрузки</div>;
    }

    return (
        <div className={cl.ShowPageSeries}>
            <span className={cl.showsLabel}>Shows</span>
            <div>
                <Categories
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
                        <CategoriesCard key={collection.id} collection={collection} group={collection.movies} />
                    )}
                />
            </div>
            <div>
                <Categories
                    className={cl.categorySection}
                    title="Trending Shows Now"
                    items={getPopularSeries()}
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
                    items={getGreatestSeries()}
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
                    items={getTopSeries()}
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