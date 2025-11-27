import { Swiper } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper'
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper.css'
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import cl from "@/shared/ui/Slider/Slider.module.scss";
import { ReactNode } from "react";

type SliderProps = {
    children: ReactNode;
    onSwiper?: (swiper: SwiperType) => void
    onSlideChange?: (activeIndex: number) => void
    slidesPerView: number
}
const Slider = (props: SliderProps) => {

    const {
        children,
        onSwiper,
        onSlideChange,
        slidesPerView = 2
    } = props;

    return (
        <>
            <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={slidesPerView}
                spaceBetween={20}
                navigation={{
                    prevEl: `.${cl.prevButton}`,
                    nextEl: `.${cl.nextButton}`,
                }}
                onSwiper={onSwiper}
                onSlideChange={(swiper) => onSlideChange(swiper.activeIndex)}
            >
                {children}
            </Swiper>

        </>

    );
};

export default Slider;