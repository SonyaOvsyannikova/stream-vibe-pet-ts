import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'https://api.poiskkino.dev/v1.4/',
    headers: {
        'X-API-KEY': import.meta.env.VITE_KINOPOISK_API_KEY
    }
})
const axiosInstanceForSlug = axios.create({
    baseURL: 'https://api.poiskkino.dev/v1.5/',
    headers: {
        'X-API-KEY': import.meta.env.VITE_KINOPOISK_API_KEY
    }
})

type optionsMovies = {
    signal?: AbortSignal,
    limit?: number,
    sortField?: string,
    selectFields?: string,
    sortType?: number,
    top?: number,
    rating?: Rating,
    poster?: Poster,
    year?: number,
    genres?: Array<Genres>,
    backdrop?: Backdrop,
    slug?: string,
}
type listOptions = {
    signal?: AbortSignal,

    docs?: Docs[],
    total?: number,
    limit?: number,
    page?: number,
    pages?: number,
    sortField?: string,
    selectFields?: string,
    sortType?: number,
}

// type ListOptions = {
//     signal?: AbortSignal;
//     page?: number;
//     limit?: number;
//     sortField?: string;
//     sortType?: number;
//     selectFields?: string;
// };
//
// interface ListResponse {
//     docs: Docs[];
//     total: number;
//     limit: number;
//     page: number;
//     pages: number;
//     sortField?: string;
//     sortType?: number;
// }

type Docs = {
    category?: string,
    slug?: string,
    moviesCount?: number,
    name?: string,
    updatedAt?: Date,
    createdAt?: Date,
}

type Backdrop = {
    url?: string,
    previewUrl?: string,
}

type Genres = {
    name?: string,
}

type Rating = {
    kp?: number,
    imdb?: number,
    filmCritics?: number,
    await?: number,
}
type Poster = {
    previewUrl: string,
    url: string,
}

export const kinopoiskAPI = {

    getPopularMovies: async (options: optionsMovies = {}) => {
        try {
            const params: any = {
                limit: options.limit,
                sortField: options.sortField,
                sortType: options.sortType,

            }

            const response = await axiosInstance.get('/movie', {
                params,
                signal: options.signal});
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    },
    getSortedMoviesWithParametersSlug: async (slug: string ,options: listOptions = {}) => {
       try {
           const response = await axiosInstanceForSlug.get(`/list/${slug}`, {
               params: {
                   sortField: options.sortField,
                   sortType: options.sortType,
                   limit: options.limit,

               },
               signal: options.signal,
           })
           return response.data.movies || { docs: []}
       }
       catch (error) {
           console.log(error)
       }
    },
    getSortedMoviesWithParametersSlug1: async (options: listOptions = {}) => {
        try {
            const response = await axiosInstance.get(`/list`, {
                params: {
                    limit: options.limit,
                },
                signal: options.signal,
            })
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    },
    getTopMovies: async (slug: string, options: listOptions = {}) => {
        try {
            const response = await axiosInstanceForSlug.get(`/list/${slug}`, {
                params: {
                    sortField: options.sortField,
                    sortType: options.sortType,
                    limit: options.limit,
                },
                signal: options.signal,
            })
            return response.data.movies || { docs: []}
        }
        catch (error) {
            console.log(error)
        }
    },
    getSortedMoviesByBackdrop: async (options: optionsMovies = {}) => {
        try {
            const params: any = {
                limit: options.limit,
                sortField: options.sortField,
                sortType: options.sortType,
                'backdrop.url': options.backdrop,
            }

            const response = await axiosInstance.get('/movie', {
                params,
                signal: options.signal});
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    },
    getSearchMovies: async (searchQuery: string, options: {
        signal?: AbortSignal,
        limit?: number,
    }) => {
        try {
            const response = await axiosInstance.get('/movie/search', {
                params: {
                    query: searchQuery,
                    limit: options.limit,
                },
                signal: options.signal,
            });
            return response.data
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    getMoviesId: async (id: string | number, options: {signal?: AbortSignal} = {}) => {
        try {
            const response = await axiosInstance.get(`/movie/${id}`, {signal: options.signal});
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    },
    getReviewedMovies: async (id: string | number , options: {signal?: AbortSignal} = {}) => {
        try {
            const response = await axiosInstance.get(`/review?movieId=${id}`, {signal: options.signal});
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    },
    getSeasons: async (id: string | number, options: {signal?:AbortSignal} = {}) => {
        try {
            const response = await axiosInstance.get(`/season?movieId=${id}`, {signal: options.signal});
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }

}
