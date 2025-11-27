import ButtonIcon from "@/shared/ui/ButtonIcon";
import cl from "@/widgets/Categories/Categories.module.scss";
import Pagination from "@/shared/ui/Pagination";
import ArrowRight from '@/assets/icons/arrowRight.svg?react'
import ArrowLeft from '@/assets/icons/arrowLeft.svg?react'
import { useState } from "react";
import { Swiper as SwiperType } from "swiper";
import { GroupMovie } from "@/shared/hooks/useMovies.ts";

type PaginationPanelProps = {
    groupedMovies: GroupMovie;
    slider: SwiperType | null;
    onSlideChange: (slideIndex: number) => void;
    totalSlide: number;
    currentSlide: number;
}

const PaginationPanel = (props: PaginationPanelProps) => {

    const {
        groupedMovies,
        slider,
        onSlideChange,
        totalSlide,
        currentSlide
    } = props;


    return (
        <div>
            <ButtonIcon
                className={cl.buttonNavigation}
                label={ <ArrowLeft  className={cl.buttonNavigationArrow} /> }
                onClick={() => {slider.slidePrev()}}
            />
            <Pagination
                totalSlides={Object.keys(groupedMovies).length / 2}
                currentSlide={currentSlide}
                onSlideChange={onSlideChange}/>
            <ButtonIcon
                className={cl.buttonNavigation}
                label={<ArrowRight className={cl.buttonNavigationArrow} /> }
                onClick={() => {slider.slideNext()}}
            />
        </div>
    );
};

export default PaginationPanel;