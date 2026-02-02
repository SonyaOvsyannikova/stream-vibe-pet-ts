import cl from './SerialCard.module.scss'
import ButtonIcon from '@/shared/ui/ButtonIcon'
import PlayButton from '@/assets/icons/playSerialIcon.svg?react'
import TimeSeries from '@/assets/icons/time.svg?react'
import { useRef } from 'react'
import { IResponseApiEpisodeData, IResponseApiSeasons } from '@/shared/types'

type SerialCardProps = {
  episodes: IResponseApiSeasons['episodes']
  onPlayClick?: (episode?: IResponseApiEpisodeData, index?: number) => void
}

const SerialCard = (props: SerialCardProps) => {
  const { episodes, onPlayClick } = props

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const handleMouseEnter = (index: number) => {
    const video = videoRefs.current[index]
    if (video && video.paused) {
      video.play()
    }
  }
  const handleMouseLeave = (index: number) => {
    const video = videoRefs.current[index]
    if (video && !video.paused) {
      video.pause()
    }
  }

  return (
    <div className={cl.serialSection} role="definition">
      {episodes
        ?.sort((a, b) => a.number - b.number)
        ?.map((episode, index) => (
          <div key={episode.number} className={cl.serialCard}>
            <h4 className={cl.episodeNumber}>
              {episode.number < 10 ? `0${episode.number}` : episode.number}
            </h4>
            <div
              className={cl.imageContainer}
              onMouseEnter={() => {
                handleMouseEnter(index)
              }}
              onMouseLeave={() => {
                handleMouseLeave(index)
              }}
            >
              <video
                ref={(el) => {
                  if (el) videoRefs.current[index] = el
                }}
                className={cl.previewSerias}
                poster={episode?.still?.previewUrl}
                src="/planet.mp4"
              />
              <ButtonIcon
                onClick={() => {
                  console.log('Выбран: ', episode)
                  onPlayClick(episode, index)
                }}
                label={<PlayButton />}
                className={cl.playButton}
              />
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
}

export default SerialCard
