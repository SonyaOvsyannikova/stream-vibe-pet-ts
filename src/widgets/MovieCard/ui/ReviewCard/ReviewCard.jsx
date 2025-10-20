import cl from './ReviewCard.module.scss'
import LikeReview from '@/assets/icons/likeReview.svg?react'
import DislikeReview from '@/assets/icons/disLikeReview.svg?react'
import {useState} from "react";
import ButtonIcon from "@/shared/ui/ButtonIcon";

const ReviewCard = (props) => {

    const { review } = props

    const [activeButton, setActiveButton] = useState(0)
    const [countLike, setCountLike] = useState(review.reviewLikes || 0);
    const [countDislike, setCountDislike] = useState(review.reviewDislikes || 0);

    const handleLike = () => {

        if(activeButton === 1) {
            setCountLike(countLike - 1);
            setActiveButton(0)
        } else {
            setCountLike(countLike + 1);
            if(activeButton === -1) {
                setCountDislike(countDislike - 1);
            }
            setActiveButton(1)
        }
    }
    const handleDislike = () => {
        if(activeButton === -1) {
            setCountDislike(countDislike - 1);
            setActiveButton(0)
        } else {
            setCountDislike(countDislike + 1);
            if(activeButton === 1) {
                setCountLike(countLike - 1);
            }
            setActiveButton(-1)
        }
    }

    return (
        <div className={cl.ratingCard}>
            <div className={cl.cardContent}>
                <div className={cl.ratingCardHeader}>
                    <div className={cl.ratingCardHeaderTitle}>
                        <h6>{review.author}</h6>
                        <h6>{review.title}</h6>
                    </div>
                    <div className={cl.gradeReview}>
                            <div>
                                <ButtonIcon
                                    onClick={() => {
                                        handleLike()
                                    }}
                                    label={<LikeReview
                                    className={activeButton === 1 ? `${cl.isActive}` : null}
                                    /> } />
                                <p>{countLike}</p>
                            </div>
                            <div>
                                <ButtonIcon
                                    onClick={() => {
                                        handleDislike()
                                    }}
                                    label={<DislikeReview
                                        className={activeButton===-1 ? `${cl.isActive}` : null}
                                    />} />
                                <p>{countDislike}</p>
                            </div>

                    </div>
                </div>
                <div className={cl.reviewBody}>
                    <p className={cl.reviewDescription}>{review.review}</p>
                </div>

            </div>

        </div>
    )
};

export default ReviewCard;