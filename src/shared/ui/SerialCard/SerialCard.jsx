import cl from './SerialCard.module.scss'
import ButtonIcon from "@/shared/ui/ButtonIcon";
import PlayButton from '@/assets/icons/playSerialIcon.svg?react'
import TimeSeries from '@/assets/icons/time.svg?react'
import {useEffect, useRef, useState} from "react";


const SerialCard = (props) => {

    const {
        episodes,
        onPlayClick,
    } = props

    const videoRefs = useRef([]);

    const handleMouseEnter = (index) => {
        const video = videoRefs.current[index];
        if(video && video.paused) {
            video.play()
        }
    }
    const handleMouseLeave = (index) => {
        const video = videoRefs.current[index];
        if(video && video.played) {
            video.pause()
        }
    }


    return (
            <div className={cl.serialSection}
            role='definition'>
                {episodes
                    .sort((a, b) => a.number - b.number)
                    .map((episode, index) => (
                    <div key={episode.number}
                    className={cl.serialCard}>
                        <h4
                        className={cl.episodeNumber}>{episode.number < 10 ? `0${episode.number}` : episode.number}</h4>
                        <div className={cl.imageContainer}
                        onMouseEnter={() => {
                            handleMouseEnter(index)
                        }}
                        onMouseLeave={() => {
                            handleMouseLeave(index)
                        }}>
                                <video
                                    ref={el => videoRefs.current[index] = el}
                                    className={cl.previewSerias}
                                    poster={episode?.still?.previewUrl}
                                    src='/planet.mp4'
                                />
                            <ButtonIcon

                            onClick={() => {
                                console.log("Выбран: ", episode);
                                onPlayClick(episode, index);
                            }}
                            label={<PlayButton />}
                            className={cl.playButton}/>
                        </div>
                        <div className={cl.seriesContainer}>
                            <div className={cl.seriesHeader}>
                                <h5 className={cl.seriesTitle}>{episode.name}</h5>
                                <div className={cl.seriesDuration}>
                                    <TimeSeries />
                                    <p>50 min</p>
                                </div>
                            </div>
                            <p className={cl.seriesBody}>{episode.description}</p>
                        </div>
                    </div>
                ))}

            </div>
    )
};

export default SerialCard;