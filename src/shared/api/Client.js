import axios from "axios";

const apiKinoPoisk = axios.create({
    baseURL: 'https://api.kinopoisk.dev/',
    headers: {
        'X-API-KEY': import.meta.env.VITE_KINOPOISK_API_KEY
    }
})

export const movies = async () => {
    try {
        const response = await apiKinoPoisk.get('/v1.4/movie', {
            params: {
                query: 'movie'
            }
        })
        return response.data
    }
    catch (error) {
        console.log(error)
    }
}
export const keywordMovies = async (searchQuery) => {
    try {
        const response = await apiKinoPoisk.get('/v1.4/keyword', {
            params: {
                search: searchQuery,
                limit: 10
            }
        })
        return response.data
    }
    catch(error) {
        console.log(error)
    }
}

export const searchMovies = async (searchQuery) => {
    try {
        const response = await apiKinoPoisk.get('/v1.4/movie/search', {
            params: {
                query: searchQuery,
            }
        });
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}
export const randomMovies = async () => {
    try {
        const response = await apiKinoPoisk.get('/v1.4/movie/random', {
            params: {
                query: 'random',
            }
        })
        return response.data
    }
    catch (error) {
        console.log(error)
        throw error
    }
}
export const moviesId = async () => {
    try {
        const response = await apiKinoPoisk.get('/v1.4/movie/movieId', {
            params: {
                query: 'id',
            }
        })
        return response.data
    }
    catch (error) {
        console.log(error)
    }
}
