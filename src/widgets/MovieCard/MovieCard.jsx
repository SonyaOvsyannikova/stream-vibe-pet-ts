import Description from "@/widgets/MovieCard/ui/Description/Description";
import SliderCast from "@/shared/ui/SliderCast/SliderCast";
import ButtonIcon from "@/shared/ui/ButtonIcon";
import { SwiperSlide } from "swiper/react";
import cl from './MovieCard.module.scss'
import ArrowRight from '@/assets/icons/arrowRight.svg?react'
import ArrowLeft from '@/assets/icons/arrowLeft.svg?react'
import ArrowDown from '@/assets/icons/arrowDown.svg?react'
import ArrowUp from '@/assets/icons/arrowUp.svg?react'
import ReleasedYear from '@/assets/icons/releasedYear.svg?react'
import AvailableLanguage from '@/assets/icons/availableLanguage.svg?react'
import Rating from '@/assets/icons/rating.svg?react'
import Gernes from '@/assets/icons/gernes.svg?react'
import PlusIcon from '@/assets/icons/plus.svg?react'
import { useState} from "react";
import AddReviewButton from "@/shared/ui/AddReviewButton";
import Slider from "@/shared/ui/Slider/Slider";
import ReviewCard from "@/widgets/MovieCard/ui/ReviewCard";
import Pagination from "@/shared/ui/Pagination";
import Accordeon from "@/shared/ui/Accordeon";
import SerialCard from "@/shared/ui/SerialCard";




const MovieCard = (props) => {

    const {
        movieData,
        seasons,
        reviews,
         } = props;

    const [slider, setSlider] = useState(null);
    const [sliderCast, setSliderCast] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isOpen, setIsOpen] = useState({});

    const handleSlideChange = (slideIndex) => {
        setCurrentSlide(slideIndex);
        slider?.slideTo(slideIndex);
    }

    const toggleAccordeon = (seasonId) => {
        setIsOpen((prevState) => (
            {
                ...prevState,
                [seasonId]: !prevState[seasonId],
            }
        ));
    }


    return (
        <div className='container'>
            <div className={cl.movieContent}>
                <div className={cl.movieInfo}>
                        {movieData?.type === 'tv-series' ? (
                            <div className={cl.serialInfo}>
                                <h4>Seasons and Episodes</h4>
                                {seasons
                                    ?.filter(season => season.number > 0)
                                    .map(season => (
                                        <Accordeon
                                            key={season.id}
                                            open={!!isOpen[season.id]}
                                            summary={
                                                <div className={cl.summaryHeader}>
                                                    <div className={cl.summaryTitle}>
                                                        <h5>Season: {season.number}</h5>
                                                        <h4>Episodes: {season.episodesCount}</h4>
                                                    </div>
                                                    <ButtonIcon
                                                        className={cl.openAccordeon}
                                                        label={ !isOpen[season.id] ? <ArrowDown /> : <ArrowUp /> }
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            toggleAccordeon(season.id)
                                                        }}
                                                    >
                                                    </ButtonIcon>
                                                </div>

                                            }>
                                            <div>
                                                <SerialCard
                                                    seasonId={season.id}
                                                    episodes={season.episodes}
                                                    posters={season.poster}
                                                    duration={season.duration}/>
                                            </div>
                                        </Accordeon>
                                    ))}
                            </div>
                        ) : null}
                    <Description
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
                            slidesPerView={8} >
                            {movieData && movieData.persons.map((person) => (
                                <SwiperSlide
                                    className={cl.cardPhotoCast}>
                                    <img src={person.photo} alt={person.name}
                                         className={cl.photoCast}/>
                                </SwiperSlide>
                            ))}
                        </SliderCast>
                    </div>

                    <div className={cl.review}>
                        <div className={cl.headerMovieCard}>
                            <h6>Reviews</h6>
                            <AddReviewButton>
                                <PlusIcon /> Add Your Review
                            </AddReviewButton>
                        </div>
                        <Slider
                            slidesPerView={2}
                            onSwiper={setSlider}>
                            {reviews.map((review, index) => (
                                <SwiperSlide
                                    className={cl.reviewCardSection}
                                    key={index}>
                                    <ReviewCard
                                        review={review}>
                                    </ReviewCard>
                                </SwiperSlide>
                            ))}
                        </Slider>
                        <div className={cl.paginationMovieCard}>
                            <ButtonIcon
                                label={<ArrowLeft />}
                                className={cl.prevButton}
                                onClick={() => {
                                    slider.slidePrev()
                                }}></ButtonIcon>
                            {reviews.length > 0 && (
                                <Pagination
                                    currentSlide={currentSlide}
                                    totalSlides={reviews.length}
                                    onSlideChange={handleSlideChange}
                                />
                            )}
                            <ButtonIcon
                                label={<ArrowRight />}
                                className={cl.prevButton}
                                onClick={() => {
                                    slider.slideNext()
                                }}></ButtonIcon>
                        </div>
                    </div>
                </div>
                <aside className={cl.asidePanel}>
                    <div className={cl.releasedYear}>
                        <div className={cl.sectionHeader}>
                            <ReleasedYear/>
                            <h6>Released Year </h6>
                        </div>
                        {movieData && (
                            <p>{movieData.year}</p>
                        )}
                    </div>
                    <div className={cl.infoSection}>
                        <div className={cl.sectionHeader}>
                            <AvailableLanguage/>
                            <h6> Available Languages </h6>
                        </div>
                        <div className={cl.sectionList}>
                            {movieData?.countries?.map((country) => (
                                <p className={cl.infoTag} key={country.id}>
                                    {country.name}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className={cl.infoSection}>
                        <div className={cl.sectionHeader}>
                            <Rating/>
                            <h6>Ratings </h6>
                        </div>
                        <div className={cl.sectionList}>
                            {movieData?.rating && Object.entries(movieData.rating).filter(([key]) => key === 'imdb' || key === 'kp')
                                .map(([key, value]) => (
                                    <p className={cl.infoTag} key={key}>
                                        {key}: {value}
                                    </p>
                                ))}
                        </div>

                    </div>
                    <div>
                        <div className={cl.sectionHeader}>
                            <Gernes/>
                            <h6>Gernes</h6>
                        </div>
                        <div className={cl.sectionList}>
                            {movieData?.genres.map((genre, index) => (
                                <p className={cl.infoTag} key={index}>
                                    {genre.name}
                                </p>
                            ))}
                        </div>

                    </div>
                    <div>
                        <h6>Director</h6>

                            {movieData?.persons?.filter((person) => person?.profession === 'сценаристы')
                                ?.map((person) => (
                                    <div className={cl.infoTag}>
                                        <img
                                            style={{
                                                width: '47px',
                                                height: '58px',
                                                borderRadius: '4px',
                                            }}
                                            src={person.photo} alt={person.name} />
                                        <p  key={person.id}>
                                            {person.name}
                                        </p>
                                    </div>

                                ))}
                    </div>
                    <div>
                        <h6>Music</h6>
                        {movieData?.persons?.filter((person) => person?.profession === 'композиторы')
                        ?.map((person) => (
                            <div className={cl.infoTag}>
                                <img
                                    style={{
                                        width: '50px',
                                        height: '60px',
                                        borderRadius: '4px',
                                    }}
                                    src={person.photo} alt={person.name} />
                                <p key={person.id}>
                                    {person.name}
                                </p>
                            </div>

                        ))}
                    </div>

                </aside>
            </div>
        </div>
    );
};

export default MovieCard;