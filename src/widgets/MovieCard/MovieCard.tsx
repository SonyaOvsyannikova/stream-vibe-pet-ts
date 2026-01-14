import Description from "@/widgets/MovieCard/ui/Description/Description.tsx";
import SliderCast from "@/shared/ui/SliderCast/SliderCast.tsx";
import ButtonIcon from "@/shared/ui/ButtonIcon";
import { SwiperSlide } from "swiper/react";
import cl from './MovieCard.module.scss'
import ArrowRight from '@/assets/icons/arrowRight.svg?react'
import ArrowLeft from '@/assets/icons/arrowLeft.svg?react'
import ArrowDown from '@/assets/icons/arrowDown.svg?react'
import ArrowUp from '@/assets/icons/arrowUp.svg?react'
import ReleasedYear from '@/assets/icons/releasedYear.svg?react'
import AvailableLanguage from '@/assets/icons/availableLanguage.svg?react'
import RatingIcon from '@/assets/icons/rating.svg?react'
import Gernes from '@/assets/icons/gernes.svg?react'
import PlusIcon from '@/assets/icons/plus.svg?react'
import More from '@/assets/icons/more.svg?react'
import Collapse from '@/assets/icons/collapse.svg?react'
import {use, useEffect, useRef, useState} from "react";
import Slider from "@/shared/ui/Slider/Slider.tsx";
import ReviewCard from "@/widgets/MovieCard/ui/ReviewCard";
import Accordeon from "@/shared/ui/Accordeon";
import SerialCard from "@/shared/ui/SerialCard";
import Ratings from "@/shared/ui/Ratings";
import NewReviewCard from "@/widgets/MovieCard/ui/NewReviewCard";
import { useOutsideClick } from "@/shared/hooks/useOutsideClick.ts";
import {
    IResponseApiMovie,
    IResponseApiSeasons,
    IResponseApiEpisodeData,
    IResponseApiReview,
    SelectedEpisode,
    Rating
} from "@/shared/types";
import { Swiper as SwiperType } from 'swiper';
import clsx from "clsx";




type MovieCardProps = {
    movieData?: IResponseApiMovie,
    seasons?: IResponseApiSeasons[],
    reviews?: IResponseApiReview[],
    isOpenPlayer: boolean,
    setIsOpenPlayer: (isOpen: boolean) => void,
    onPlayClick?: (episode?: IResponseApiEpisodeData, index?: number) => void;
    setSelectedEpisodes: (episodes: SelectedEpisode) => void
    selectedEpisodes: SelectedEpisode,
    slidesPerView?: number,
}


