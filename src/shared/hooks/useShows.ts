import { useQuery } from '@tanstack/react-query';
import { fetchSeriesOrMovies } from "@/shared/hooks/fetchSeriesOrMovies.ts";

export const serialsMap = {
    'popular-series': { slug: 'popular-series', name: 'Популярные сериалы' },
    'series-top250': { slug: 'series-top250', name: 'Топ 250 сериалов' },
    '100_greatest_TVseries': { slug: '100_greatest_TVseries', name: '100 Великих телешоу' },
};



export type Movie = {
    id?: number,
    name?: string,
    year?: number,
    rating?: {
        kp: number,
        imdb: number,
        await: number,
    },
    poster?: {
        url: string,
        previewUrl: string,
    },
    premiere?: {
        world: Date,
    },
    movie?: {
        name?: string,
        poster?: {
            url: string,
            previewUrl: string,
        }
    },
    slug?: string,
    movies?: Movie[],

}

export type MovieCollection = {
    id?: string,
    name?: string,
    slug?: string,
    movies?: Movie[],
    nextMovies?: Movie[],
    details?: Movie[],
}

type MovieWithCategory = {
    position?: number;
    positionDiff?: number;
    movie?: Movie;
    rating?: number;
    votes?: number;
    details?: Movie | null;
    category?: {
        slug: string;
        name: string;
    };
};
export type GroupedMovies = MovieCollection[]

const useShows  =  (enabled = true) => {

        const popularSeriesQuery = useQuery({
            queryKey: ['series', serialsMap['popular-series'].slug ],
            queryFn:  () => fetchSeriesOrMovies(
                'popular-series',
                     serialsMap['popular-series'].slug,
                     serialsMap['popular-series'].name
            ),
            enabled
        })
        const topSeriesQuery = useQuery({
            queryKey: ['series', serialsMap['series-top250'].slug ],
            queryFn:  () => fetchSeriesOrMovies(
                'series-top250',
                 serialsMap['series-top250'].slug,
                 serialsMap['series-top250'].name,
            ),
            enabled: enabled && popularSeriesQuery.isSuccess,
        })
        const greatestSeriesQuery = useQuery({
            queryKey: ['series', serialsMap['100_greatest_TVseries'].slug ],
            queryFn:  () => fetchSeriesOrMovies(
                '100_greatest_TVseries',
                serialsMap['100_greatest_TVseries'].slug,
                serialsMap['100_greatest_TVseries'].name  ),
            enabled: enabled && topSeriesQuery.isSuccess,
        });

        return {
            topSeries: topSeriesQuery.data,
            popularSeries: popularSeriesQuery.data,
            greatestSeries: greatestSeriesQuery.data,
            isLoading: popularSeriesQuery.isLoading || topSeriesQuery.isLoading || greatestSeriesQuery.isLoading,
            isError: popularSeriesQuery.isError || topSeriesQuery.isError || greatestSeriesQuery.isError,
        }


}
export default useShows;


// const queries = filterSerials.map((serial) => (
//     {
//         queryKey: ['series', serial.slug],
//         queryFn: async (): Promise<MovieWithCategory[]> => {
//             const response = await kinopoiskAPI.getSortedMoviesWithParametersSlug(serial.slug, {limit: 2})
//
//             const arrId: number[] = response.docs.map((item: MovieWithCategory):number => item.movie.id)
//
//             const promises = await Promise.all(arrId.map((id: number) => {
//                 return kinopoiskAPI.getMoviesId(id)
//                     .then((result: Movie) => result)
//                     .catch(() => null);
//             }))
//             const combinedData: MovieWithCategory[] = response.docs.map((movie: Movie, index: number) => {
//                 return({
//                     ...movie,
//                     details: promises[index],
//                     category: {
//                         slug: serial.slug,
//                         name: serial.name,
//                     }
//                 })
//             })
//             return combinedData
//         }
//     }
// ))
//
// const [
//     {
//         data: popularSeries,
//         isLoading: isLoadingPopularSeries,
//         isError: isErrorPopularSeries,
//     },
//     {
//         data: topSeries,
//         isLoading: isLoadingTopSeries,
//         isError: isErrorTopSeries,
//     },
//     {
//         data: greatestSeries,
//         isLoading: isLoadingGreatestSeries,
//         isError: isErrorGreatestSeries,
//     }
// ] = useQueries({queries});
//
//
//
// return {
//     popularSeries,
//     topSeries,
//     greatestSeries,
//     isLoading: isLoadingPopularSeries || isLoadingTopSeries || isLoadingGreatestSeries,
//     isError: isErrorPopularSeries || isErrorTopSeries || isLoadingGreatestSeries,
// };