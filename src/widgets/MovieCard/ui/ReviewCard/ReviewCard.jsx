import Rating from "@/shared/ui/Rating";
import cl from './ReviewCard.module.scss'

const ReviewCard = (props) => {

    const { review } = props

    return (
        <div className={cl.ratingCard}>
            <div className={cl.ratingCardHeader}>
                <div className={cl.ratingCardHeaderTitle}>
                    <h6>{review.author}</h6>
                    <h6>{review.title}</h6>
                </div>
                <Rating />
            </div>
            <div>
                <p>{review.review}</p>
            </div>
        </div>
    )
};

export default ReviewCard;