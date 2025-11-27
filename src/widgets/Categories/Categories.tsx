import { IResponseApiMovie } from "@/shared/types";
import CategoriesCard from "@/shared/ui/CategoriesCard/CategoriesCard.tsx";
import { useState } from "react";
import Slider from "@/shared/ui/Slider";
import { SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import cl from './Categories.module.scss'
import { GroupMovie, useMovies } from "@/shared/hooks/useMovies.ts";
import PaginationPanel from "@/shared/ui/PaginationPanel";
import {useSliderControl} from "@/shared/hooks/useSliderControl.ts";

type CategoriesProps = {
    groupedMovies: GroupMovie
    movieDataArray?: IResponseApiMovie[]
}

const Categories = (props: CategoriesProps) => {

    const {
        groupedMovies,
        movieDataArray
    } = props;

    const { slider, setSlider, currentSlide, handleSlideChange } = useSliderControl()

    const genresEntries = Object.entries(groupedMovies)

    return (
        <div className={cl.categorySection}>
            <div className={cl.categoriesHeader}>
                <div className={cl.categoryTitle}>
                    <h3>Explore our wide variety of categories</h3>
                    <p>Whether you're looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new</p>
                </div>
                <div className={cl.paginationAndNavigation}>
                   <PaginationPanel
                       groupedMovies={groupedMovies}
                       slider={slider}
                       onSlideChange={handleSlideChange}
                       currentSlide={currentSlide}
                       totalSlide = {genresEntries.length}/>
                </div>
            </div>
            <div className={cl.sliderCategory}>
                <Slider
                    onSwiper={setSlider}
                    onSlideChange={handleSlideChange}
                    slidesPerView={5}>
                    {Object.entries(groupedMovies).map(([genres, movies]) => (
                        <SwiperSlide
                            className={cl.categorieCardSlider}
                            key={genres}>
                            <CategoriesCard
                                movies={movies}
                                genres={genres}/>
                        </SwiperSlide>
                    ))}
                </Slider>
            </div>
        </div>

    );
};

export default Categories;