import {useInView} from "react-intersection-observer";
import {MovieCollectionByGrouped, useMoviesGrouped} from "@/shared/hooks/useMoviesGrouped.ts";
import Categories from "@/widgets/Categories/Categories.tsx";
import CategoriesCard from "@/shared/ui/CategoriesCard/CategoriesCard.tsx";
import cl from './AllGenresCategories.module.scss'

const AllGenresCategories = () => {

    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin: '200px 0px'
    });

    const { groupedMoviesPageOne,groupedMoviesPageTwo, isLoadingPageTwo, isLoadingPageOne } = useMoviesGrouped(inView);

    return (
        <div ref={ref} >
            {inView ? (
                isLoadingPageOne ? (
                            <>загрузка жанров</>
            ): (
                <>
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
                        renderItem={(collection: MovieCollectionByGrouped, index) => (
                            <CategoriesCard key={collection.id} variant={'Our Genres'} collection={collection} group={collection.movies} />
                        )}
                    />
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
                        renderItem={(collection: MovieCollectionByGrouped, index) => (
                            <CategoriesCard key={collection.id} variant={'Popular Top 10 In Genres'} collection={collection} group={collection.nextMovies} />
                        )}
                    />
                </>
                )
            ) : (
                <div>Загрузка жанров...</div>
            )}
        </div>
    );
};

export default AllGenresCategories;