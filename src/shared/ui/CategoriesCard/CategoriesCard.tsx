import cl from './CategoriesCard.module.scss'
import ButtonIcon from "@/shared/ui/ButtonIcon";
import ArrowRight from '@/assets/icons/arrowRight.svg?react'
import { MovieCollection} from '@/shared/hooks/useMovies.ts'

type CategoriesCardProps = {
    group?: MovieCollection
}

const CategoriesCard = (props: CategoriesCardProps ) => {

    const {
        group,
    } = props

    return (
        <div className={cl.moviesCard}>
            <div className={cl.sectionPreviewUrl}>
                {group.movies.map((movieWrapper) => {
                    const movies = movieWrapper.movie
                    return (
                        <img className={cl.imgCategories}
                            src={movies.poster?.url} alt={movies.name} />
                    )
                })}

            </div>
            <div className={cl.movieCardBody}>
                <p>{group.name}</p>
                <ButtonIcon
                label={
                    <ArrowRight className = {cl.arrowButton}  />
                }></ButtonIcon>
            </div>
        </div>
    );
};

export default CategoriesCard;