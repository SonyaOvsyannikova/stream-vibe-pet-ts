import Categories from "@/widgets/Categories/Categories.tsx";
import cl from "@/widgets/ShowsWidget/Shows.module.scss";
import {MovieData} from "@/shared/hooks/useMovie.ts";
import MoviesCard from "@/shared/ui/MoviesCard";
import useGreatestSeries from "@/shared/hooks/MoviesAndShowHooks/Shows/useGreatestSeries.ts";
import {useInView} from "react-intersection-observer";

const LazyGreatestSeries = () => {
    const { ref, inView } = useInView()

    const {
        greatestSeries,
        isError,
        isLoading
    } = useGreatestSeries(inView);

    if (!inView) {
        return <div ref={ref} style={{ height: '200px' }} />; // placeholder
    }

    if (isLoading) {
        return <div>Загрузка Our Genres...</div>;
    }


    return (
        <div ref={ref}>
            <Categories
                className={cl.categorySection}
                title="New Released Shows"
                items={greatestSeries}
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
                    <MoviesCard variant = {'New Released Shows'} key={collection.movie.id}
                                movieData = {collection.details}/>
                )}/>
        </div>
    );
};

export default LazyGreatestSeries;