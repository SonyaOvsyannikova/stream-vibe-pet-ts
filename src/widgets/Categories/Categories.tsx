import {ReactNode, useEffect, useMemo, useState} from "react";
import Slider from "@/shared/ui/Slider";
import cl from './Categories.module.scss'
import PaginationPanel from "@/shared/ui/PaginationPanel";
import {useSliderControl} from "@/shared/hooks/useSliderControl.ts";
import CategoriesDescription from "@/shared/ui/CategoriesDescription/CategoriesDescription.tsx";
import { GroupedMovies } from "@/shared/hooks/useMovies.ts";

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
        spaceBetween
    } = props;

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

    return (
        <div className={`${cl.categorySection} ${className || ''}`}>
            {!isTablet ? (
                <>
                    <div className={cl.categoryHeader}>
                        <CategoriesDescription labelHeader={title} labelDescription={description} />
                        <PaginationPanel
                            slider={slider}
                            onSlideChange={handleSlideChange}
                            currentSlide={currentSlide}
                            totalSlide={items.length}
                        />
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
                            />
                        </div>
                        <div className={cl.paginationForTablet}>
                            <PaginationPanel
                                slider={slider}
                                onSlideChange={handleSlideChange}
                                currentSlide={currentSlide}
                                totalSlide={items.length}
                            />
                        </div>
                    </>
                )
            }

        </div>

    );
};

export default Categories;