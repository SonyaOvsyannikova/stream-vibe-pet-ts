import ButtonIcon from "@/shared/ui/ButtonIcon";
import cl from "@/widgets/Categories/Categories.module.scss";
import Pagination from "@/shared/ui/Pagination";
import ArrowRight from '@/assets/icons/arrowRight.svg?react'
import ArrowLeft from '@/assets/icons/arrowLeft.svg?react'
import {useEffect, useMemo, useState} from "react";
import { Swiper as SwiperType } from "swiper";
import { GroupedMovies } from "@/shared/hooks/useMovies.ts";

type PaginationPanelProps = {
    slider: SwiperType | null;
    onSlideChange: (slideIndex: number) => void;
    totalSlide: number;
    currentSlide: number;
}

const PaginationPanel = (props: PaginationPanelProps) => {

    const [isTablet, setIsTablet] = useState<boolean>(false);
    const {
        slider,
        onSlideChange,
        totalSlide,
        currentSlide
    } = props;

    useEffect(() => {
        const size = () => {
            setIsTablet(window.innerWidth < 1024);
        }
        size()
        window.addEventListener('resize', size)
        return () => {
            window.removeEventListener('resize', size)
        }
    }, []);

    return (
        <div className={cl.paginationAndNavigation}>
            {!isTablet ? (
                <>
                    <ButtonIcon
                        className={cl.buttonNavigation}
                        label={ <ArrowLeft  className={cl.buttonNavigationArrow} /> }
                        onClick={() => {slider.slidePrev()}}
                    />
                    <Pagination
                        totalSlides={5}
                        currentSlide={currentSlide}
                        onSlideChange={onSlideChange}/>
                    <ButtonIcon
                        className={cl.buttonNavigation}
                        label={<ArrowRight className={cl.buttonNavigationArrow} /> }
                        onClick={() => {slider.slideNext()}}
                    />
                </>
            ) : (
                <>
                    <Pagination
                        totalSlides={totalSlide}
                        currentSlide={currentSlide}
                        onSlideChange={onSlideChange}/>
                </>
            )}

        </div>
    );
};

export default PaginationPanel;