import {useQuery} from "@tanstack/react-query";
import {fetchSeriesOrMovies} from "@/shared/hooks/fetchSeriesOrMovies.ts";
import {moviesMap} from "@/shared/hooks/useMovie.ts";

const UsePlannedMovies = (enabled = false) => {
    const plannedMoviesQuery = useQuery({
        queryKey: ['movies', moviesMap['planned-to-watch-films'].slug ],
        queryFn:  () => fetchSeriesOrMovies(
            'planned-to-watch-films',
            moviesMap['planned-to-watch-films'].slug,
            moviesMap['planned-to-watch-films'].name  ),
        enabled: enabled,
    });
    return {
        plannedMovies: plannedMoviesQuery.data,
        isLoading: plannedMoviesQuery.isLoading,
        isError: plannedMoviesQuery.isError,
    }
};

export default UsePlannedMovies;