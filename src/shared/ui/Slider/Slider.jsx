import { Swiper } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper.css'
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import cl from "@/shared/ui/Slider/Slider.module.scss";

const Slider = (props) => {

    const {
        children,
        onSwiper,
    } = props;

    return (
        <>
            <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={2}
                spaceBetween={20}
                navigation={{
                    prevEl: `.${cl.prevButton}`,
                    nextEl: `.${cl.nextButton}`,
                }}
                onSwiper={onSwiper}
            >
                {children}
            </Swiper>

        </>

    );
};

export default Slider;