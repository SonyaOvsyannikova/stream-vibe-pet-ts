import cl from './ReviewCard.module.scss'
import LikeReview from '@/assets/icons/likeReview.svg?react'
import DislikeReview from '@/assets/icons/disLikeReview.svg?react'
import {useState} from "react";
import ButtonIcon from "@/shared/ui/ButtonIcon";
import { IResponseApiReview } from '@/shared/types'

interface IProps {
    review: IResponseApiReview
}
enum voteState {
    NONE = 0,
    LIKED = 1,
    DISLIKED = -1
}
const INCREMENT = 1;
const DECREMENT = -1;

const ReviewCard = (props: IProps) => {

    const {
        review
    } = props

    const [activeButton, setActiveButton] = useState<voteState>(voteState.NONE)
    const [countLike, setCountLike] = useState<number>(review.reviewLikes || voteState.NONE);
    const [countDislike, setCountDislike] = useState<number>(review.reviewDislikes || voteState.NONE);


    const handleLike = (): void => {

        if(activeButton === voteState.LIKED) {
            setCountLike(countLike - INCREMENT);
            setActiveButton(voteState.NONE);
        } else {
            setCountLike(countLike + INCREMENT);
            if(activeButton === voteState.DISLIKED) {
                setCountDislike(countDislike - INCREMENT);
            }
            setActiveButton(voteState.LIKED);
        }
    }
    const handleDislike = (): void => {
        if(activeButton === voteState.DISLIKED) {
            setCountDislike(countDislike - INCREMENT);
            setActiveButton(voteState.NONE)
        } else {
            setCountDislike(countDislike + INCREMENT);
            if(activeButton === voteState.LIKED) {
                setCountLike(countLike - INCREMENT);
            }
            setActiveButton(voteState.DISLIKED)
        }
    }

    return (
        <div className={cl.ratingCard}>
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
                                    className={activeButton === voteState.LIKED ? `${cl.isActive}` : null}
                                    /> } />
                                <p>{countLike}</p>
                            </div>
                            <div>
                                <ButtonIcon
                                    onClick={() => {
                                        handleDislike()
                                    }}
                                    label={<DislikeReview
                                        className={activeButton=== voteState.DISLIKED ? `${cl.isActive}` : null}
                                    />} />
                                <p>{countDislike}</p>
                            </div>

                    </div>
                </div>
                <div className={cl.reviewBody}>
                    <p className={cl.reviewDescription}>{review.review}</p>
                </div>
        </div>
    )
};

export default ReviewCard;