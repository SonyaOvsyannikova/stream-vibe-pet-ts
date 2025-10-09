import {useEffect, useState} from "react";
import {kinopoiskAPI} from "@/shared/api/сlient";
import {useParams} from "react-router-dom";
import AddIcon from "@/assets/icons/add.svg?react"
import LikeIcon from "@/assets/icons/like.svg?react"
import SoundIcon from "@/assets/icons/sound.svg?react"
import PlayIcon from "@/assets/icons/play.svg?react"
import ButtonIcon from "@/shared/ui/ButtonIcon";
import MainButton from "@/shared/ui/MainButton";
import cl from './Hero.module.scss'

const Hero = (props) => {
    const {
        movieData,
        setMovieData
    } = props

    return (
        <div className='container'>
            <div>
                {movieData ? (
                    <div >
                        <img src={movieData.backdrop?.url ? movieData.backdrop?.url : '../public/content.png'} alt="poster"
                             className={cl.heroPoster}
                        />
                        <h4>{movieData.name}</h4>
                        <p>{movieData.description}</p>
                    </div>
                ) : null}
            </div>
            <div className={cl.heroButton}>
                <MainButton
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
                    className={cl.HeroIconButton}
                    label={<LikeIcon />}>
                </ButtonIcon>

                <ButtonIcon
                    className={cl.HeroIconButton}
                    label={<SoundIcon />}>
                </ButtonIcon>

            </div>
        </div>
    );
};

export default Hero;