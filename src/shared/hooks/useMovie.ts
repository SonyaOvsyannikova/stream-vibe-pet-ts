import { kinopoiskAPI } from '@/shared/api/сlient.ts'
import { useQueries, useQuery } from '@tanstack/react-query'
import { fetchSeriesOrMovies } from '@/shared/hooks/fetchSeriesOrMovies.ts'

export type MovieData = {
  movie: Movie
  position?: number
  positionDiff?: number
  details?: Movie
  category: {
    name: string
    slug: string
  }
}
export type Movie = {
  id?: number
  name?: string
  year?: number
  poster?: {
    url: string
    previewUrl: string
  }
  movieLength?: number
  rating?: {
    kp: number
  }
  premiere?: {
    world: Date
  }
  seasonsInfo?: Array<SeasonInfo>
  votes?: {
    kp?: number
  }
  seriesLength?: number
}
export type SeasonInfo = {
  number?: number
  episodesCount?: number
}

export type MovieCollectionFromUseMovies = {
  id?: string
  name?: string
  slug?: string
  movies?: Movie[]
  nextMovies?: Movie[]
  details?: Movie[]
}

export type MovieWithCategory = {
  position?: number
  positionDiff?: number
  movie?: Movie
  rating?: number
  votes?: number
  details?: Movie | null
  category?: {
    slug: string
    name: string
  }
}

export const moviesMap = {
  top250: { slug: 'top250', name: 'Топ 250 фильмов' },
  best_501: { slug: 'best_501', name: 'Лучшие 500 фильмов в истории' },
  'planned-to-watch-films': {
    slug: 'planned-to-watch-films',
    name: 'Топ ожидаемых фильмов',
  },
}

const useMovie = (enabled = true) => {
  const topMoviesQuery = useQuery({
    queryKey: ['movies', moviesMap['top250'].slug],
    queryFn: () =>
      fetchSeriesOrMovies(
        'top250',
        moviesMap['top250'].slug,
        moviesMap['top250'].name,
      ),
    enabled,
  })
  const bestMoviesQuery = useQuery({
    queryKey: ['movies', moviesMap['best_501'].slug],
    queryFn: () =>
      fetchSeriesOrMovies(
        'best_501',
        moviesMap['best_501'].slug,
        moviesMap['best_501'].name,
      ),
    enabled: enabled && topMoviesQuery.isSuccess,
  })
  const plannedMoviesQuery = useQuery({
    queryKey: ['movies', moviesMap['planned-to-watch-films'].slug],
    queryFn: () =>
      fetchSeriesOrMovies(
        'planned-to-watch-films',
        moviesMap['planned-to-watch-films'].slug,
        moviesMap['planned-to-watch-films'].name,
      ),
    enabled: enabled && bestMoviesQuery.isSuccess,
  })

  return {
    topMovies: topMoviesQuery.data,
    bestMovies: bestMoviesQuery.data,
    plannedMovies: plannedMoviesQuery.data,
    isLoading:
      topMoviesQuery.isLoading ||
      bestMoviesQuery.isLoading ||
      plannedMoviesQuery.isLoading,
    isError:
      topMoviesQuery.isError ||
      bestMoviesQuery.isError ||
      plannedMoviesQuery.isError,
  }
}

export default useMovie

// const queries = filterMovies.map((movie) => ({
//     queryKey: ['filteredMovies', movie.slug],
//     queryFn: async (): Promise<MovieWithCategory[]> => {
//         const response = await kinopoiskAPI.getSortedMoviesWithParametersSlug(movie.slug, {limit: 2})
//
//         const arrId: number[] = response.docs.map((item: MovieWithCategory) => item.movie.id)
//
//         const promises = arrId.map((id:number) => {
//             return kinopoiskAPI.getMoviesId(id)
//                 .then((result) => result)
//                 .catch(() => null);
//         })
//
//         const results = await Promise.all(promises);
//
//         const combinedData: MovieWithCategory[] = response.docs.map((item: Movie, index: number) => {
//             return ({
//                     ...item,
//                     details: results[index]
//                 })
//         })
//         return combinedData
//     },
//     enabled
// }))
//
// const [
//     {
//         data: topMovies,
//         isLoading: isLoadingTopMovies,
//         isError: isErrorTopMovies,
//     },
//     {
//         data: bestMovies,
//         isLoading: isLoadingBestMovies,
//         isError: isErrorBestMovies,
//     },
//     {
//         data: plannedMovies,
//         isLoading: isLoadingPlannedMovies,
//         isError: isErrorPlannedMovies,
//     }
// ] = useQueries({queries})
//
//
// return {
//     topMovies,
//     bestMovies,
//     plannedMovies,
//     isLoading: isLoadingBestMovies || isLoadingTopMovies || isLoadingPlannedMovies,
//     isError: isErrorBestMovies || isErrorTopMovies || isLoadingPlannedMovies,
// }
