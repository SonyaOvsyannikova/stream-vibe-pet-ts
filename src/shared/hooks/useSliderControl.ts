import {useState} from "react";
import {Swiper as SwiperType} from "swiper";

export const useSliderControl = () => {

    const [slider, setSlider] = useState<null | SwiperType>(null);
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    const handleSlideChange = (slideIndex: number) => {
        setCurrentSlide(slideIndex);
        slider?.slideTo(slideIndex);
    }
    return {
        slider,
        currentSlide,
        handleSlideChange,
        setSlider
    }
}