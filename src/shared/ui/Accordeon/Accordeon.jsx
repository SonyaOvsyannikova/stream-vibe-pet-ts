import cl from './Accordeon.module.scss'
const Accordeon = (props) => {

    const {
        children,
        summary,
        open
    } = props;



    return (
        <div className={cl.accordeon}>
                <details open={open}>
                    <summary className={cl.detailsStyle}>
                        {summary}
                    </summary>
                    <div >
                        {children}
                    </div >
                </details>
        </div>
    );
};

export default Accordeon;