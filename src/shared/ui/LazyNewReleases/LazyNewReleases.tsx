import React from 'react';
import {useInView} from "react-intersection-observer";
import usePlannedMovies from "@/shared/hooks/MoviesAndShowHooks/Movies/usePlannedMovies.ts";
import Categories from "@/widgets/Categories/Categories.tsx";
import cl from "@/widgets/MoviesWidget/Movies.module.scss";
import {MovieData} from "@/shared/hooks/useMovie.ts";
import MoviesCard from "@/shared/ui/MoviesCard";

const LazyNewReleases = () => {

    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
        rootMargin: '200px'
    })
    const { plannedMovies, isLoading, isError } = usePlannedMovies(inView)

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
                title="New Releases"
                items={plannedMovies}
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
                renderItem={(collection: MovieData, index) => (
                    <MoviesCard variant={'New Releases'} key={collection.movie.id}
                                movieData={collection.movie}
                    />
                )}/>
        </div>
    );
};

export default LazyNewReleases;