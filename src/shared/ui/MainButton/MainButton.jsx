import cl from '@/shared/ui/MainButton/MainButton.module.scss'

const MainButton = (props) => {
    const {
        label,
        onClick } = props;
    return (
        <button
        className={cl.mainButton}
        onClick={onClick}>{ label }</button>
    );
};

export default MainButton;