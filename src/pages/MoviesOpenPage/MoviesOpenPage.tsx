import Hero from "@/widgets/Hero";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {kinopoiskAPI} from "@/shared/api/сlient.js";
import MovieCard from "@/widgets/MovieCard";
import PlayerMovie from "@/shared/ui/PlayerMovie/PlayerMovie.tsx";

import {
    IResponseApiMovie,
    IResponseApiSeasons,
    IResponseApiReview,
    IResponseApiEpisodeData ,
    SelectedEpisode
} from "@/shared/types";


const MoviesOpenPage = () => {

    const [movieData, setMovieData] = useState<null | IResponseApiMovie>(null);
    const [seasons, setSeasons] = useState<IResponseApiSeasons[] | null>(null);
    const [reviews, setReviews] = useState<IResponseApiReview[]>([]);
    const [isOpenPlayer, setIsOpenPlayer] = useState<boolean>(false)
    const [selectedEpisodes, setSelectedEpisodes] = useState<SelectedEpisode>(null);
    const [firstEpisode, setFirstEpisode] = useState<null | IResponseApiSeasons>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const params = useParams();
    const id: string = params.id;



    useEffect(() => {

        const fetchMovie = async () => {
            try {
                const response = await kinopoiskAPI.getMoviesId(id)
                setMovieData(response);
                console.log(response);
            }
            catch(error) {
                console.log(error);
            }
        }
        fetchMovie();
    }, [id])

    useEffect(() => {

        const getSeasonInfo = async () => {

            try {
                const response = await kinopoiskAPI.getSeasons(id)
                setSeasons(response.docs)
                console.log( response.docs);
            }
            catch (error) {
                console.log(error);
            }
        }
        getSeasonInfo()

    }, [id]);

    useEffect(() => {
        if(id) {
            const getReview = async () => {
                setIsLoading(true);
                try {
                    const reviewData = await kinopoiskAPI.getReviewedMovies(id)
                    setReviews(reviewData.docs)
                    console.log(reviewData.docs)
                }
                catch(e) {
                    console.log(e)
                }

            }
            getReview()
        }

    }, [id])



    const handlePlaySeriesOrMovie = (episode?: IResponseApiEpisodeData, index?: number): void => {
        if(movieData?.type === 'tv-series') {
            if(episode === undefined || episode === null) {
                setIsOpenPlayer(false)
                return
            }
            setSelectedEpisodes({
                episode:episode,
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



    return (
        <div className='container'>
            {isOpenPlayer ?
                <PlayerMovie
                    selectedEpisodes={selectedEpisodes}
                    movieData={movieData}
                    />
                :
                <Hero
                variant={'default'}
                movieData={movieData}
                id={id}
                seasons={seasons}
                onPlayClick={handlePlaySeriesOrMovie}
                />
            }
            <MovieCard
            movieData={movieData}
            seasons={seasons}
            reviews={reviews}
            isOpenPlayer = {isOpenPlayer}
            setIsOpenPlayer={setIsOpenPlayer}
            selectedEpisodes={selectedEpisodes}
            setSelectedEpisodes={setSelectedEpisodes}
            onPlayClick={handlePlaySeriesOrMovie}/>
        </div>
    );
};

export default MoviesOpenPage;