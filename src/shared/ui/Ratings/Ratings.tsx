import Star from '@/assets/icons/starRaing.svg?react'
import { useState} from "react";
import cl from './Ratings.module.scss'
import clsx from "clsx";

type RatingsProps = {
    ratingValue: number;
    className?: string;
    classNameStars?: string;
    totalStars: number;
}


const Ratings = (props: RatingsProps) => {

    const {
        ratingValue,
        className,
        totalStars = 5,
        classNameStars
    } = props;

    const normalizedRating = (ratingValue / 10) * totalStars;

    return (
        <div className={clsx(cl.rating, className)}>
            {Array.from({length: totalStars }).map((_, i: number) => {
                const starFillPercentage: number = Math.min(Math.max(normalizedRating - i, 0), 1) * 100;
                const clipPathValue: number = 100 - starFillPercentage;
                return (
                    <div key={i} style={{
                        position: 'relative',
                    }}>
                        <div style={{
                            position: 'absolute',
                            clipPath: `inset(0 ${clipPathValue}% 0 0)`
                        }}>
                            <Star className={clsx(cl.ratingsColor, classNameStars)}/>
                        </div>
                        <Star className = {clsx(cl.ratingsColorBase, classNameStars)}/>
                    </div>
                )
            })}
        </div>
    )



}

export default Ratings;