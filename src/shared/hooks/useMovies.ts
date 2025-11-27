import {useMemo, useState} from "react";
import { IResponseApiMovie } from "@/shared/types";

export type GroupMovie = {
    [key: string]: IResponseApiMovie[]
}

const genreArray: Array<string> = ['фантастика', 'приключения', 'комедия', 'драма', 'ужасы',
    'боевик', 'мультфильм', 'фэнтэзи', 'мелодрама', 'музыка', 'реальное ТВ', 'документальный', 'короткометражка', 'криминал', 'спорт' ]

export const useMovies = () => {

    const [movieData, setMovieData] = useState<null | IResponseApiMovie>(null)
    const [movieDataArray, setMovieDataArray] = useState<null | IResponseApiMovie[]>(null)


    const filterMovieWithPreview = (movies: IResponseApiMovie[]) => {
        return movies.filter(movie =>
            movie?.poster?.previewUrl
            || movie?.backdrop?.previewUrl
            && movie.name
            && (movie?.rating?.kp ?? 0) > 6
        )
    }

    // const moviesByFirstGenre = (movies: IResponseApiMovie[]) => {
    //     const grouped: {[key: string]: any[]} = {}
    //
    //     movies.forEach(movie => {
    //         const firstGenre = movie?.genres?.[0]?.name
    //
    //         if(firstGenre && genreArray.includes(firstGenre)) {
    //             if(!grouped[firstGenre]) {
    //                 grouped[firstGenre] = [];
    //             }
    //             grouped[firstGenre].push(movie);
    //         }
    //     })
    //     Object.keys(grouped).forEach((key) => {
    //         grouped[key] = grouped[key].slice(0,4)
    //     })
    //     return grouped
    // }
    //
    //
    //
    // const groupedMovies = useMemo(() => {
    //     if(!movieDataArray) return {}
    //         try {
    //             const dataMoviewWithPreview = filterMovieWithPreview(movieDataArray)
    //             console.log(dataMoviewWithPreview)
    //             const groupedMoviesV = moviesByFirstGenre(dataMoviewWithPreview)
    //             console.log(groupedMoviesV)
    //             return groupedMoviesV
    //         } catch (error) {
    //             console.log(error)
    //             return {}
    //         }
    //
    // }, [movieDataArray]);

    const groupMoviesByAllGenres = (movies: IResponseApiMovie[]): GroupMovie => {
        const groupMovie: GroupMovie = {}

        if(!movies || !Array.isArray(movies)) { return groupMovie}

        movies.forEach(movie => {
            if(!movie.genres || !Array.isArray(movie.genres)) { return }

            const matchingMovies = movie.genres.filter(genre =>
                genre?.name && genreArray.includes(genre.name.toLowerCase())
            );

            matchingMovies.forEach(genre => {
                const genreName = genre.name

                if(!groupMovie[genreName]) {
                    groupMovie[genreName] = []
                }

                const movieExists = groupMovie[genreName].some(m => m.id === movie.id)

                if(!movieExists && groupMovie[genreName].length < 4) {
                    groupMovie[genreName].push(movie)
                }
            })
        })
        return groupMovie
    }

    const groupedMovies = useMemo(() => {
        if(!movieDataArray) return {}
        try {
            const filtredMovies = filterMovieWithPreview(movieDataArray)
            return groupMoviesByAllGenres(filtredMovies)
        }
        catch (error) {
            console.log(error)
            return {}
        }
    }, [])

    return {
        movieData,
        setMovieData,
        genreArray,
        movieDataArray,
        setMovieDataArray,
        filterMovieWithPreview,
        groupedMovies
    }
}