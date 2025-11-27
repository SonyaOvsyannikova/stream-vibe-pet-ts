import Star from '@/assets/icons/starRaing.svg?react'
import { useState} from "react";
import cl from './Ratings.module.scss'

type RatingsProps = {
    ratingValue: number;
}
const TOTAL_STAR = 10;

const Ratings = (props: RatingsProps) => {

    const {
        ratingValue
    } = props;

    return (
        <div className={cl.rating}>
            {Array.from({length: TOTAL_STAR }).map((_, i: number) => {
                const starFillPercentage: number = Math.min(Math.max(ratingValue - i, 0), 1) * 100;
                const clipPathValue: number = 100 - starFillPercentage;
                return (
                    <div key={i} style={{
                        position: 'relative',
                    }}>
                        <div style={{
                            position: 'absolute',
                            clipPath: `inset(0 ${clipPathValue}% 0 0)`
                        }}>
                            <Star className={cl.ratingsColor}/>
                        </div>
                        <Star className = {cl.ratingsColorBase}/>
                    </div>
                )
            })}
        </div>
    )



}

export default Ratings;