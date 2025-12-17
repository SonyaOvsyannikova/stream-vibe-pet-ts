import '@/shared/styles'
import { useEffect, useState } from "react";
import {kinopoiskAPI} from "@/shared/api/сlient.ts";
import Categories from "@/widgets/Categories/Categories.tsx";
import cl from './HomePage.module.scss'
import Devices from "@/widgets/Devices/Devices.tsx";
import Questions from "@/widgets/Questions";
import Plan from "@/widgets/Plan/Plan.tsx";
import Hero from "@/widgets/Hero";
import {Movie, useMovies} from "@/shared/hooks/useMovies.ts";
import CategoriesDescription from "@/shared/ui/CategoriesDescription/CategoriesDescription.tsx";
import CategoriesCard from "@/shared/ui/CategoriesCard/CategoriesCard.tsx";



const HomePage = () => {

    const {
        groupedMovies
    } = useMovies('')

    return (
        <>
                <Hero
                    variant={'HomePage'}
                    classNamePosterHomePage={cl.posterHomePage}
                />
            <div  className='container'>
                <div>
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
                        items={groupedMovies}
                        renderItem={(collection, index) => (
                            <CategoriesCard key={collection.id} group={collection} />
                        )}
                    />
                </div>
                <Devices />
                <Questions />
                <Plan />
            </div>
        </>
    );
};

export default HomePage;