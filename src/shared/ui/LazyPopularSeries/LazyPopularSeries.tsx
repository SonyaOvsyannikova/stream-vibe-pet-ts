import usePopularSeries from "@/shared/hooks/MoviesAndShowHooks/Shows/usePopularSeries.ts";
import Categories from "@/widgets/Categories/Categories.tsx";
import cl from "@/widgets/ShowsWidget/Shows.module.scss";
import {MovieData} from "@/shared/hooks/useMovie.ts";
import MoviesCard from "@/shared/ui/MoviesCard";
import {useInView} from "react-intersection-observer";

const LazyPopularSeries = () => {
    const { ref, inView } = useInView()

    const {
        isLoading,
        popularSeries,
        isError
    } = usePopularSeries(inView)

    if (!inView) {
        return <div ref={ref} style={{ height: '200px' }} />; // placeholder
    }

    if (isLoading) {
        return <div>Загрузка Our Genres...</div>;
    }

    return (
        <div ref = {ref}>
            <Categories
                className={cl.categorySection}
                title="Trending Shows Now"
                items={popularSeries}
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
                renderItem={(collection: MovieData, index) => (
                    <MoviesCard variant = {'Trending Shows Now'} key={collection.movie.id}
                                movieData = {collection.details}/>
                )}/>
        </div>
    );
};

export default LazyPopularSeries;