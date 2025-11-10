import cl from './Description.module.scss'
import { IResponseApiMovie } from "@/shared/types";

interface IProps {
    movieData: IResponseApiMovie
}
const Description = (props: IProps) => {

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