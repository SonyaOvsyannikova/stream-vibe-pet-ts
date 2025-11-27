import {ReactNode} from "react";

type Pages = {
    label: string;
    path: string;
}
type ModalMenuProps = {
    pages: Pages[];
    onClose: () => void,

}

const ModalMenu = (props: ModalMenuProps) => {

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