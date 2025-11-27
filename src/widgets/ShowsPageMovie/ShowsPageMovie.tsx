import Categories from "@/widgets/Categories/Categories.tsx";
import Slider from "@/shared/ui/Slider";
import { useState } from "react";
import {Swiper as SwiperType} from "swiper";
import { SwiperSlide } from "swiper/react";
import CategoriesCard from "@/shared/ui/CategoriesCard/CategoriesCard.tsx";
import {IResponseApiMovie} from "@/shared/types";
import {GroupMovie, useMovies} from "@/shared/hooks/useMovies.ts";
import cl from "@/widgets/Categories/Categories.module.scss";
import ButtonIcon from "@/shared/ui/ButtonIcon";
import Pagination from "@/shared/ui/Pagination";
import PaginationPanel from "@/shared/ui/PaginationPanel";
import {useSliderControl} from "@/shared/hooks/useSliderControl.ts";


type ShowsPageMovieProps = {
    groupedMovies: GroupMovie
    movieDataArray?: IResponseApiMovie[]
}

const ShowsPageMovie = (props: ShowsPageMovieProps) => {

    const { groupedMovies, movieDataArray } = props;

    const { slider, currentSlide, handleSlideChange, setSlider } = useSliderControl()

    return (
        <div>
           <div>
               <div>
                   <h3>Our Genres</h3>
                   <PaginationPanel
                       slider={slider}
                       currentSlide={currentSlide}
                       onSlideChange={handleSlideChange}
                       totalSlide={Object.entries(groupedMovies).length}
                       groupedMovies={groupedMovies}
                   />
               </div>
               <Slider
                   onSwiper={setSlider}
                   onSlideChange={handleSlideChange}
                   slidesPerView={5}
               >
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

export default ShowsPageMovie;