const PlayerMovie = (props) => {

    const {
        selectedEpisodes,
        movieData
    } = props;

    return (
        <div className='container'>
            {selectedEpisodes && (
                <div style={{ display: 'flex', flexDirection: 'row', columnGap: '10px' }}>
                        <h6>Сейчас воспроизводится:</h6>
                        <p>Эпизод {selectedEpisodes.episode?.number}: {selectedEpisodes.episode?.name}</p>
                </div>
            )}
            <video
                    controls
                    style={{ width: '100%'}}
                    src={movieData?.type === 'tv-series' ? '/planet.mp4' : '/planet_one.mp4'}
                >
            </video>
        </div>
    );
};

export default PlayerMovie;