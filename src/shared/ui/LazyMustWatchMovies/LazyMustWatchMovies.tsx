import { useInView } from "react-intersection-observer";
import Categories from "@/widgets/Categories/Categories.tsx";
import cl from "@/widgets/MoviesWidget/Movies.module.scss";
import { MovieData } from "@/shared/hooks/useMovie.ts";
import MoviesCard from "@/shared/ui/MoviesCard";
import useTopMovies from "@/shared/hooks/MoviesAndShowHooks/Movies/useTopMovies.ts";
import useBestMovies from "@/shared/hooks/MoviesAndShowHooks/Movies/useBestMovies.ts";

const LazyMustWatchMovies = () => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
        rootMargin: '200px'
    });

    const { bestMovies, isLoading, isError } = useBestMovies(inView);

    if (!inView) {
        return <div ref={ref} style={{ height: '200px' }} />;
    }

    if (isLoading) {
        return <div>Загрузка Our Genres...</div>;
    }
    if (isError) {
        return (
            <div ref={ref} className={cl.error}>
                Ошибка загрузки Our Genres
            </div>
        );
    }

    return (
        <div ref={ref}>
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
                items={bestMovies}
                renderItem={(collection: MovieData, index) => (
                    <MoviesCard variant={'Must - Watch Movies'} key={collection.movie.id}
                                movieData={collection.movie} />
                )}
            />
        </div>
    );
};

export default LazyMustWatchMovies;