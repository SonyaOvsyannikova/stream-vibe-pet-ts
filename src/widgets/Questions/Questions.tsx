import cl from './Questions.module.scss'
import Accordeon from "@/shared/ui/Accordeon";
import MainButton from "@/shared/ui/MainButton";

type Question = {
    title: string;
    description: string;
}

const Questions = () => {

    const questions: Array<Question> = [
        {
            title: 'What is StreamVibe?',
            description: 'StreamVibe is a streaming service that allows you to watch movies and shows on demand.',
        },
        {
            title: 'How much does StreamVibe cost?',
            description: '50 рублей'
        },
        {
            title: 'What content is available on StreamVibe?',
            description: 'all content is available on StreamVibe'
        },
        {
            title: 'How can I watch StreamVibe?',
            description: 'the content is available on StreamVibe',
        },
        {
            title: 'How do I sign up for StreamVibe?',
            description: 'the content is available on StreamVibe',
        },
        {
            title: 'What is the StreamVibe free trial?',
            description: 'the content is available on StreamVibe',
        },
        {
            title: 'How do I contact StreamVibe customer support?',
            description: 'the content is available on StreamVibe',
        },
        {
            title: 'What are the StreamVibe payment methods?',
            description: 'the content is available on StreamVibe',
        }
    ]

    return (
            <div className={cl.questionCardSection}>
                <div className={cl.questionsHeader}>
                    <div>
                        <h3>Frequently Asked Questions</h3>
                        <p>Got questions? We've got answers! Check out our FAQ section to find answers to the most common questions about StreamVibe.</p>
                    </div>
                    <MainButton
                    label={'Ask a Question'}
                    onClick={(e) => {
                        e.preventDefault()
                    }}/>
                </div>
                    <div className={cl.questionCard}>
                        {questions.map((question, index) => (
                            <Accordeon
                                detailsClassName={cl.questionCardDetails}
                                summary={
                                    <div className={cl.questionsCardSummary}>
                                        <div key={index}
                                             className={cl.questionsCardSummaryHeader}>
                                            <h4 className={cl.questionsCardCount}>
                                                0{index+1}
                                            </h4>
                                            <h4 className={cl.questionsCardTitle}>{question.title}</h4>
                                        </div>
                                        <div style = {{padding: '10px', alignItems: 'center'}}>
                                            <span className={cl.openCross}></span>
                                        </div>

                                    </div>
                                }>
                                <p className={cl.questionCardDescription}>{question.description}</p>
                            </Accordeon>
                        ))}
                    </div>
            </div>
    );
};

export default Questions;