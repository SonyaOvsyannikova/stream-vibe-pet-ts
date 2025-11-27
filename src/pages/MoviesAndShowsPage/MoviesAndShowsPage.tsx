import Hero from "@/widgets/Hero";
import { IResponseApiMovie } from "@/shared/types";
import { useEffect, useState } from "react";
import { kinopoiskAPI } from "@/shared/api/сlient.ts";
import ShowsPageMovie from "@/widgets/ShowsPageMovie/ShowsPageMovie.tsx";
import {useMovies} from "@/shared/hooks/useMovies.ts";




const MoviesAndShowsPage = () => {


    const { groupedMovies, movieDataArray, setMovieDataArray } = useMovies()

    const [movieOrSeries, setMovieOrSeries] = useState<IResponseApiMovie[]>([])
    const [movies, setMovies] = useState<IResponseApiMovie[]>([])


    useEffect(() => {
        getMoviesOrSeriesForHero()
    }, [])
    const getMoviesOrSeriesForHero = async () => {
        try {
            const response = await kinopoiskAPI.getPopularMovies({
                limit: 150,
            })
            const moviesWithBackdrop = response.docs.filter(movie =>
                movie.backdrop?.url
            );
            setMovieOrSeries(moviesWithBackdrop);
            console.log(moviesWithBackdrop);

            setMovieDataArray(response.docs)

            // const allMovies = response.docs
            // const moviesWithBackdropTypeMovie = response.docs.filter(movie =>
            //     movie.type === "movie" && (movie.poster?.previewUrl || movie.backdrop?.url)
            // );
            // setMovieDataArray(allMovies)


        }
        catch(e) {
            console.error(e);
        }
    }

    return (
        <div className="container">
            <Hero
                variant="MoviesAndShowsPage"
                movieOrSeries={movieOrSeries}
            />
            <ShowsPageMovie
            groupedMovies={groupedMovies}
            movieDataArray={movies}/>
        </div>
    );
};

export default MoviesAndShowsPage;