import { useEffect, useRef, useState} from "react"
import {kinopoiskAPI} from "@/shared/api/сlient";
import { useDebounce } from "use-debounce";
import cl from './SearchWithSuggestions.module.scss';
import SearchInput from "@/shared/ui/SearchInput";
import { Link } from "react-router-dom";
import {useOutsideClick} from "@/shared/hooks/useOutsideClick";


const SearchWithSuggestions = (props) => {

    const {
        onClose
    } = props;

    const outsideRef = useOutsideClick( () => {
        if (onClose) onClose();
    })

    const inputRef = useRef(null);
    const containerRef = useRef(null);
    const [allMovies, setAllMovies] = useState([]);
    const [value, setValue] = useState("");
    const [searchedMovies, setSearchedMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [debouncedSearchValue] = useDebounce(value, 250);
    const abortControllerRef = useRef(null);


    useEffect(() => {
        if(inputRef.current) {
            inputRef.current.focus()
        }
        loadTopMovies()

        return () => {
            if(abortControllerRef.current) {
                abortControllerRef.current.abort()
            }
        }
    }, [])

    useEffect(() => {
        if(debouncedSearchValue.length > 0) {
            getSearchMovie(debouncedSearchValue)
        } else {
            setSearchedMovies([]);
        }
    }, [debouncedSearchValue])

    const loadTopMovies = async () => {
        if(isLoading || allMovies.length > 0) return;
        setIsLoading(true);
        try {
            const response = await kinopoiskAPI.getPopularMovies({
                limit: 10,
                sortField: 'top10',
                sortType: -1,
            })
            setAllMovies(response.docs)
            console.log(response.docs)
        }
        catch(e) {
            setError(e.response.data)
        }
        finally {
            setIsLoading(false);
        }
    }

    const handleSearchMovies = (event) => {
        const dataInput = event.target.value;
        setValue(dataInput);
        console.log(dataInput);
    }
    const getSearchMovie = async (searchQuery) => {

        if(isLoading) return;

        if(abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        const controller = new AbortController();
        abortControllerRef.current = controller;

        setIsLoading(true);

        try {
            const response = await kinopoiskAPI.getSearchMovies({
                query: searchQuery,
                limit: 10,
            }, {
                signal: controller.signal,
            })
            setSearchedMovies(response.docs)
            console.log(response.docs)
        }
        catch(e) {
            if (e.name === 'CanceledError' || e.name === 'AbortError') {
                console.log('Запрос был отменён');
            } else {
                setError(e.response?.data || e.message);
            }
        }
        finally {
            setIsLoading(false);
        }
        return controller;
    }

    const handleSearchSumbit = (e) => {
        e.preventDefault()
        if(value.trim().length > 0) {
            getSearchMovie(value)
        }
    }


    return (
        <div className={cl.searchContent}
        ref={outsideRef}>
            <SearchInput
            inputRef={inputRef}
            value={value}
            onSearchChange={handleSearchMovies}
            onSearchSubmit={handleSearchSumbit}
            onSearchClick={handleSearchSumbit}
            />
            {isLoading ? (
                <div></div>
            ) : ((value.length > 0 ? searchedMovies : allMovies).length > 0 ? (
                <div className={cl.movieListContainer}
                     ref={containerRef}
                >
                    <ul className={cl.movieList}
                        >
                        {(value.trim().length > 0 ? searchedMovies : allMovies).map(movie => {
                            return <li key={movie.id}
                                       className={cl.movieListItem}>
                                <Link
                                    to={`/movie/${movie.id}`}
                                    className={cl.movieLink}>
                                    <div className={cl.posterContainer}>
                                            <img src={movie.poster?.previewUrl || '../public/placehold.png'}
                                                 className={cl.posterMovie}/>
                                    </div>
                                    <div>
                                        <h4> {movie.name ? movie.name : movie.alternativeName} </h4>
                                        <div
                                            className={cl.movieDescriptionRating}>
                                            {Object.entries(movie.rating).filter(([key, value]) => value !== 0)
                                                .map(([key, value]) => (
                                                    <p key={key}>
                                                        {key}: {value}
                                                    </p>
                                                ))}
                                        </div>
                                        <p>{movie.year}</p>
                                        <p>{movie.type}</p>
                                    </div>
                                </Link>

                            </li>
                        })}
                    </ul>
                </div>
            ) : null )}
        </div>
    );
};

export default SearchWithSuggestions;