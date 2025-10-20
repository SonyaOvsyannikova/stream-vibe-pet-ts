import Input from "@/shared/ui/Input";
import cl from './NewReviewCard.module.scss'
import {useRef, useState} from "react";
import MainButton from "@/shared/ui/MainButton";
import Close from '@/assets/icons/close.svg?react'
import ButtonIcon from "@/shared/ui/ButtonIcon";


const NewReviewCard = (props) => {

    const {
        setOpenCreateReview,
        handleAddReview,
    } = props

    const [value, setValue] = useState({
        author: "",
        title: "",
        review: "",

    });
    const inputRef = useRef(null);


    return (
        <form className={cl.createReviewCard}>
            
            <div className={cl.reviewCard}>
                <ButtonIcon
                onClick={() => setOpenCreateReview(false)}
                label={<Close/>}
                />
                <div className={cl.reviewHeader}>
                    <div>
                        <p> Введите свое имя</p>
                        <Input
                            ref={inputRef}
                            value={value.author}
                            onChange = {(e) => {
                                setValue({...value, author: e.target.value });
                            }}
                        />
                    </div>
                    <div>
                        <p> Напишите краткое ревью </p>
                        <Input
                            ref={inputRef}
                            value={value.title}
                            onChange = {(e) => {
                                setValue({...value, title: e.target.value });
                            }}
                        />
                    </div>
                </div>

            </div>
            <div className={cl.reviewBody}>
                    <p> Напишите развернутый отзыв </p>
                    <textarea
                        ref={inputRef}
                        value={value.review}
                        onChange = {(e) => {
                            setValue({...value, review: e.target.value });
                        }}
                        className={cl.reviewBodyArea}
                    />
            </div>
            <div>
                <MainButton
                label = 'send review'
                className={cl.buttonMessage}
                onClick={(e) => {
                    e.preventDefault();
                    handleAddReview(value);
                }}
                />
            </div>
        </form>
    );
};

export default NewReviewCard;