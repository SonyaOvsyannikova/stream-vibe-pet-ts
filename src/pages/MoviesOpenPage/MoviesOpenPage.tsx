import Hero from '@/widgets/Hero'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { kinopoiskAPI } from '@/shared/api/сlient.js'
import MovieCard from '@/widgets/MovieCard'
import PlayerMovie from '@/shared/ui/PlayerMovie/PlayerMovie.tsx'

import {
  IResponseApiMovie,
  IResponseApiSeasons,
  IResponseApiReview,
  IResponseApiEpisodeData,
  SelectedEpisode,
} from '@/shared/types'
import { useQuery } from '@tanstack/react-query'

const MoviesOpenPage = () => {
  const [isOpenPlayer, setIsOpenPlayer] = useState<boolean>(false)
  const [selectedEpisodes, setSelectedEpisodes] =
    useState<SelectedEpisode>(null)

  const params = useParams()
  const id: string = params.id

  const { data: movieData, isLoading: isMovieLoading } =
    useQuery<IResponseApiMovie>({
      queryKey: ['movieData', id],
      queryFn: async (): Promise<IResponseApiMovie> => {
        const response: IResponseApiMovie = await kinopoiskAPI.getMoviesId(id)
        return response
      },
      enabled: !!id,
    })

  const { data: seasons, isLoading: isSeasonsLoading } = useQuery<
    IResponseApiSeasons[]
  >({
    queryKey: ['seasons', id],
    queryFn: async () => {
      const response = await kinopoiskAPI.getSeasons(id)
      return response.docs
    },
    enabled: !!id,
  })

  const { data: reviews, isLoading: isReviewsLoading } = useQuery<
    IResponseApiReview[]
  >({
    queryKey: ['reviews', id],
    queryFn: async () => {
      const reviewData = await kinopoiskAPI.getReviewedMovies(id)
      return reviewData.docs
    },
    enabled: !!id,
  })

  if (!id) {
    return <div>ID фильма не указан</div>
  }

  if (isMovieLoading) {
    return <div>Загрузка фильма...</div>
  }

  if (!movieData) {
    return <div>Фильм не найден</div>
  }

  const handlePlaySeriesOrMovie = (
    episode?: IResponseApiEpisodeData,
    index?: number,
  ): void => {
    if (movieData?.type === 'tv-series') {
      if (episode === undefined || episode === null) {
        setIsOpenPlayer(false)
        return
      }
      setSelectedEpisodes({
        episode: episode,
        episodeIndex: index,
      })
    } else {
      setSelectedEpisodes({
        episode: {
          name: movieData?.name || '',
          id: movieData?.id || 0,
        },
        episodeIndex: 0,
      })
    }
    setIsOpenPlayer(true)
  }

  console.log(movieData)

  return (
    <div className="container">
      {isOpenPlayer ? (
        <PlayerMovie
          selectedEpisodes={selectedEpisodes}
          movieData={movieData}
        />
      ) : (
        <Hero
          variant={'default'}
          movieData={movieData}
          id={id}
          seasons={seasons}
          onPlayClick={handlePlaySeriesOrMovie}
        />
      )}
      <MovieCard
        movieData={movieData}
        seasons={seasons}
        reviews={reviews}
        isOpenPlayer={isOpenPlayer}
        setIsOpenPlayer={setIsOpenPlayer}
        selectedEpisodes={selectedEpisodes}
        setSelectedEpisodes={setSelectedEpisodes}
        onPlayClick={handlePlaySeriesOrMovie}
      />
    </div>
  )
}

export default MoviesOpenPage
