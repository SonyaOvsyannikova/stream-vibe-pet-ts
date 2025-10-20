
import AddIcon from "@/assets/icons/add.svg?react"
import LikeIcon from "@/assets/icons/like.svg?react"
import SoundIcon from "@/assets/icons/sound.svg?react"
import PlayIcon from "@/assets/icons/play.svg?react"
import ButtonIcon from "@/shared/ui/ButtonIcon";
import MainButton from "@/shared/ui/MainButton";
import cl from './Hero.module.scss'
import {useEffect, useState} from "react";
import PlayerMovie from "@/shared/ui/PlayerMovie/PlayerMovie";

const Hero = (props) => {

    const {
        movieData,
        id,
        isOpenPlayer,
        setIsOpenPlayer,
    } = props

    const [isFavorite, setIsFavorite] = useState(false)


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
                                        console.log(isOpenPlayer)
                                        setIsOpenPlayer(true)
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