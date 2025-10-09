import Star from '@/assets/icons/starRaing.svg?react'
import {useEffect, useState} from "react";

const Rating = () => {


    const [totalStars, setTotalStars] = useState(5);
    const [rating, setRating] = useState(0);



    return (
        <div style={{ display: 'flex', gap: '4px' }}>
            {Array.from({ length: totalStars }).map((_, index) => (
                <Star
                    key={index}
                    fill={index < rating ? "gold" : "#ccc"}
                    stroke={index < rating ? "orange" : "#999"}
                />
            ))}
        </div>
    )
}

export default Rating;