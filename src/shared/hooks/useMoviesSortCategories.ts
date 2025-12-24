// import { useQueries } from '@tanstack/react-query';
// import { kinopoiskAPI } from "@/shared/api/сlient.ts";
//
// export type Movie = {
//     id?: number,
//     name?: string,
//     year?: number,
//     rating?: {
//         kp: number,
//         imdb: number,
//         await: number,
//     },
//     poster?: {
//         url: string,
//         previewUrl: string,
//     },
//     premiere?: {
//         world: Date,
//     },
//     movie?: {
//         name?: string,
//         poster?: {
//             url: string,
//             previewUrl: string,
//         }
//     }
// }
//
// export type MovieCollection = {
//     id: string,
//     name: string,
//     slug: string,
//     movies: Movie[],
// }
// export type GroupedMovies = MovieCollection[]
//
// export const genreSlugs = {
//     ww2: { slug: 'theme_ww2', name: 'Война' },
//     comics: { slug: 'theme_comics', name: 'Комиксы' },
//     kidsFilms: { slug: 'theme_kids_films', name: 'Детское кино' },
//     romanticComedy: { slug: 'theme_romantic_comedy', name: 'Ромком' },
//     actionComedy: { slug: 'theme_action_comdey', name: 'Экшен-комедии' },
//     kidsAnimation: { slug: 'theme_kids_animation', name: 'Мультфильмы' },
//     familyComedy: { slug: 'theme_family_comedy', name: 'Семейное кино' },
//     space: { slug: 'theme_space', name: 'Космос' },
//     zombie: { slug: 'theme_zombie', name: 'Зомби' },
//     love: { slug: 'theme_love', name: 'Мелодрамы' },
// }
//
// export const useMoviesSortCategories = () => {
//
//     const queries = Object.entries(genreSlugs).map(([key, genre]) => ({
//
//         queryKey: ['moviesByYearGenres', genre.slug],
//         queryFn: () => kinopoiskAPI.getSortedMoviesWithParametersSlug((genre.slug),{
//             limit: 2,
//             total: 1
//         })
//     }))
//
//     const results = useQueries({queries});
//
//     const filterMovies: GroupedMovies = results.map((result, index) => {
//
//         const [key, genre] = Object.entries(genreSlugs)[index]
//
//         return {
//             id: key,
//             name: genre.name,
//             slug: genre.slug,
//             movies: (result.data?.docs || []).map(doc => doc.movie || doc)
//         }
//
//         // const reversed = [...(result.data?.docs || []).reverse()]
//         // return {
//         //     id: key,
//         //     name: genre.name,
//         //     slug: genre.slug,
//         //     movies: reversed.slice(5,9)
//         // }
//     })
//
//     console.log(filterMovies)
//     return {
//         filterMovies,
//     }
// }