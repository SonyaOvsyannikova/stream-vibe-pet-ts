import Questions from "@/widgets/Questions";
import WelcomeSupportPage from "@/widgets/WelcomeSupportPage";

const SupportPage = () => {

    return (
        <div className='container'>
            <WelcomeSupportPage />
            <Questions />
        </div>
    );
};

export default SupportPage;