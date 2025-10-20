import Hero from "@/widgets/Hero";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {kinopoiskAPI} from "@/shared/api/сlient";
import MovieCard from "@/widgets/MovieCard";
import PlayerMovie from "@/shared/ui/PlayerMovie/PlayerMovie";

const MoviesOpenPage = () => {

    const [movieData, setMovieData] = useState(null);
    const [seasons, setSeasons] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [isOpenPlayer, setIsOpenPlayer] = useState(false)
    const [selectedEpisodes, setSelectedEpisodes] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const params = useParams();
    const id = params.id;


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

    }, [])

    const handlePlaySeriesOrMovie = (episode, index) => {
        if(movieData?.type === 'tv-series') {
            setSelectedEpisodes({
                episode: episode,
                episodeIndex: index,
            })
        } else {
            setSelectedEpisodes({
               episode: {
                   name: movieData?.name,
                   id: movieData?.id,
               },
               episodeIndex: 0,
            })
        }
        setIsOpenPlayer(true)
    }



    return (
        <div>
            {isOpenPlayer ?
                <PlayerMovie
                    selectedEpisodes={selectedEpisodes}
                    setSelectedEpisodes={setSelectedEpisodes}
                    movieData={movieData}
                    />
                :
                <Hero
                movieData={movieData}
                id={id}
                setMovieData={setMovieData}
                isOpenPlayer = {isOpenPlayer}
                setIsOpenPlayer={setIsOpenPlayer}
                onPlayClick={() => handlePlaySeriesOrMovie()}
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