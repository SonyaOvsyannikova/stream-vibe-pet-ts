import Input from '@/shared/ui/Input'
import cl from './NewReviewCard.module.scss'
import React, { useRef, useState } from 'react'
import MainButton from '@/shared/ui/MainButton'
import Close from '@/assets/icons/close.svg?react'
import ButtonIcon from '@/shared/ui/ButtonIcon'
import { IResponseApiReview } from '@/shared/types'

interface IProps {
  setOpenCreateReview: (openCreateReview: boolean) => void
  handleAddReview: (newReview: IResponseApiReview) => void
  className?: string
}

const NewReviewCard = (props: IProps) => {
  const { setOpenCreateReview, handleAddReview } = props

  const [value, setValue] = useState<Omit<IResponseApiReview, 'id'>>({
    author: '',
    title: '',
    review: '',
    reviewDislikes: 0,
    reviewLikes: 0,
  })
  const inputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  return (
    <form className={cl.createReviewCard}>
      <div className={cl.reviewCard}>
        <ButtonIcon
          onClick={() => setOpenCreateReview(false)}
          label={<Close />}
        />
        <div className={cl.reviewHeader}>
          <div>
            <p> Введите свое имя</p>
            <Input
              ref={inputRef}
              value={value.author}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValue({ ...value, author: e.target.value })
              }}
            />
          </div>
          <div>
            <p> Напишите краткое ревью </p>
            <Input
              ref={inputRef}
              value={value.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setValue({ ...value, title: e.target.value })
              }}
            />
          </div>
        </div>
      </div>
      <div className={cl.reviewBody}>
        <p> Напишите развернутый отзыв </p>
        <textarea
          ref={textareaRef}
          value={value.review}
          onChange={(e) => {
            setValue({ ...value, review: e.target.value })
          }}
          className={cl.reviewBodyArea}
        />
      </div>
      <div>
        <MainButton
          label="send review"
          className={cl.buttonMessage}
          onClick={(e) => {
            e.preventDefault()
            handleAddReview(value)
          }}
        />
      </div>
    </form>
  )
}

export default NewReviewCard
