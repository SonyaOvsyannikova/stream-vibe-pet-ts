import Hero from "@/widgets/Hero";
import ShowsPageMovie from "@/widgets/ShowsPageMovie/ShowsPageMovie.tsx";
import { useMovies } from "@/shared/hooks/useMovies.ts";
import useMoviesList  from "@/shared/hooks/useMoviesList.ts";




const MoviesAndShowsPage = () => {

    const  { groupedMovies, groupedMoviesLength }  = useMovies()
    const {getBestMovies, getPlannedMovies, getTopMovies, isError, isLoading } = useMoviesList()


    if (isLoading ) {
        return <div>Загрузка...</div>;
    }

    if (isError ) {
        return <div>Ошибка загрузки</div>;
    }

    return (
        <div className="container">
            <Hero
                variant="MoviesAndShowsPage"
            />
            <ShowsPageMovie
            groupedMovies={groupedMovies}
            groupedLength={groupedMoviesLength}
            moviesTop = {getTopMovies()}
            />
        </div>
    );
};

export default MoviesAndShowsPage;