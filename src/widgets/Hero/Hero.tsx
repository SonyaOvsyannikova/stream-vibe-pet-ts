import AddIcon from "@/assets/icons/add.svg?react"
import LikeIcon from "@/assets/icons/like.svg?react"
import SoundIcon from "@/assets/icons/sound.svg?react"
import PlayIcon from "@/assets/icons/play.svg?react"
import ArrowRight from '@/assets/icons/arrowRight.svg?react'
import ArrowLeft from '@/assets/icons/arrowLeft.svg?react'
import ButtonIcon from "@/shared/ui/ButtonIcon";
import MainButton from "@/shared/ui/MainButton";
import cl from './Hero.module.scss'
import { useEffect, useState } from "react";
import { IResponseApiMovie, IResponseApiSeasons, IResponseApiEpisodeData } from "@/shared/types";
import clsx from "clsx";
import Slider from "@/shared/ui/Slider";
import { SwiperSlide } from "swiper/react";
import {Swiper as SwiperType} from "swiper";
import Pagination from "@/shared/ui/Pagination";
import PlayButton from '@/assets/icons/playButtonOnHero.svg?react'

type HeroProps = {
    movieData?: IResponseApiMovie;
    id?: string;
    onPlayClick?: (episode?: IResponseApiEpisodeData, index?: number) => void;
    seasons?: IResponseApiSeasons[];
    variant: 'default' | 'HomePage' | 'MoviesAndShowsPage' ;
    classNamePosterHomePage?: string;
    movieOrSeries?: IResponseApiMovie[];
}

