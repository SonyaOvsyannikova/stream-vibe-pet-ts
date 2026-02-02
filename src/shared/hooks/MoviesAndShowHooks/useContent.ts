import { useQuery } from '@tanstack/react-query'
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
  movie?: {
    name?: string
    poster?: {
      url: string
      previewUrl: string
    }
  }
  slug?: string
  movies?: Movie[]
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
export type MovieCollection = {
  id?: string
  name?: string
  slug?: string
  movies?: Movie[]
  nextMovies?: Movie[]
  details?: Movie[]
}
export type GroupedMovies = MovieCollection[]

type mediaKey = 'series' | 'movies'

export const moviesMap = {
  top250: { slug: 'top250', name: 'Топ 250 фильмов', fieldName: 'topMovies' },
  best_501: {
    slug: 'best_501',
    name: 'Лучшие 500 фильмов в истории',
    fieldName: 'bestMovies',
  },
  'planned-to-watch-films': {
    slug: 'planned-to-watch-films',
    name: 'Топ ожидаемых фильмов',
    fieldName: 'plannedMovies',
  },
}

export const serialsMap = {
  'popular-series': {
    slug: 'popular-series',
    name: 'Популярные сериалы',
    fieldName: 'popularSeries',
  },
  'series-top250': {
    slug: 'series-top250',
    name: 'Топ 250 сериалов',
    fieldName: 'topSeries',
  },
  '100_greatest_TVseries': {
    slug: '100_greatest_TVseries',
    name: '100 Великих телешоу',
    fieldName: 'greatestSeries',
  },
}

const useContent = (key: mediaKey, categoryKey: string, enabled = false) => {
  const choiceKey = key === 'movies' ? moviesMap : serialsMap
  const config = choiceKey[categoryKey]

  const query = useQuery({
    queryKey: [key, config.slug],
    queryFn: () => fetchSeriesOrMovies(categoryKey, config.slug, config.name),
    enabled,
  })
  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  }
}

export const useTopMovies = (enabled = false) =>
  useContent('movies', 'top250', enabled)
export const useBestMovies = (enabled = false) =>
  useContent('movies', 'best_501', enabled)
export const usePlannedMovies = (enabled = false) =>
  useContent('movies', 'planned-to-watch-films', enabled)
export const usePopularSeries = (enabled = false) =>
  useContent('series', 'popular-series', enabled)
export const useTopSeries = (enabled = false) =>
  useContent('series', 'series-top250', enabled)
export const useGreatestSeries = (enabled = false) =>
  useContent('series', '100_greatest_TVseries', enabled)

export default useContent
