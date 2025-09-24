import cl from './HeaderList.module.scss'

const HeaderList = ({pages}) => {

    return (
        <ul className={cl.headerList} >
            {pages.map(page => (
                <li key={page.path}>
                    <a href={page.path} className={cl.headerListLink}>
                        {page.label}
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default HeaderList;