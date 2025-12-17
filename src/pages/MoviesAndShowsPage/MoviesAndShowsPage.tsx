import Hero from "@/widgets/Hero";
import { IResponseApiMovie } from "@/shared/types";
import { useEffect, useState } from "react";
import { kinopoiskAPI } from "@/shared/api/сlient.ts";
import ShowsPageMovie from "@/widgets/ShowsPageMovie/ShowsPageMovie.tsx";
import { useMovies } from "@/shared/hooks/useMovies.ts";
import useMoviesList  from "@/shared/hooks/useMoviesList.ts";



const MoviesAndShowsPage = () => {

    const  { groupedMovies, groupedMoviesLength }  = useMovies('')
    const { moviesTop } = useMoviesList();

    const [movieOrSeriesByHero, setMovieOrSeriesByHero] = useState<IResponseApiMovie[]>([])


    useEffect(() => {
        getMoviesOrSeriesByHero()
    }, []);

    const getMoviesOrSeriesByHero = async () => {
        try {
            const response = await kinopoiskAPI.getSortedMoviesByBackdrop({
                limit: 6,
                sortField: 'top10',
                sortType: -1,
            })
            setMovieOrSeriesByHero(response.docs)
            console.log(response.docs)
            return response;
        }
        catch(e) {
            console.log(e)
        }
    }


    return (
        <div className="container">
            <Hero
                variant="MoviesAndShowsPage"
                movieOrSeries={movieOrSeriesByHero}
            />
            <ShowsPageMovie
            groupedMovies={groupedMovies}
            groupedLength={groupedMoviesLength}
            moviesTop = {moviesTop}
            />
        </div>
    );
};

export default MoviesAndShowsPage;