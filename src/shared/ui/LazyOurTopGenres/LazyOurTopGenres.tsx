import React from 'react';
import {useInView} from "react-intersection-observer";
import useTopMovies from "@/shared/hooks/MoviesAndShowHooks/Movies/useTopMovies.ts";
import usePopularOurGenres from "@/shared/hooks/MoviesAndShowHooks/Movies/usePopularOurGenres.ts";
import Categories from "@/widgets/Categories/Categories.tsx";
import cl from "@/widgets/MoviesWidget/Movies.module.scss";
import CategoriesCard from "@/shared/ui/CategoriesCard/CategoriesCard.tsx";

const LazyOurTopGenres = () => {

    const { ref, inView} = useInView({
        threshold: 0.1,
        triggerOnce: true,
        rootMargin: '200px'
    })

    const {
        groupedMoviesPageTwo,
        isLoadingPageTwo,
        isError
    } = usePopularOurGenres(inView)

    if (!inView) {
        return <div ref={ref} style={{ height: '200px' }} />; // placeholder
    }

    if (isLoadingPageTwo) {
        return <div>Загрузка TOP Our Genres...</div>;
    }
    if (isError) {
        return (
            <div ref={ref} className={cl.error}>
                Ошибка загрузки Top Our Genres
            </div>
        );
    }

    return (
        <div ref={ref}>
            <Categories
                className={cl.categorySection}
                title="Popular Top 10 In Genres"
                items={groupedMoviesPageTwo}
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
    );
};

export default LazyOurTopGenres;