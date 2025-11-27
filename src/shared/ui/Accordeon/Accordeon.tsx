import cl from './Accordeon.module.scss'
import {ReactNode} from "react";

type AccordeonProps = {
    children: ReactNode,
    summary: ReactNode,
    detailsClassName?: string
}
const Accordeon = (props: AccordeonProps) => {

    const {
        children,
        summary,
        detailsClassName
    } = props;


    return (
        <div className={cl.accordeon}>
            <details
                name='faq'
                className={detailsClassName}
                open={true}>
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