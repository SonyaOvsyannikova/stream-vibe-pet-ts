import cl from './SerialCard.module.scss'
const SerialCard = (props) => {

    const {
        episodes,
        posters,
        duration,
    } = props


    return (
            <div className={cl.serialSection}>
                {episodes.map((episode) => (
                    <div key={episode.number}
                    className={cl.serialCard}>
                        <h3>{episode.number < 10 ? `0${episode.number}` : episode.number}</h3>
                        {posters?.previewUrl && (
                            <img src={posters.previewUrl} alt="poster"
                            style={{
                                width: '172px',
                                height: '118px',
                            }}/>
                        )}
                        <div>
                            <div>
                                <h5>{episode.name}</h5>
                                <p>{duration}</p>
                            </div>
                            <p>{episode.description}</p>
                        </div>
                    </div>
                ))}

            </div>
    )
};

export default SerialCard;