import cl from './Accordeon.module.scss'
const Accordeon = (props) => {

    const {
        children,
        summary,
    } = props;



    return (
        <div className={cl.accordeon}>
            <details name='faq' className={cl.detailsStyle} open={true}>
                <summary className={cl.summaryStyle}>
                    {summary}
                </summary>
                <div
                    className={cl.accordionContent}
                    id="faq-1"
                    role="definition"
                >
                    {children}
                </div>
            </details>
        </div>
    );
};

export default Accordeon;