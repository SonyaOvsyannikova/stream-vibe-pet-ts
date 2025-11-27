import cl from './Pagination.module.scss'

type PaginationProps = {
    currentSlide: number,
    totalSlides: number,
    onSlideChange: (currentSlide: number) => void,
}
const Pagination = (props: PaginationProps) => {

    const {
        currentSlide = 0,
        totalSlides = 4,
        onSlideChange,
    } = props

    return (
        <div className={cl.pagination}>
            {Array(totalSlides).fill(0).map((_, i) => (
                <button
                    key={i}
                    onClick={() => onSlideChange(i)}
                    className={`${cl.paginationButton} ${i === currentSlide ? cl.activeButton : ''}`}></button>
            ))}
        </div>
    );
};

export default Pagination;