const MovieCard = (props: MovieCardProps) => {




    const {
        movieData,
        seasons,
        reviews,
        // isOpenPlayer,
        // setIsOpenPlayer,
        // selectedEpisodes,
        // setSelectedEpisodes,
        onPlayClick,
        // slidesPerView = 2
         } = props;


    const [slider, setSlider] = useState<null | SwiperType>(null);
    const [sliderCast, setSliderCast] = useState<null | SwiperType>(null);
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [showAll, setShowAll] = useState<boolean>(false);
    const [openCreateReview, setOpenCreateReview] = useState<boolean>(false);
    const [addReviews, setAddReview] = useState<IResponseApiReview[]>([]);


    useEffect(() => {
        if (reviews && reviews.length > 0) {
            setAddReview(reviews);
        }
    }, [reviews]);

    const handleAddReview = (newReview: IResponseApiReview) => {
        const reviewWithId: IResponseApiReview = {
            ...newReview,
            id: Math.round(Date.now() + Math.random())
        }
        setAddReview([reviewWithId, ...addReviews])
        console.log(addReviews)
        setOpenCreateReview(false);
    }
    const defaultShowLanguage = 5;
    const handleSlideChange = (slideIndex: number) => {
        setCurrentSlide(slideIndex);
        slider?.slideTo(slideIndex);
    }
    const outsideRef = useOutsideClick( () => {
        if(openCreateReview) setOpenCreateReview(false);
    })


    return (
            <section className={cl.movieContent}>
                <div className={cl.movieInfo}>
                        {movieData?.type === 'tv-series' ? (
                            <div className={cl.serialInfo}>
                                <h4>Seasons and Episodes</h4>
                                {seasons
                                    ?.filter(season => season.number > 0)
                                    .reverse()
                                    .map(season => (
                                        <Accordeon
                                            detailsClassName={cl.detailsStyle}
                                            key={season.id}
                                            summary={
                                                <div className={cl.summaryHeader}>
                                                    <div className={cl.summaryTitle}>
                                                        <h5 className={cl.seasonTitle}>
                                                            {season.number < 10 ? `Season 0${season.number}` : `Season ${season.number}`}</h5>
                                                        <p className={cl.seasonEpisodes}>Episodes: {season.episodesCount}</p>
                                                    </div>
                                                    <div className={cl.arrow}>
                                                        <ArrowUp  />
                                                    </div>
                                                </div>
                                            }>
                                                <SerialCard
                                                    episodes={season.episodes}
                                                    onPlayClick={onPlayClick}
                                                />
                                        </Accordeon>
                                    ))}
                            </div>
                        ) : null}
                    <Description
                        className={cl.description}
                        movieData={movieData}/>
                    <div className={cl.castMovieCard}>
                        <div className={cl.headerMovieCard}>
                            <h6>Cast</h6>
                            <div className={cl.buttonHeaderMovieCard}>
                                <ButtonIcon
                                    label={<ArrowLeft />}
                                    className={cl.prevButton}
                                    onClick={() => {
                                        sliderCast.slidePrev()
                                    }}
                                ></ButtonIcon>
                                <ButtonIcon
                                    label={<ArrowRight />}
                                    className={cl.prevButton}
                                    onClick={() => {
                                        sliderCast.slideNext()
                                    }}></ButtonIcon>
                            </div>
                        </div>

                        <SliderCast
                            onSwiper={setSliderCast}
                        >
                            {movieData && movieData?.persons?.map((person) => (
                                <SwiperSlide
                                    className={cl.cardPhotoCast}>
                                    <img src={person.photo} alt={person.name}
                                         className={cl.photoCast}/>
                                </SwiperSlide>
                            ))}
                        </SliderCast>
                    </div>

                    <div className={cl.review}
                         >
                        <div className={cl.headerMovieCard}>
                            <h6>Reviews</h6>
                            <div
                                className={cl.headerMovieCard}
                                ref={outsideRef}>
                                {openCreateReview ?
                                    <div className={cl.reviewOverlay}>
                                        <div ref={outsideRef}>
                                            <NewReviewCard
                                            setOpenCreateReview = {setOpenCreateReview}
                                            handleAddReview={handleAddReview}
                                            />
                                        </div>
                                    </div>
                                : null}
                                <button
                                    className={cl.buttonAdd}
                                    onClick={() => {
                                        setOpenCreateReview(true)
                                    }}>
                                    <PlusIcon /> Add Your Review
                                </button>
                            </div>
                        </div>
                        {/*<Slider*/}
                        {/*    onSwiper={setSlider}*/}
                        {/*    onSlideChange={handleSlideChange}*/}
                        {/*    slidesPerView={2}>*/}
                        {/*    {addReviews?.map((addReview, index) => (*/}
                        {/*        <SwiperSlide*/}
                        {/*            className={cl.reviewCardSection}*/}
                        {/*            key={addReview.id}>*/}
                        {/*            <ReviewCard*/}
                        {/*                review={addReview}*/}
                        {/*                >*/}
                        {/*            </ReviewCard>*/}
                        {/*        </SwiperSlide>*/}
                        {/*    ))}*/}
                        {/*</Slider>*/}
                        <Slider
                            onSwiper={setSlider}
                            onSlideChange={handleSlideChange}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                },
                                768: {
                                    slidesPerView: 1,
                                },
                                1024: {
                                    slidesPerView: 2,
                                    spaceBetween: 20
                                },
                            }}
                            items={addReviews}
                            navigation={{
                                prevEl: '.slider-prev',
                                nextEl: `.slider-next`,
                            }}
                            pagination={{
                                el: '.custom-swiper-pagination',
                                type: 'bullets',
                                clickable: true,
                                bulletClass: 'swiper-pagination-bullet',
                                bulletActiveClass:'swiper-pagination-bullet-active',
                                dynamicBullets: true,
                                dynamicMainBullets: 2
                            }}
                            renderItem={(review, index) => (
                                <ReviewCard review={review} key={index} />
                            )}/>
                        <div className={cl.paginationMovieCard}>
                            <div className="slider-prev">
                                <ButtonIcon
                                    className={cl.buttonNavigationLeft}
                                    label={<ArrowRight className={cl.buttonNavigationArrowLeft}/>}
                                />
                            </div>
                            <div className={cl.paginationContainer}>
                                <div className="custom-swiper-pagination"></div>
                            </div>
                            {/*<div className="custom-swiper-pagination"></div>*/}
                            <div className="slider-next" >
                                <ButtonIcon
                                    className={cl.buttonNavigation}
                                    label={<ArrowRight className={cl.buttonNavigationArrow}/>}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <aside className={cl.asidePanel}
                onClick={() => {
                    if(showAll) {
                        setShowAll(false);
                    }
                }}>
                    <div className={cl.releasedYear}>
                        <div className={cl.sectionHeader}>
                            <ReleasedYear className={cl.infoIcon}/>
                            <p className={cl.infoLabel}>Released Year </p>
                        </div>
                        {movieData && (
                            <p>{movieData.year}</p>
                        )}
                    </div>
                    <div className={cl.infoSection}>
                        <div className={cl.sectionHeader}>
                            <AvailableLanguage className={cl.infoIcon}/>
                            <p className={cl.infoLabel}> Available Languages </p>
                        </div>
                        <div className={cl.sectionList}>
                            {showAll ? movieData?.names
                                    ?.filter(name => name?.language)
                                    .map((name) => (
                                    <p className={cl.infoTag}>{name.language}</p>
                            ))
                                : movieData?.names
                                    ?.filter(name => name?.language)
                                    .slice(0, defaultShowLanguage)
                                    .map((name) => (
                                            <p className={cl.infoTag}>{name.language}</p>
                                    ))
                            }
                            {movieData?.names?.filter(name => name?.language).length > defaultShowLanguage && !showAll && (
                                <ButtonIcon
                                label={<More />}
                                className={cl.buttonMore}
                                    onClick={() => {
                                    setShowAll(true);
                                }}></ButtonIcon>
                            )}
                            {showAll && (
                                <ButtonIcon
                                className={cl.buttonMore}
                                label={<Collapse />}
                                onClick={() => setShowAll(false)}></ButtonIcon>
                            )}
                        </div>
                    </div>
                    <div className={cl.infoSection} >
                        <div className={cl.sectionHeader}>
                            <RatingIcon className={cl.infoIcon}/>
                            <p className={cl.infoLabel}>Ratings </p>
                        </div>
                        <div className={cl.sectionList}>
                            {movieData?.rating && Object.entries(movieData.rating).filter(([key]) => key === 'imdb' || key === 'kp')
                                .map(([key, value]:[keyof Rating, number]) => (
                                    <div className={cl.raitingTag}>
                                        <h6 key={key}>
                                            {key}
                                        </h6>
                                        <div className={cl.raitingTagBody}>
                                            <Ratings
                                                totalStars = {10}
                                                ratingValue={value}/>
                                           <h6>{value.toFixed(1)}</h6>
                                        </div>
                                    </div>
                                ))}
                        </div>

                    </div>
                    <div>
                        <div className={cl.sectionHeader}>
                            <Gernes className={cl.infoIcon} />
                            <p className={cl.infoLabel}>Gernes</p>
                        </div>
                        <div className={cl.sectionList}>
                            {movieData?.genres.map((genre, index) => (
                                <p className={cl.infoTag} key={index}>
                                    {genre.name}
                                </p>
                            ))}
                        </div>

                    </div>
                    <div className={cl.creators}>
                        <p className={cl.infoLabel}>Director</p>
                            {movieData?.persons && movieData?.persons?.filter((person) => person?.profession === 'сценаристы')
                                ?.map((person) => {
                                    if(!person?.name) return null;
                                    return (
                                        <div className={cl.directorSection}>
                                        <img
                                    className={cl.photoPerson}
                                    src={person.photo ? person.photo : null} alt={person.name} />
                                    <p  key={person.id}>
                                        {person.name ? person.name : null}
                                    </p>
                                </div>
                                    )
                                })}
                    </div>
                    <div>
                        <p className={cl.infoLabel}>Music</p>
                        {movieData?.persons?.filter((person) => person?.profession === 'композиторы')
                        ?.map((person) => (
                            <div className={cl.directorSection}>
                                <img
                                    className={cl.photoPerson}
                                    src={person.photo} alt={person.name} />
                                <p key={person.id}>
                                    {person.name}
                                </p>
                            </div>

                        ))}
                    </div>
                </aside>
            </section>
    );
};

export default MovieCard;