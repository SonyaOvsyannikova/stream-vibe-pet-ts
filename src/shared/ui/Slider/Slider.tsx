import {Swiper, SwiperSlide} from 'swiper/react';
import { Swiper as SwiperType } from 'swiper'
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper.css'
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import cl from "@/shared/ui/Slider/Slider.module.scss";
import { ReactNode } from "react";
import {NavigationOptions, PaginationOptions} from "swiper/types";

type SliderProps<T> = {
    onSwiper?: (swiper: SwiperType) => void
    onSlideChange?: (activeIndex: number) => void
    slidesPerView?: number;
    breakpoints?: {
        [breakpoint: number]: {
            slidesPerView?: number;
            spaceBetween?: number;
        }
    }
    items: T[],
    renderItem: (item: T, index: number) => ReactNode,
    getItemKey?: (item: T, index: number) => string | number;
    spaceBetween?: number;
    navigation?: NavigationOptions | boolean;
    pagination?: PaginationOptions | boolean;
};

const Slider =<T,> (props: SliderProps<T>) => {

    const {
        onSwiper,
        onSlideChange,
        slidesPerView = 2,
        items,
        renderItem,
        getItemKey,
        breakpoints,
        spaceBetween,
        navigation,
        pagination,
    } = props;

    return (
        <div>
            <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={slidesPerView}
                spaceBetween={spaceBetween}
                breakpoints={breakpoints}
                navigation={navigation}
                pagination={pagination}
                onSwiper={onSwiper}
                onSlideChange={(swiper) => onSlideChange(swiper.activeIndex)}

            >
                {items?.map((item, index) => {
                    const key = props.getItemKey ? props.getItemKey(item, index) : `slide-${index}`
                    return (
                        <SwiperSlide key={key} >
                            {renderItem(item, index)}
                        </SwiperSlide>
                    )
                })}
            </Swiper>

        </div>

    );
};

export default Slider;