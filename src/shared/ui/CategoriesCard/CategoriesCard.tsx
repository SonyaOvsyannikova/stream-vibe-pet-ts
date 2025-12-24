import cl from './CategoriesCard.module.scss'
import ButtonIcon from "@/shared/ui/ButtonIcon";
import ArrowRight from '@/assets/icons/arrowRight.svg?react'
import { MovieCollection, Movie} from '@/shared/hooks/useMovies.ts'
import logo from "@/shared/ui/Logo";

type CategoriesCardProps = {
    group?: Movie[],
    collection?: MovieCollection,
    variant?: 'Our Genres' | 'Popular Top 10 In Genres'
}

const CategoriesCard = (props: CategoriesCardProps ) => {

    const {
        group,
        collection,
        variant,
    } = props

    return (
        <div className={cl.moviesCard}>
            <div className={cl.sectionPreviewUrl}>
                {group.map((item) => (
                    <img src = {item?.poster?.previewUrl} alt={item.name} className={cl.imgCategories} />
                ))}
            </div>
            <div className={cl.movieCardBody}>
                <div>
                    { variant === 'Popular Top 10 In Genres' && (
                        <label className={cl.labelTopInGenres}>Top 10 In</label>
                    )}
                    <p className={cl.descriptionCardBody}>{collection?.name}</p>
                </div>
                <ButtonIcon
                label={
                    <ArrowRight className = {cl.arrowButton}  />
                }></ButtonIcon>
            </div>
        </div>
    );
};

export default CategoriesCard;