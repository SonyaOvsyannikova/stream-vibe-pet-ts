import AddIcon from "@/assets/icons/add.svg?react"
import LikeIcon from "@/assets/icons/like.svg?react"
import SoundIcon from "@/assets/icons/sound.svg?react"
import PlayIcon from "@/assets/icons/play.svg?react"
import ButtonIcon from "@/shared/ui/ButtonIcon";
import MainButton from "@/shared/ui/MainButton";
import cl from './Hero.module.scss'
import { useEffect, useState } from "react";
import { IResponseApiMovie, IResponseApiSeasons, IResponseApiEpisodeData } from "@/shared/types";

interface Props {
    movieData: IResponseApiMovie;
    id: string;
    onPlayClick?: (episode?: IResponseApiEpisodeData, index?: number) => void;
    seasons: IResponseApiSeasons[];
}

const Hero = (props: Props) => {

    const {
        movieData,
        id,
        onPlayClick,
        seasons
    } = props

    const [isFavorite, setIsFavorite] = useState<boolean>(false)


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

        <div className='container'>
            <div className={cl.heroContainer}>
                {movieData && (
                    <img
                        src={movieData.backdrop?.url || '../public/content.png'}
                        alt="poster"
                        className={cl.heroPoster}
                    />
                )}

                {movieData && (
                    <div className={cl.heroContent}>
                        <div className={`container ${cl.heroContentInner}`}>
                            <div className={cl.heroContentHeader}>
                                <h3 className={cl.heroPosterTitle}>{movieData.name}</h3>
                                <p className={cl.heroPosterDescription}>{movieData.description}</p>
                            </div>
                            <div className={cl.heroButton}>
                                <MainButton
                                    onClick = {() => {
                                       handlePlay()
                                    }}
                                    label={<div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            flexDirection: "row",
                                            columnGap: "4px",
                                        }}>
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
                )}
            </div>
        </div>
    );
};

export default Hero;