import {ReactNode} from "react";

interface Pages {
    label: string;
    path: string;
}
interface Props {
    pages: Pages[];
    onClose: () => void,

}

const ModalMenu = (props: Props) => {

    const {
        pages,
        onClose
    } = props;


    return (
        <ul>
            {pages.map((page) => (
                <li key={page.path}>
                    <a href={page.path} onClick={onClose && onClose}>
                        {page.label}
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default ModalMenu;