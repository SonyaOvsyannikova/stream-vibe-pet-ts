import cl from './Description.module.scss'
const Description = (props) => {

    const {
        movieData
    } = props;

    return (
        <div className={cl.movieCardDescription}>
            <h6
            className={cl.headerDescription}>Description</h6>
            {movieData && (
                <p>{movieData.description}</p>
            )}
        </div>
    );
};

export default Description;