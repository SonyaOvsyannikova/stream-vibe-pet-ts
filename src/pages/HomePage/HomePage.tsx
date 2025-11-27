import '@/shared/styles'
import { useEffect, useState } from "react";
import {kinopoiskAPI} from "@/shared/api/сlient.ts";
import Categories from "@/widgets/Categories/Categories.tsx";
import cl from './HomePage.module.scss'
import Devices from "@/widgets/Devices/Devices.tsx";
import Questions from "@/widgets/Questions";
import Plan from "@/widgets/Plan/Plan.tsx";
import Hero from "@/widgets/Hero";
import {useMovies} from "@/shared/hooks/useMovies.ts";



const HomePage = () => {

   const { movieData, movieDataArray, setMovieDataArray, setMovieData, groupedMovies } = useMovies()


    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await kinopoiskAPI.getPopularMovies({
                    limit: 250,
                    top: 250,
                    rating: {
                        kp: 6
                    }
                })
                setMovieDataArray(response.docs)
                if (response.docs.length > 0) {
                    setMovieData(response.docs[0])
                }
                // console.log(response.docs)
                //
                // console.log("Raw movies from API:", response.docs.length);
                // console.log("Movies after filtering and grouping:", Object.keys(groupedMovies).length);
            }
            catch(e) {
                console.error(e)
            }
        }
        fetchMovie()
    }, [])



    return (
        <>
                <Hero
                    movieData={movieData}
                    variant={'HomePage'}
                    classNamePosterHomePage={cl.posterHomePage}
                />
            <div  className='container'>
                <Categories
                    groupedMovies={groupedMovies}
                    movieDataArray={movieDataArray}
                />
                <Devices />
                <Questions />
                <Plan />
            </div>
        </>
    );
};

export default HomePage;