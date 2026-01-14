import useOurGenres from "@/shared/hooks/MoviesAndShowHooks/Movies/useOurGenres.ts";
import {lazy, useEffect} from "react";
import { useInView } from 'react-intersection-observer';
import Categories from "@/widgets/Categories/Categories.tsx";
import cl from "@/widgets/MoviesWidget/Movies.module.scss";
import CategoriesCard from "@/shared/ui/CategoriesCard/CategoriesCard.tsx";

const LazyOurGenres = () => {
    const {ref, inView} = useInView({
        threshold: 0.1,
        triggerOnce: true,
        rootMargin: '200px'
    });
    const {
        groupedMoviesPageOne,
        isLoadingPageOne,
        isError
    } = useOurGenres(inView)

    console.log(groupedMoviesPageOne)

    useEffect(() => {
        if (inView) {
            console.log('LazyOurGenres стал видимым, начинаю загрузку');
        }
    }, [inView]);

    if (!inView) {
        return <div ref={ref} style={{ height: '200px' }} />; // placeholder
    }

    if (isLoadingPageOne) {
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
                title="Our Genres"
                items={groupedMoviesPageOne}
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
    );
};

export default LazyOurGenres;