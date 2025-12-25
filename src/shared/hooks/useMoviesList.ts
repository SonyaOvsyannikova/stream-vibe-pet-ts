import { kinopoiskAPI } from "@/shared/api/сlient.ts";
import { useQueries } from "@tanstack/react-query";


export type MovieData = {
    movie: Movie;
    position?: number;
    positionDiff?: number;
    details?: Movie;
    category: {
        name: string;
        slug: string;
    }
}
export type Movie = {
    id?: number;
    name?: string;
    year?: number;
    poster?: {
        url: string;
        previewUrl: string;
    },
    movieLength?: number;
    rating?: {
        kp: number;
    },
    premiere?: {
        world: Date,
    }
    seasonsInfo?: Array<SeasonInfo>,
    votes?: {
        kp?: number;
    },
    seriesLength?: number;

}
export type SeasonInfo = {
    number?:number,
    episodesCount?:number,
}

export type MovieCollection = {
    id?: string,
    name?: string,
    slug?: string,
    movies?: Movie[],
    nextMovies?: Movie[],
    details?: Movie[],
}

export type MovieWithCategory = {
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

const filterMovies: {slug: string; name: string}[] = [
    { slug:'top250', name: 'Топ 250 фильмов' },
    { slug:'best_501', name: 'Лучшие 500 фильмов в истории' },
    { slug:'planned-to-watch-films', name: 'Топ ожидаемых фильмов' },
]

type useMoviesList = {
    isLoading: boolean,
    isError: boolean,
    getTopMovies: () => MovieWithCategory[],
    getBestMovies: () => MovieWithCategory[],
    getPlannedMovies: () => MovieWithCategory[],
}

const useMoviesList = ():useMoviesList => {

    const queries = filterMovies.map((movie) => ({
        queryKey: ['filteredMovies', movie.slug],
        queryFn: async (): Promise<MovieWithCategory[]> => {
            const response = await kinopoiskAPI.getSortedMoviesWithParametersSlug(movie.slug, {limit: 2})

            const arrId: number[] = response.docs.map((item: MovieWithCategory) => item.movie.id)

            const promises = arrId.map((id:number) => {
                return kinopoiskAPI.getMoviesId(id)
                    .then((result) => result)
                    .catch(() => null);
            })

            const results = await Promise.all(promises);

            const combinedData: MovieWithCategory[] = response.docs.map((item: Movie, index: number) => {
                return ({
                        ...item,
                        details: results[index]
                    })
            })
            return combinedData
        }
    }))

    const results = useQueries({queries})


    const filteredMovies = (categoryName: string): MovieWithCategory[] => {
        const data = results.flatMap((result) => result.data || [])
        return data.filter(item => item.category.name === categoryName)
    }

    // const getTopMovies = () => filteredMovies('Топ 250 фильмов')
    // const getBestMovies = () => filteredMovies('Лучшие 500 фильмов в истории')
    // const getPlannedMovies = () => filteredMovies('Топ ожидаемых фильмов')

    const getTopMovies = () => results[0]?.data || [];
    const getBestMovies = () => results[1]?.data || [];
    const getPlannedMovies = () => results[2]?.data || [];

    return {
        isLoading: results.some((result) => {result.isLoading}),
        isError: results.some((result) => {result.isError}),
        getTopMovies,
        getBestMovies,
        getPlannedMovies,
    }
};

export default useMoviesList;