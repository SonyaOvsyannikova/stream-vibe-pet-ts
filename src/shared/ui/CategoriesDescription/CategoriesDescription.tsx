import cl from "@/widgets/Categories/Categories.module.scss";
import { ReactNode } from "react";

type CategoriesDescriptionProps = {
    labelHeader?: string,
    labelDescription?: string,
}

const CategoriesDescription = (props:CategoriesDescriptionProps) => {

    const {
        labelHeader,
        labelDescription,
    } = props

    return (
            <div className={cl.categoryTitle}>
                <h3>{labelHeader}</h3>
                {labelDescription && <p>{labelDescription}</p>}
            </div>
    );
};

export default CategoriesDescription;