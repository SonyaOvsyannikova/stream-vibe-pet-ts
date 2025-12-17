import cl from './Pagination.module.scss'
import {use, useEffect, useState} from "react";

type PaginationProps = {
    currentSlide: number,
    totalSlides: number,
    onSlideChange: (currentSlide: number) => void,
}
const Pagination = (props: PaginationProps) => {

    const [isTablet, setIsTable] = useState<boolean>(false)

    const {
        currentSlide = 0,
        totalSlides = 4,
        onSlideChange,
    } = props

    useEffect(() => {
        const size = () => {
            setIsTable(window.innerWidth < 1024)
        }
        size()
        window.addEventListener('resize', size)
        return () => {
            window.removeEventListener('resize', size)
        }
    })

    return (
        <div className={cl.pagination}>
            {!isTablet ? (
                <>
                    {Array(totalSlides).fill(0).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => onSlideChange(i)}
                            className={`${cl.paginationButton} ${i === currentSlide ? cl.activeButton : ''}`}/>
                    ))}
                </>
            ) : (
                <div
                    className={cl.paginationForTablet}>
                    <div className={cl.paginationScrollbarThumb}
                         style={{
                             left: `${(currentSlide / (totalSlides - 1)) * 100}%`
                         }}
                    />
                </div>
            )}

        </div>
    );
};

export default Pagination;