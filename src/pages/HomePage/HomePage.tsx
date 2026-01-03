import '@/shared/styles'
import Categories from "@/widgets/Categories/Categories.tsx";
import cl from './HomePage.module.scss'
import Devices from "@/widgets/Devices/Devices.tsx";
import Questions from "@/widgets/Questions";
import Plan from "@/widgets/Plan/Plan.tsx";
import Hero from "@/widgets/Hero";
import {Movie, MovieCollectionByGrouped, useMoviesGrouped} from "@/shared/hooks/useMoviesGrouped.ts";
import CategoriesCard from "@/shared/ui/CategoriesCard/CategoriesCard.tsx";
import {useInView} from "react-intersection-observer";


const HomePage = () => {

    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin: '200px 0px',
    });

    const {
        groupedMoviesPageOne,
        isLoadingPageOne
    } = useMoviesGrouped(inView);

    return (
        <>
                <Hero
                    variant={'HomePage'}
                    classNamePosterHomePage={cl.posterHomePage}
                />
            <div  className='container'>
                <div ref={ref}>
                    {inView && !isLoadingPageOne ? (
                        <Categories
                            title = {'Explore our wide variety of categories'}
                            description={'Whether you\'re looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new'}
                            slidesPerView = {5}
                            breakpoints={{
                                320: {
                                    slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 2,
                                },
                                1024: {
                                    slidesPerView: 5,
                                },
                            }}
                            items={groupedMoviesPageOne}
                            renderItem={(collection, index) => (
                                <CategoriesCard key={collection.id} collection={collection} group={collection.movies} />
                            )}
                        />
                    ): (
                        <> Загрузка категорий... </>
                    ) }
                </div>
                <Devices />
                <Questions />
                <Plan />
            </div>
        </>
    );
};

export default HomePage;