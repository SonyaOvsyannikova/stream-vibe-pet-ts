import { IResponseApiMovie } from "@/shared/types";
import cl from './CategoriesCard.module.scss'
import ButtonIcon from "@/shared/ui/ButtonIcon";
import ArrowRight from '@/assets/icons/arrowRight.svg?react'

type CategoriesCardProps = {
    movies: IResponseApiMovie[];
    genres: string;
}


const CategoriesCard = (props: CategoriesCardProps) => {

    const {
        movies,
        genres,
    } = props

    return (
        <div className={cl.moviesCard}>
            <div className={cl.sectionPreviewUrl}>
                {movies.map((movie) => (
                    <img
                        className={cl.imgCategoriesMovies}
                        key={movie.id} src = {movie?.poster?.previewUrl} alt = {movie?.name} />
                ))}
            </div>
            <div className={cl.movieCardBody}>
                <p>{genres}</p>
                <ButtonIcon
                label={
                    <ArrowRight />
                }></ButtonIcon>
            </div>
        </div>
    );
};

export default CategoriesCard;