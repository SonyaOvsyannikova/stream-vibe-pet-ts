import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'https://api.poiskkino.dev/v1.4/',
    headers: {
        'X-API-KEY': import.meta.env.VITE_KINOPOISK_API_KEY
    }
})

type optionsMovies = {
    signal?: AbortSignal,
    limit?: number,
    sortField?: string,
    sortType?: number,
    top?: number,
    rating?: Rating,
    poster?: Poster,
    year?: number
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
            const response = await axiosInstance.get('/movie', {

                params: {
                    limit: options.limit,
                    sortField: options.sortField,
                    sortType: options.sortType,
                },

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
