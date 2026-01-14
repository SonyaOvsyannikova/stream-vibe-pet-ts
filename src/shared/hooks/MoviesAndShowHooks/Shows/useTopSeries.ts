import {useQuery} from "@tanstack/react-query";
import {fetchSeriesOrMovies} from "@/shared/hooks/fetchSeriesOrMovies.ts";
import {serialsMap} from "@/shared/hooks/useShows.ts";

const UseTopSeries = (enabled = false) => {

    const topSeriesQuery = useQuery({
        queryKey: ['series', serialsMap['series-top250'].slug ],
        queryFn:  () => fetchSeriesOrMovies(
            'series-top250',
            serialsMap['series-top250'].slug,
            serialsMap['series-top250'].name,
        ),
        enabled: enabled
    })

    return {
        topSeries: topSeriesQuery.data,
        isLoading:topSeriesQuery.isLoading,
        isError: topSeriesQuery.isError,
    }
};

export default UseTopSeries;