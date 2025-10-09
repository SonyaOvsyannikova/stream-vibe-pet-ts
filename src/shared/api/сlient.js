import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'https://api.kinopoisk.dev/v1.4/',
    headers: {
        'X-API-KEY': import.meta.env.VITE_KINOPOISK_API_KEY
    }
})



export const kinopoiskAPI = {
    getPopularMovies: async (options={}) => {
        try {
            const response = await axiosInstance.get('/movie', {signal: options.signal});
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    },
    getSearchMovies: async (searchQuery, options={}) => {
        try {
            const response = await axiosInstance.get('/movie/search', {
                params: searchQuery,
                signal: options.signal,
            });
            return response.data
        } catch (error) {
            console.log(error)
            throw error
        }
    },
    getMoviesId: async (id, options={}) => {
        try {
            const response = await axiosInstance.get(`/movie/${id}`, {signal: options.signal});
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    },
    getReviewedMovies: async (id, options={}) => {
        try {
            const response = await axiosInstance.get(`/review?movieId=${id}`, {signal: options.signal});
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    },
    getSeasons: async (id, options={}) => {
        try {
            const response = await axiosInstance.get(`/season?movieId=${id}`, {signal: options.signal});
            return response.data
        }
        catch (error) {
            console.log(error)
        }
    }

}


