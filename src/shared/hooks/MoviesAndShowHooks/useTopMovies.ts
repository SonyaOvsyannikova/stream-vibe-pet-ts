import {useQuery} from "@tanstack/react-query";
import { fetchSeriesOrMovies } from "@/shared/hooks/fetchSeriesOrMovies.ts";
import { moviesMap } from "@/shared/hooks/useMovie.ts";

const UseTopMovies = (enabled = true) => {

    const topMoviesQuery = useQuery({
        queryKey: ['movies', moviesMap['top250'].slug ],
        queryFn:  () => fetchSeriesOrMovies(
            'top250',
            moviesMap['top250'].slug,
            moviesMap['top250'].name
        ),
        enabled
    })

   return {
        topMovies: topMoviesQuery.data,
        isLoading: topMoviesQuery.isLoading,
        isError: topMoviesQuery.isError,
   }
};

export default UseTopMovies;