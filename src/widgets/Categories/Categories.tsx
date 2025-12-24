import {ReactNode, useEffect, useMemo, useRef, useState} from "react";
import Slider from "@/shared/ui/Slider";
import cl from './Categories.module.scss'
import { useSliderControl } from "@/shared/hooks/useSliderControl.ts";
import CategoriesDescription from "@/shared/ui/CategoriesDescription/CategoriesDescription.tsx";
import { GroupedMovies } from "@/shared/hooks/useMovies.ts";
import ButtonIcon from "@/shared/ui/ButtonIcon";
import ArrowRight from '@/assets/icons/arrowRight.svg?react'
import ArrowLeft from '@/assets/icons/arrowLeft.svg?react'
import 'swiper/swiper.css'
import 'swiper/css/pagination';
import 'swiper/css/navigation';

type CategoriesProps<T> = {
    groupedMovies?: GroupedMovies,
    title?: string;
    description?: string;
    className?: string;
    slidesPerView?: number;
    breakpoints?: {
        [breakpoint: number]: {
            slidesPerView?: number,
            spaceBetween?: number;
        }
    },
    items:T[],
    renderItem: (item: T, index: number) => ReactNode;
    totalSlides?: number;
    sliderClassName?: string;
    spaceBetween?: number;
}



const Categories = <T,>(props: CategoriesProps<T>) => {


    const {
        title,
        description,
        className,
        slidesPerView,
        items = [],
        renderItem,
        totalSlides = items.length,
        breakpoints,
        spaceBetween,
        groupedMovies
    } = props;

    console.log(groupedMovies)

    const { slider, setSlider, currentSlide, handleSlideChange } = useSliderControl()
    const [isTablet, setIsTablet] = useState<boolean>(false)

    useEffect(() => {
        const size = () => {
            setIsTablet(window.innerWidth < 1024)
        }
        size()
        window.addEventListener('resize', size)
        return ()=> {
            window.removeEventListener('resize', size)
        }
    })

    // const prevRef = useRef(null);
    // const nextRef = useRef(null);

    return (
        <div className={`${cl.categorySection} ${className || ''}`}>
            {!isTablet ? (
                <>
                    <div className={cl.categoryHeader}>
                        <CategoriesDescription labelHeader={title} labelDescription={description}/>
                        <div className={cl.paginationAndNavigation}>
                            <div className="slider-prev" >
                                <ButtonIcon
                                    className={cl.buttonNavigation}
                                    label={<ArrowRight className={cl.buttonNavigationArrowLeft}/>}
                                />
                            </div>
                            <div className={'custom-swiper-pagination'}></div>
                            <div className="slider-next" >
                                <ButtonIcon
                                    className={cl.buttonNavigation}
                                    label={<ArrowRight className={cl.buttonNavigationArrow}/>}
                                />
                            </div>
                        </div>

                    </div>
                    <div className={cl.sliderCategory}>
                    <Slider
                            spaceBetween = {spaceBetween}
                            onSwiper={setSlider}
                            onSlideChange={handleSlideChange}
                            slidesPerView={slidesPerView}
                            items={items}
                            renderItem={renderItem}
                            breakpoints={breakpoints}
                            navigation={{
                                prevEl: '.slider-prev',
                                nextEl: `.slider-next`,
                            }}
                            pagination={{
                                el: '.custom-swiper-pagination',
                                type: 'bullets',
                                clickable: true,
                                bulletClass: 'swiper-pagination-bullet',
                                bulletActiveClass:'swiper-pagination-bullet-active'
                            }}

                        />
                    </div>
                </>
            ) : (
                    <>
                        <div className={cl.categoryHeader}>
                            <CategoriesDescription labelHeader={title} labelDescription={description} />
                        </div>
                        <div className={cl.sliderCategory}>
                            <Slider
                                onSwiper={setSlider}
                                onSlideChange={handleSlideChange}
                                slidesPerView={slidesPerView}
                                items={items}
                                renderItem={renderItem}
                                breakpoints={breakpoints}
                                pagination={{
                                    el: '.custom-swiper-pagination-for-tablet',
                                    type: 'progressbar',
                                    clickable: true,
                                }}
                            />
                            <div className='custom-swiper-pagination-for-tablet'></div>
                        </div>

                    </>
                )
            }

        </div>

    );
};

export default Categories;