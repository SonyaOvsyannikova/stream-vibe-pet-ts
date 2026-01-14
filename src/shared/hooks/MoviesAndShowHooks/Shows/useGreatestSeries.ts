import { useQuery } from "@tanstack/react-query";
import { fetchSeriesOrMovies } from "@/shared/hooks/fetchSeriesOrMovies.ts";
import { serialsMap } from "@/shared/hooks/useShows.ts";

const UseGreatestSeries = (enabled = false ) => {

    const greatestSeriesQuery = useQuery({
        queryKey: ['series', serialsMap['100_greatest_TVseries'].slug ],
        queryFn:  () => fetchSeriesOrMovies(
            '100_greatest_TVseries',
            serialsMap['100_greatest_TVseries'].slug,
            serialsMap['100_greatest_TVseries'].name  ),
        enabled: enabled
    });

    return {
        greatestSeries: greatestSeriesQuery.data,
        isLoading: greatestSeriesQuery.isLoading,
        isError:  greatestSeriesQuery.isError,
    }
};

export default UseGreatestSeries;