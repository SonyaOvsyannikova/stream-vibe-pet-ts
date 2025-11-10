import cl from '@/shared/ui/MainButton/MainButton.module.scss'
import React, {ChangeEvent} from "react";

interface IProps {
    label: string | React.ReactNode;
    onClick: (e: React.MouseEvent) => void
    className?: string
}

const MainButton = (props: IProps) => {

    const {
        label,
        onClick,
        className,
    } = props;
    return (
        <button
        className={`${cl.mainButton} ${className || ''}`}
        onClick={onClick}>{ label }</button>
    );
};

export default MainButton;