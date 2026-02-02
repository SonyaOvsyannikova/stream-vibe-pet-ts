import { useQueries, useQuery } from '@tanstack/react-query'
import { kinopoiskAPI } from '@/shared/api/сlient.ts'
import { useEffect } from 'react'

export type Movie = {
  id?: number
  name?: string
  year?: number
  rating?: {
    kp: number
    imdb: number
    await: number
  }
  poster?: {
    url: string
    previewUrl: string
  }
  premiere?: {
    world: Date
  }
  movie?: {
    name?: string
    poster?: {
      url: string
      previewUrl: string
    }
  }
  slug?: string
  // movies?: Movie[],
  // nextMovies?: Movie[],
}

export type MovieCollectionByGrouped = {
  id?: string
  name: string
  slug: string
  movies: Movie[]
  nextMovies: Movie[]
}
export type GroupedMovies = MovieCollectionByGrouped[]

export const genreSlugs = {
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

export const useMoviesGrouped = (enabled = true) => {
  const firstPageQueries = Object.entries(genreSlugs).map(([key, genre]) => ({
    queryKey: ['genre-page1', genre.slug],
    queryFn: () =>
      kinopoiskAPI.getSortedMoviesWithParametersSlug(genre.slug, { limit: 2 }),
    enabled,
  }))
  const firstResults = useQueries({ queries: firstPageQueries })

  const secondPageQueries = Object.entries(genreSlugs).map(
    ([key, genre], index) => ({
      queryKey: ['genre-2', genre.slug, 'page-2'],
      queryFn: async () => {
        const firstPage = await kinopoiskAPI.getSortedMoviesWithParametersSlug(
          genre.slug,
          {
            limit: 4,
          },
        )
        if (!firstPage.next) throw new Error('Нет второй страницы')

        return kinopoiskAPI.getSortedMoviesWithParametersSlug(genre.slug, {
          limit: 4,
          next: firstPage.next,
        })
      },
      enabled,
    }),
  )
  const secondResults = useQueries({ queries: secondPageQueries })

  const groupedMoviesPageOne = Object.entries(genreSlugs).map(
    ([key, genre], index) => ({
      id: key,
      name: genre.name,
      slug: genre.slug,
      movies:
        firstResults[index]?.data?.docs?.map((doc) => doc.movie || doc) || [],
      nextMovies: [],
    }),
  )

  const groupedMoviesPageTwo = Object.entries(genreSlugs).map(
    ([key, genre], index) => ({
      id: key,
      name: genre.name,
      slug: genre.slug,
      movies: [],
      nextMovies:
        secondResults[index]?.data?.docs?.map((doc) => doc.movie || doc) || [],
    }),
  )

  return {
    groupedMoviesPageOne,
    groupedMoviesPageTwo,
    isLoadingPageOne: firstResults.some((r) => r.isLoading),
    isLoadingPageTwo: secondResults.some((r) => r.isLoading),
    isError:
      firstResults.some((r) => r.isError) ||
      secondResults.some((r) => r.isError),
  }
}

// const allQueries = Object.entries(genreSlugs).map(([key, genre]) => [
//     {
//         queryKey: ['genre-1', genre.slug, 'page-1'],
//         queryFn: () => kinopoiskAPI.getSortedMoviesWithParametersSlug(genre.slug, {
//             limit: 2,
//         }),
//         enabled
//     },
//     {
//         queryKey: ['genre-2', genre.slug, 'page-2'],
//         queryFn: async () => {
//             const firstPage = await kinopoiskAPI.getSortedMoviesWithParametersSlug(genre.slug, {
//                 limit: 4,
//             })
//             if (!firstPage.next) throw new Error('Нет второй страницы');
//
//             return kinopoiskAPI.getSortedMoviesWithParametersSlug(genre.slug, {
//                 limit: 4,
//                 next: firstPage.next
//             });
//         },
//         enabled
//     }
// ]).flat()
//
// const results = useQueries({queries: allQueries});
//
// const groupedMovies: GroupedMovies = Object.entries(genreSlugs).map(([key, genre], index) => {
//     const firstPageIndex = index * 2;
//     const secondPageIndex = firstPageIndex + 1;
//
//     const firstMovies = results[firstPageIndex]?.data?.docs || [];
//     const secondMovies = results[secondPageIndex]?.data?.docs || [];
//
//     return {
//         id: key,
//         name: genre.name,
//         slug: genre.slug,
//         movies: firstMovies.map(doc => doc.movie || doc),  // Первая секция
//         nextMovies: secondMovies.map(doc => doc.movie || doc)  // Вторая секция
//     };
// });
//
// return {
//     groupedMovies,
//     groupedMoviesLength: groupedMovies.length,
//     isLoading: results.some(r => r.isLoading),
//     isError: results.some(r => r.isError)
//
// };
