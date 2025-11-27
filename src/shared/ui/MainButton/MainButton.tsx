import cl from '@/shared/ui/MainButton/MainButton.module.scss'
import { ReactNode, MouseEvent } from "react";

interface MainButtonProps {
    label: string | ReactNode;
    onClick: (e: MouseEvent) => void
    className?: string
}

const MainButton = (props: MainButtonProps) => {

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