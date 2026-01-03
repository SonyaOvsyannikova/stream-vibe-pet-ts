import cl from './MoviesCard.module.scss'
import  { Movie } from '@/shared/hooks/useMovie.ts'
import Time from '@/assets/icons/timer.svg?react'
import Eyes from '@/assets/icons/Eyes.svg?react'
import SeasonIcon from '@/assets/icons/seasonIcon.svg?react'
import { IResponseApiMovie } from "@/shared/types";
import Ratings from "@/shared/ui/Ratings";
import ratings from "@/shared/ui/Ratings";

type MoviesCardProps = {
    movieData?: Movie,
    variant: 'Trending Now' | 'New Releases' | 'Must - Watch Movies' | 'Trending Shows Now' | 'New Released Shows' | 'Must - Watch Shows',
}

const formatNumberRu = (value: number): string => {
    const abs = Math.floor(Math.abs(value));
    const str = abs.toString();


    const firstThree = str.slice(0, 3);


    let tmp = abs;
    let kCount = 0;

    while (tmp >= 1000) {
        tmp = Math.floor(tmp / 1000);
        kCount++;
    }

    if (kCount === 0) {
        return str;
    }

    const suffix = 'к'.repeat(kCount);

    return `${firstThree}${suffix}`;
};
const getDurationHM = (movieData?: Movie) => {
    const seriesLength = movieData?.seriesLength ?? 0;
    const regularSeasons = movieData?.seasonsInfo?.filter(season => season?.number != 0) || [];


    const episodes = regularSeasons?.reduce((sum, season) => {
        return sum + season.episodesCount
    }, 0) ?? 0;

    const totalMinutes = seriesLength * episodes;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);

    return { hours, minutes };
};



const MoviesCard = (props: MoviesCardProps) => {

    const {
        movieData,
        variant
    } = props;

    const { hours, minutes } = getDurationHM(movieData);
    const hour = Math.floor(movieData.movieLength / 60)
    const minute = movieData.movieLength % 60

    return (

        <div className={cl.moviesCard}>
            {variant === 'Trending Now' && (
                <div className={cl.moviesCardTrendingNow}>
                    <div className={cl.moviesCardTrendingNowImg}>
                        <img
                            src={movieData?.poster?.previewUrl}
                            alt={movieData?.name}
                            key={movieData?.id}
                            className={cl.moviesCardImg}
                        />
                    </div>
                    <div className={cl.movieCardBody} >
                        <div className={cl.movieCardLength}>
                            <Time className={cl.movieCardTimeIcon}/>
                            <p className={cl.movieCardDescription}>{hour}h {minute}min</p>
                        </div>
                        <div className={cl.movieCardRating}>
                            <Eyes />
                            <p className={cl.movieCardDescription}>{movieData?.rating?.kp.toFixed(1)} </p>
                        </div>
                    </div>
                </div>
            )}
            {variant === 'New Releases' && (
                <>
                    <div>
                        <img src={movieData?.poster?.previewUrl}
                             alt={movieData?.name}
                             key={movieData?.id}
                             className={cl.moviesCardImg} />
                    </div>
                    <div className={cl.movieCardReleased}>
                        <p className={cl.movieCardDescription}>{`Released at ${movieData?.year} year`}</p>
                    </div>
                </>
            )}
            {
                variant === 'Must - Watch Movies' && (
                    <>
                        <div>
                            <img src={movieData?.poster?.previewUrl}
                                 alt={movieData?.name}
                                 key={movieData?.id}
                                 className={cl.moviesCardImg} />
                        </div>
                        <div className={cl.movieCardBody} >
                            <div className={cl.movieCardLength}>
                                <Time className={cl.movieCardTimeIcon}/>
                                <p className={cl.movieCardDescription}>{hour}h {minute}min</p>
                            </div>
                            <div className={cl.movieCardLength}>
                                <Ratings
                                    totalStars={5}
                                    classNameStars={cl.movieCardRatingStar}
                                    ratingValue={movieData?.rating?.kp} />
                                <p className={cl.movieCardDescription}>{movieData?.rating?.kp}</p>
                            </div>
                        </div>
                    </>
                )
            }

            {variant === 'New Released Shows' && (
                <>
                    <div>
                        <img src={movieData?.poster?.previewUrl}
                             alt={movieData?.name}
                             key={movieData?.id}
                             className={cl.moviesCardImg} />
                    </div>
                    <div className={cl.movieCardBody}>
                        <div className={cl.movieCardLength}>
                            <Time className={cl.movieCardTimeIcon}/>
                            <p className={cl.movieCardDescription}>
                                {hours}h {minutes}min
                            </p>
                        </div>
                        <div className={cl.movieCardLength}>
                            <SeasonIcon />
                            <p className={cl.movieCardDescription}>{movieData?.seasonsInfo?.length} Season</p>
                        </div>
                    </div>

                </>
            )}
            {variant === 'Trending Shows Now' && (
                <>
                    <div>
                        <img src={movieData?.poster?.previewUrl}
                             alt={movieData?.name}
                             key={movieData?.id}
                             className={cl.moviesCardImg} />
                    </div>

                    <div className={cl.movieCardBody} >
                        <div className={cl.movieCardLength}>
                            <Time className={cl.movieCardTimeIcon}/>
                            <p className={cl.movieCardDescription}>
                                {hours}h {minutes}min
                            </p>
                        </div>
                        <div className={cl.movieCardLength}>
                            <SeasonIcon />
                            <p className={cl.movieCardDescription}>{movieData?.seasonsInfo?.length} Season</p>
                        </div>
                    </div>


                </>
            )}
            {variant === 'Must - Watch Shows' && (
                <>
                    <div>
                        <img src={movieData?.poster?.previewUrl}
                             alt={movieData?.name}
                             key={movieData?.id}
                             className={cl.moviesCardImg} />
                    </div>
                    <div className={cl.movieCardBody} >
                        <div className={cl.movieCardLength}>
                            <Time className={cl.movieCardTimeIcon}/>
                            <p className={cl.movieCardDescription}>
                                {hours}h {minutes}min
                            </p>
                        </div>
                        <div className={cl.movieCardLength}>
                            <Ratings
                                totalStars={5}
                                classNameStars={cl.movieCardRatingStar}
                                ratingValue={movieData?.rating?.kp} />
                            <p className={cl.movieCardDescription}>
                                {formatNumberRu(movieData?.votes?.kp ?? 0)}
                            </p>
                        </div>
                    </div>

                </>
            )}
        </div>
    );
};

export default MoviesCard;