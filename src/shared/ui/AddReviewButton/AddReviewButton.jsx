import cl from './AddReviewButton.module.scss'
const AddReviewButton = (props) => {
    const {children, onClick} = props;

    return (
        <button
        onClick={onClick}
        className={cl.buttonAdd}>
            {children}
        </button>
    );
};

export default AddReviewButton;