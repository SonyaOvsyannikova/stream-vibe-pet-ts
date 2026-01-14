import { useQuery } from "@tanstack/react-query";
import { fetchSeriesOrMovies } from "@/shared/hooks/fetchSeriesOrMovies.ts";
import { serialsMap } from "@/shared/hooks/useShows.ts";

const UsePopularSeries = (enabled = false) => {

    const popularSeriesQuery = useQuery({
        queryKey: ['series', serialsMap['popular-series'].slug ],
        queryFn:  () => fetchSeriesOrMovies(
            'popular-series',
            serialsMap['popular-series'].slug,
            serialsMap['popular-series'].name
        ),
        enabled
    })

    return {
        popularSeries: popularSeriesQuery.data,
        isLoading: popularSeriesQuery.isLoading,
        isError: popularSeriesQuery.isError,
    }

};

export default UsePopularSeries;