const Hero = (props: HeroProps) => {

    const {
        movieData,
        id,
        onPlayClick,
        seasons,
        variant,
        classNamePosterHomePage,
        movieOrSeries
    } = props

    const [isFavorite, setIsFavorite] = useState<boolean>(false)
    const [slider, setSlider] = useState<null | SwiperType>(null);
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    let tablet = window.innerWidth

    const handleSlideChange = (slideIndex: number):void => {
        setCurrentSlide(slideIndex);
        slider?.slideTo(slideIndex);
    }


    const favoriteMovie = () => {
        const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovie')) || [];
        if(favoriteMovies.includes(id)) {
            const updateData = favoriteMovies.filter(movieId => movieId !== id)
            localStorage.setItem('favoriteMovie', JSON.stringify(updateData))
            setIsFavorite(false)
            console.log(updateData)
        } else {
            favoriteMovies.push(id)
            localStorage.setItem('favoriteMovie', JSON.stringify(favoriteMovies))
            setIsFavorite(true)
        }
    }
    useEffect(() => {
        const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovie')) || [];
        const isFavoriteMovies = favoriteMovies.includes(id)
        setIsFavorite(isFavoriteMovies)
    }, [id])

    const getFirstEpisode = () => {
        if(!seasons?.length) return null
        console.log(seasons)

        const normalSeason = seasons?.filter(season => season.number > 0)
        console.log('Нормальные сезоны:', normalSeason)

        const sortedSeasons = [...normalSeason].sort((a, b) => a.number - b.number)
        console.log('Отсортированные сезоны:', sortedSeasons)


        const firstSeasons = sortedSeasons[0]
        console.log('Первый сезон:', firstSeasons)

        if(!firstSeasons?.episodes?.length) return null
        console.log('Эпизоды первого сезона:', firstSeasons.episodes)

        const sortedEpisode = [...firstSeasons.episodes].sort((a, b) => a.number - b.number)
        console.log('Отсортированные эпизоды:', sortedEpisode)

        const result = sortedEpisode[0]
        console.log('Первая серия:', result)
        return result
    }
    const handlePlay = () => {
        if(movieData?.type === 'tv-series' ) {
            const firstEpisode = getFirstEpisode()
            onPlayClick(firstEpisode)
        } else {
            onPlayClick()
        }
    }



    return (

        <div>
            <div className={clsx(cl.heroContainer, {
                [cl.heroContainerHome]: variant === 'HomePage'
            })}>
                {
                    (() => {
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
                                                <p>StreamVibe is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere. With StreamVibe, you can enjoy a wide variety of content, including the latest blockbusters, classic movies, popular TV shows, and more. You can also create your own watchlists, so you can easily find the content you want to watch.</p>
                                            </div>
                                        </div>
                                        <MainButton
                                            label={
                                                <div className={cl.playIconHeroSection}>
                                                    <PlayIcon />
                                                    <p>Start Watching Now</p>
                                                </div> }
                                            onClick={() => {}}
                                        />
                                    </div>
                                </div>

                            )
                        case 'MoviesAndShowsPage':
                            return (
                                <div className={cl.heroSlider}>
                                        <Slider
                                            onSwiper={setSlider}
                                            onSlideChange={handleSlideChange}
                                            slidesPerView={1}
                                        items={movieOrSeries}
                                        renderItem={(movie, index) => (
                                            <div>
                                                <img
                                                    className={cl.heroSliderImg}
                                                    src={movie?.backdrop?.url} alt="poster" />
                                                <div>
                                                    {tablet <= 1280 && (
                                                        <div className={cl.gradientOverlay}></div>
                                                    )}
                                                    {tablet <= 1280 && tablet > 1024 && (
                                                        <div className={cl.contentOverlay}>
                                                            <div className={cl.heroContentHeader}>
                                                                <h3 className={cl.heroPosterTitle}>{movie?.name}</h3>
                                                                <p className={cl.heroPosterDescription}>{movie?.description}</p>
                                                            </div>
                                                            <div className={cl.heroButton}>
                                                                <MainButton
                                                                    onClick = {() => {
                                                                        handlePlay()
                                                                    }}
                                                                    label={<div className={cl.playIconHeroSection}>
                                                                        <PlayIcon />
                                                                        <span>Play Now</span>
                                                                    </div>} >
                                                                </MainButton>
                                                                <ButtonIcon
                                                                    className={cl.HeroIconButton}
                                                                    label={<AddIcon />}>
                                                                </ButtonIcon>

                                                                <ButtonIcon
                                                                    onClick={favoriteMovie}
                                                                    className={cl.HeroIconButton}
                                                                    label={<LikeIcon className={isFavorite ? `${cl.likeButtonActive}` : `${cl.likeButton}` } />}>
                                                                </ButtonIcon>

                                                                <ButtonIcon
                                                                    className={cl.HeroIconButton}
                                                                    label={<SoundIcon />}>
                                                                </ButtonIcon>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {tablet <= 1024 && (
                                                        <div className={cl.contentOverlay}>
                                                            <h3 className={cl.heroPosterTitle}>{movie?.name}</h3>
                                                            <div className={cl.heroButton}>
                                                                <div>
                                                                    <MainButton
                                                                        onClick = {() => {
                                                                            handlePlay()
                                                                        }}
                                                                        label={<div className={cl.playIconHeroSection}>
                                                                            <PlayIcon />
                                                                            <span>Play Now</span>
                                                                        </div>} >
                                                                    </MainButton>
                                                                </div>
                                                                <ButtonIcon
                                                                    className={cl.HeroIconButton}
                                                                    label={<AddIcon />}>
                                                                </ButtonIcon>

                                                                <ButtonIcon
                                                                    onClick={favoriteMovie}
                                                                    className={cl.HeroIconButton}
                                                                    label={<LikeIcon className={isFavorite ? `${cl.likeButtonActive}` : `${cl.likeButton}` } />}>
                                                                </ButtonIcon>

                                                                <ButtonIcon
                                                                    className={cl.HeroIconButton}
                                                                    label={<SoundIcon />}>
                                                                </ButtonIcon>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}>
                                        </Slider>
                                    {tablet >= 1024 && (
                                        <div className={cl.heroSliderPagination}>
                                            <ButtonIcon
                                                className={cl.buttonIcon}
                                                label={<ArrowLeft
                                                    className={cl.buttonArrow}/>}
                                                onClick={() => {slider.slidePrev()}}
                                            ></ButtonIcon>
                                            <Pagination
                                                currentSlide={currentSlide}
                                                totalSlides={movieOrSeries.length}
                                                onSlideChange={handleSlideChange} />
                                            <ButtonIcon
                                                className={cl.buttonIcon}
                                                label={<ArrowRight
                                                    className={cl.buttonArrow}/>}
                                                onClick={() =>  {
                                                    slider.slideNext()
                                                }}></ButtonIcon>
                                        </div>
                                    )}
                                </div>
                            )
                        default:
                            return (
                                <div>
                                    {movieData &&
                                        <div className={cl.heroWrapper}>
                                        <img
                                            src={movieData.backdrop?.url || '../public/content.png'}
                                            alt="poster"
                                            className={clsx(cl.heroPoster, classNamePosterHomePage)}
                                        />
                                        </div>
                                    }

                                    <div className={cl.heroContent}>
                                        <div className={`container ${cl.heroContentInner}`}>
                                            <div className={cl.heroContentHeader}>
                                                <h3 className={cl.heroPosterTitle}>{movieData?.name}</h3>
                                                <p className={cl.heroPosterDescription}>{movieData?.description}</p>
                                            </div>
                                            <div className={cl.heroButton}>
                                                <MainButton
                                                    onClick = {() => {
                                                        handlePlay()
                                                    }}
                                                    label={<div className={cl.playIconHeroSection}>
                                                        <PlayIcon />
                                                        <span>Play Now</span>
                                                    </div>} >
                                                </MainButton>
                                                <ButtonIcon
                                                    className={cl.HeroIconButton}
                                                    label={<AddIcon />}>
                                                </ButtonIcon>

                                                <ButtonIcon
                                                    onClick={favoriteMovie}
                                                    className={cl.HeroIconButton}
                                                    label={<LikeIcon className={isFavorite ? `${cl.likeButtonActive}` : `${cl.likeButton}` } />}>
                                                </ButtonIcon>

                                                <ButtonIcon
                                                    className={cl.HeroIconButton}
                                                    label={<SoundIcon />}>
                                                </ButtonIcon>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )
                    }
                })()}
            </div>
        </div>
    );
};

export default Hero;