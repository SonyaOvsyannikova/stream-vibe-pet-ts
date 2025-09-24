
const ModalMenu = ({pages, onClose}) => {
    return (
        <ul>
            {pages.map((page) => (
                <li key={page.path}>
                    <a href={page.path} onClick={onClose}>
                        {page.label}
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default ModalMenu;