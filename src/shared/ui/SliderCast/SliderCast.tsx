import { Swiper } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/swiper.css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import cl from './SliderCast.module.scss'
import { ReactNode } from 'react'

type SliderCastProps = {
  children: ReactNode
  onSwiper?: (swiper: SwiperType) => void
}
const SliderCast = (props: SliderCastProps) => {
  const { children, onSwiper } = props

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      slidesPerView={8}
      spaceBetween={20}
      navigation={{
        prevEl: `.${cl.prevButton}`,
        nextEl: `.${cl.nextButton}`,
      }}
      onSwiper={onSwiper}
    >
      {children}
    </Swiper>
  )
}

export default SliderCast
