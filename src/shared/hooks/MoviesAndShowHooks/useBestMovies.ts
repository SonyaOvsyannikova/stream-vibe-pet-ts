import {useQuery} from "@tanstack/react-query";
import {fetchSeriesOrMovies} from "@/shared/hooks/fetchSeriesOrMovies.ts";
import {moviesMap} from "@/shared/hooks/useMovie.ts";

const UseBestMovies = (enabled = false) => {
    const bestMoviesQuery = useQuery({
        queryKey: ['movies', moviesMap['best_501'].slug ],
        queryFn:  () => fetchSeriesOrMovies(
            'best_501',
            moviesMap['best_501'].slug,
            moviesMap['best_501'].name,
        ),
        enabled: enabled
    })
    return {
        bestMovies: bestMoviesQuery.data,
        isLoading: bestMoviesQuery.isLoading,
        isError: bestMoviesQuery.isError,
    }
};

export default UseBestMovies;