import AddIcon from '@/assets/icons/add.svg?react'
import LikeIcon from '@/assets/icons/like.svg?react'
import SoundIcon from '@/assets/icons/sound.svg?react'
import PlayIcon from '@/assets/icons/play.svg?react'
import ArrowRight from '@/assets/icons/arrowRight.svg?react'
import ArrowLeft from '@/assets/icons/arrowLeft.svg?react'
import ButtonIcon from '@/shared/ui/ButtonIcon'
import MainButton from '@/shared/ui/MainButton'
import cl from './Hero.module.scss'
import { useRef, useState } from 'react'
import {
  IResponseApiMovie,
  IResponseApiSeasons,
  IResponseApiEpisodeData,
} from '@/shared/types'
import clsx from 'clsx'
import Slider from '@/shared/ui/Slider'
import { Swiper as SwiperType } from 'swiper'
import PlayButton from '@/assets/icons/playButtonOnHero.svg?react'
import { kinopoiskAPI } from '@/shared/api/сlient.ts'
import { useQuery } from '@tanstack/react-query'
import { SeasonInfo } from '@/shared/hooks/useMovie.ts'
import { supabase } from '@/shared/api/supabase.ts'
import { toast, Bounce } from 'react-toastify'

type HeroProps = {
  movieData?: IResponseApiMovie
  id?: string
  onPlayClick?: (episode?: IResponseApiEpisodeData, index?: number) => void
  seasons?: IResponseApiSeasons[]
  variant: 'default' | 'HomePage' | 'MoviesAndShowsPage'
  classNamePosterHomePage?: string
  movieOrSeries?: IResponseApiMovie[]
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

const Hero = (props: HeroProps) => {
  const { movieData, onPlayClick, seasons, variant, classNamePosterHomePage } =
    props

  const {
    data: movieOrSeries,
    isLoading,
    isError,
  } = useQuery<IResponseApiMovie[]>({
    queryKey: ['movieOrSeriesByHero'],
    queryFn: async () => {
      const response =
        await kinopoiskAPI.getMoviesSortedByBackdropAndTopMovies()
      return response.docs
    },
  })

  const sliderPrev = useRef<HTMLDivElement>(null)
  const sliderNext = useRef<HTMLDivElement>(null)
  const sliderPagination = useRef<HTMLDivElement>(null)

  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const [slider, setSlider] = useState<null | SwiperType>(null)
  const currentSlideRef = useRef<number>(0)
  const tablet = window.innerWidth

  const handleSlideChange = (slideIndex: number) => {
    currentSlideRef.current = slideIndex
    slider?.slideTo(slideIndex)
  }
  const favoriteMovie = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser() //проверка наличия пользоателя из локального храниллища(там лежит jwt)
    if (!user) {
      toast.info(
        <div className={cl.toastShow}>
          <p>Пожалуйста </p>
          <a
            href="/auth"
            style={{ color: '#3b82f6', textDecoration: 'underline' }}
          >
            <p>войдите</p>
          </a>
          <p>или</p>
          <a
            href="/auth"
            style={{ color: '#3b82f6', textDecoration: 'underline' }}
          >
            <p>зарегистрируйтесь</p>
          </a>{' '}
          <p> в приложении </p>
        </div>,
        {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          transition: Bounce,
        },
      )
      return
    }
    const { data, error } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', user.id)
      .eq('movie_id', movieData.id)
      .maybeSingle()
    if (error) {
      console.log(error)
    }

    const isCurrentlyFavorite = !!data
    try {
      if (isCurrentlyFavorite) {
        await supabase
          .from('favorites')
          .delete()
          .eq('id', data.id)
          .eq('user_id', user.id)
      } else {
        const { error: insertError } = await supabase.from('favorites').insert({
          user_id: user.id,
          movie_id: movieData.id,
        })
        if (insertError) throw insertError
      }
      setIsFavorite(!isCurrentlyFavorite)
    } catch (error) {
      console.error(error)
    }
  }

  const getFirstEpisode = () => {
    if (!seasons?.length) return null
    console.log(seasons)

    const normalSeason = seasons?.filter((season) => season.number > 0)
    console.log('Нормальные сезоны:', normalSeason)

    const sortedSeasons = [...normalSeason].sort((a, b) => a.number - b.number)
    console.log('Отсортированные сезоны:', sortedSeasons)

    const firstSeasons = sortedSeasons[0]
    console.log('Первый сезон:', firstSeasons)

    if (!firstSeasons?.episodes?.length) return null
    console.log('Эпизоды первого сезона:', firstSeasons.episodes)

    const sortedEpisode = [...firstSeasons.episodes].sort(
      (a, b) => a.number - b.number,
    )
    console.log('Отсортированные эпизоды:', sortedEpisode)

    const result = sortedEpisode[0]
    console.log('Первая серия:', result)
    return result
  }
  const handlePlay = () => {
    if (movieData?.type === 'tv-series') {
      const firstEpisode = getFirstEpisode()
      onPlayClick(firstEpisode)
    } else {
      onPlayClick()
    }
  }

  return (
    <div>
      <div
        className={clsx(cl.heroContainer, {
          [cl.heroContainerHome]: variant === 'HomePage',
        })}
      >
        {(() => {
          switch (variant) {
            case 'HomePage':
              return (
                <div>
                  <div className={cl.heroWrapper}>
                    <img
                      src={'../public/content.png'}
                      alt="poster"
                      className={clsx(cl.heroPoster, classNamePosterHomePage)}
                    />
                    <div className={cl.buttonContainer}>
                      <ButtonIcon
                        className={cl.heroPosterButton}
                        onClick={() => {}}
                        label={<PlayButton />}
                      />
                    </div>
                  </div>
                  <div className={cl.heroContentHomePage}>
                    <div className={cl.heroHeaderHomePage}>
                      <h1 className={cl.heroTitleHomePage}>
                        The Best Streaming Experience
                      </h1>
                      <div className={cl.heroDescriptionHomePage}>
                        <p>
                          StreamVibe is the best streaming experience for
                          watching your favorite movies and shows on demand,
                          anytime, anywhere. With StreamVibe, you can enjoy a
                          wide variety of content, including the latest
                          blockbusters, classic movies, popular TV shows, and
                          more. You can also create your own watchlists, so you
                          can easily find the content you want to watch.
                        </p>
                      </div>
                    </div>
                    <MainButton
                      label={
                        <div className={cl.playIconHeroSection}>
                          <PlayIcon />
                          <p>Start Watching Now</p>
                        </div>
                      }
                      onClick={() => {}}
                    />
                  </div>
                </div>
              )
            case 'MoviesAndShowsPage':
              return (
                <div className={cl.heroSlider}>
                  {isLoading && <> Идет Загрузка...</>}
                  {isError && <>Ошибка данных</>}
                  <Slider
                    onSwiper={setSlider}
                    onSlideChange={handleSlideChange}
                    slidesPerView={1}
                    navigation={{
                      prevEl: sliderPrev.current,
                      nextEl: sliderNext.current,
                    }}
                    pagination={{
                      el: sliderPagination.current,
                      type: 'bullets',
                      clickable: true,
                      bulletClass: 'swiper-pagination-bullet',
                      bulletActiveClass: 'swiper-pagination-bullet-active',
                    }}
                    items={movieOrSeries}
                    renderItem={(movie) => (
                      <div>
                        <img
                          className={cl.heroSliderImg}
                          src={movie?.backdrop?.url}
                          alt="poster"
                        />
                        <div>
                          {tablet <= 1280 && (
                            <div className={cl.gradientOverlay}></div>
                          )}
                          {tablet <= 1280 && tablet > 1024 && (
                            <div className={cl.contentOverlay}>
                              <div className={cl.heroContentHeader}>
                                <h3 className={cl.heroPosterTitle}>
                                  {movie?.name}
                                </h3>
                                <p className={cl.heroPosterDescription}>
                                  {movie?.description}
                                </p>
                              </div>
                              <div className={cl.heroButton}>
                                <MainButton
                                  onClick={() => {
                                    handlePlay()
                                  }}
                                  label={
                                    <div className={cl.playIconHeroSection}>
                                      <PlayIcon />
                                      <span>Play Now</span>
                                    </div>
                                  }
                                />
                                <ButtonIcon
                                  className={cl.HeroIconButton}
                                  label={<AddIcon />}
                                />

                                <ButtonIcon
                                  onClick={favoriteMovie}
                                  className={cl.HeroIconButton}
                                  label={
                                    <LikeIcon
                                      className={
                                        isFavorite
                                          ? `${cl.likeButtonActive}`
                                          : `${cl.likeButton}`
                                      }
                                    />
                                  }
                                />
                                <ButtonIcon
                                  className={cl.HeroIconButton}
                                  label={<SoundIcon />}
                                />
                              </div>
                            </div>
                          )}
                          {tablet <= 1024 && (
                            <div className={cl.contentOverlay}>
                              <h3 className={cl.heroPosterTitle}>
                                {movie?.name}
                              </h3>
                              <div className={cl.heroButton}>
                                <div>
                                  <MainButton
                                    onClick={() => {
                                      handlePlay()
                                    }}
                                    label={
                                      <div className={cl.playIconHeroSection}>
                                        <PlayIcon />
                                        <span>Play Now</span>
                                      </div>
                                    }
                                  />
                                </div>
                                <ButtonIcon
                                  className={cl.HeroIconButton}
                                  label={<AddIcon />}
                                />

                                <ButtonIcon
                                  onClick={favoriteMovie}
                                  className={cl.HeroIconButton}
                                  label={
                                    <LikeIcon
                                      className={
                                        isFavorite
                                          ? `${cl.likeButtonActive}`
                                          : `${cl.likeButton}`
                                      }
                                    />
                                  }
                                />

                                <ButtonIcon
                                  className={cl.HeroIconButton}
                                  label={<SoundIcon />}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  />
                  {tablet >= 1024 && (
                    <div className={cl.heroSliderPagination}>
                      <div className="slider-prev" ref={sliderPrev}>
                        <ButtonIcon
                          className={cl.buttonNavigation}
                          label={
                            <ArrowLeft
                              className={cl.buttonNavigationArrowLeft}
                            />
                          }
                        />
                      </div>
                      <div
                        className={cl.swiperPagination}
                        ref={sliderPagination}
                      ></div>
                      <div className="slider-next" ref={sliderNext}>
                        <ButtonIcon
                          className={cl.buttonNavigation}
                          label={
                            <ArrowRight className={cl.buttonNavigationArrow} />
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              )
            default:
              return (
                <div>
                  <div className={cl.heroWrapper}>
                    <img
                      src={movieData.backdrop?.url || '../public/content.png'}
                      alt="poster"
                      className={clsx(cl.heroPoster, classNamePosterHomePage)}
                    />
                  </div>
                  <div className={cl.heroContent}>
                    <div className={`container ${cl.heroContentInner}`}>
                      <div className={cl.heroContentHeader}>
                        <h3 className={cl.heroPosterTitle}>
                          {movieData?.name}
                        </h3>
                        <p className={cl.heroPosterDescription}>
                          {movieData?.description}
                        </p>
                      </div>
                      <div className={cl.heroButton}>
                        <MainButton
                          onClick={() => {
                            handlePlay()
                          }}
                          label={
                            <div className={cl.playIconHeroSection}>
                              <PlayIcon />
                              <span>Play Now</span>
                            </div>
                          }
                        />
                        <ButtonIcon
                          className={cl.HeroIconButton}
                          label={<AddIcon />}
                        />

                        <ButtonIcon
                          onClick={favoriteMovie}
                          className={cl.HeroIconButton}
                          label={
                            <LikeIcon
                              className={
                                isFavorite
                                  ? `${cl.likeButtonActive}`
                                  : `${cl.likeButton}`
                              }
                            />
                          }
                        />

                        <ButtonIcon
                          className={cl.HeroIconButton}
                          label={<SoundIcon />}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
          }
        })()}
      </div>
    </div>
  )
}

export default Hero
