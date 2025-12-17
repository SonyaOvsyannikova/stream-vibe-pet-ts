import {kinopoiskAPI} from "@/shared/api/сlient.ts";
import {useEffect, useState} from "react";

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
    }
}

export type MovieCollection = {
    id: string,
    name: string,
    slug: string,
    movies: Movie[],
}
export type GroupedMovies = MovieCollection[]

export const useMovies = (slug: string) => {

    const [groupedMovies, setGroupedMovies] = useState<GroupedMovies>([])

    useEffect(() => {

        const genreSlugs = {
            ww2: { slug: 'theme_ww2', name: 'Война' },
            comics: { slug: 'theme_comics', name: 'Комиксы' },
            kidsFilms: { slug: 'theme_kids_films', name: 'Детское кино' },
            romanticComedy: { slug: 'theme_romantic_comedy', name: 'Ромком' },
            actionComedy: { slug: 'theme_action_comdey', name: 'Экшен-комедии' },
            kidsAnimation: { slug: 'theme_kids_animation', name: 'Мультфильмы' },
            familyComedy: { slug: 'theme_family_comedy', name: 'Семейное кино' },
            space: { slug: 'theme_space', name: 'Космос' },
            zombie: { slug: 'theme_zombie', name: 'Зомби' },
            love: { slug: 'theme_love', name: 'Мелодрамы' },
        }

        const getMovieByGenres = async () => {

           const promises = Object.entries(genreSlugs).map(([key, genre]) => {

               return kinopoiskAPI.getSortedMoviesWithParametersSlug(genre.slug, {
                   limit: 4,
                   // sortField: "top250",
                   sortType: -1,
               })
               .then(response => ({
                   id: key,
                   name: genre.name,
                   slug: genre.slug,
                   movies: response.docs || []
               }))
               .catch(error => {
                   console.log(`Ошибка ${genre.slug}:`, error)
                   return {
                       id: key,
                       name: genre.name,
                       slug: genre.slug,
                       movies: []
                   };
               })
           })
            const collections = await Promise.all(promises);
            setGroupedMovies(collections)
            console.log(groupedMovies)
        }
         getMovieByGenres()
    }, [slug])

    return {
        groupedMovies,
        groupedMoviesLength: groupedMovies.length
    }
}