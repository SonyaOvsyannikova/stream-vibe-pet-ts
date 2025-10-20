import Star from '@/assets/icons/starRaing.svg?react'
import { useState} from "react";
import cl from './Ratings.module.scss'



const Ratings = (props) => {

    const {
        ratingValue
    } = props;


    const [totalStars, setTotalStars] = useState(10);


    return (
        <div className={cl.rating}>
            {Array.from({length: totalStars }).map((_, i) => {
                const starFillPercentage = Math.min(Math.max(ratingValue - i, 0), 1) * 100;
                const clipPathValue = 100 - starFillPercentage;
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