import { kinopoiskAPI } from "@/shared/api/сlient.ts";
import {  useQueries } from '@tanstack/react-query';

const filterSerials: {slug: string, name: string}[] = [
    { slug: 'popular-series', name: 'Популярные сериалы' },
    { slug: 'series-top250', name:'Топ 250 сериалов' },
    { slug: '100_greatest_TVseries', name: '100 Великих телешоу' },
]

type GetMoviesLoader = {
    getPopularSeries: () => MovieWithCategory[],
    getTopSeries: () => MovieWithCategory[],
    getGreatestSeries: () => MovieWithCategory[],
    isLoading: boolean ,
    isError:boolean,
    isSuccess?: boolean ,
}

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

export const useGetMoviesLoader  =  (): GetMoviesLoader => {

    const queries = filterSerials.map((serial) => (
        {
            queryKey: ['series', serial.slug],
            queryFn: async (): Promise<MovieWithCategory[]> => {
                const response = await kinopoiskAPI.getSortedMoviesWithParametersSlug(serial.slug, {limit: 2})

                const arrId: number[] = response.docs.map((item: MovieWithCategory):number => item.movie.id)

                const promises = await Promise.all(arrId.map((id: number) => {
                    return kinopoiskAPI.getMoviesId(id)
                        .then((result: Movie) => result)
                        .catch(() => null);
                }))
                const combinedData: MovieWithCategory[] = response.docs.map((movie: Movie, index: number) => {
                    return({
                        ...movie,
                        details: promises[index],
                        category: {
                            slug: serial.slug,
                            name: serial.name,
                        }
                    })
                })
                return combinedData
            }
        }
    ))

    const results = useQueries({queries});

    const filteredData = (categoryName: string): MovieWithCategory[] => {
        const data = results.flatMap((result) => result.data || [])
        return data.filter(item => item.category.name === categoryName)
    }

    const getPopularSeries = () => filteredData('Популярные сериалы')
    const getTopSeries = () => filteredData( 'Топ 250 сериалов');
    const getGreatestSeries = () => filteredData( '100 Великих телешоу');

    return {
        getPopularSeries,
        getTopSeries,
        getGreatestSeries,
        isLoading: results.some(r => r.isLoading),
        isError: results.some(r => r.isError),
        isSuccess: results.every(r => r.isSuccess),
    };
}
