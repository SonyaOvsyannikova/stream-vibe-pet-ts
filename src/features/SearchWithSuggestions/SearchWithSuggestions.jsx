import { useEffect, useRef, useState} from "react"
import { movies, searchMovies} from "@/shared/api/Client";
import { useDebounce } from "use-debounce";
import cl from './SearchWithSuggestions.module.scss';
import SearchInput from "@/shared/ui/SearchInput";
import { Link } from "react-router-dom";

const SearchWithSuggestions = () => {

    const inputRef = useRef(null);
    const containerRef = useRef(null);

    const [allMovies, setAllMovies] = useState([]);
    const [value, setValue] = useState("");
    const [searchedMovies, setSearchedMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [debouncedSearchValue] = useDebounce(value, 250);
    const [isOpen, setIsOpen] = useState(true);


    useEffect(() => {
        if(inputRef.current) {
            inputRef.current.focus()
        }
        loadTopMovies()
    }, [])
    useEffect(() => {
        if(debouncedSearchValue.length > 0) {
            getSearchMovie(debouncedSearchValue)
        } else {
            setSearchedMovies([]);
        }
    }, [debouncedSearchValue])
    // useEffect(() => {
    //     const handleClick = (e) => {
    //         if(containerRef.current && !containerRef.current.contains(e.target)) {
    //             setIsOpen(false)
    //         }
    //     }
    //     document.addEventListener("click", handleClick);
    //     return () => {
    //         document.removeEventListener("click", handleClick);
    //     }
    //
    // }, [])

    // useEffect(() => {
    //     const handleKeyDown = (e) => {
    //         if(e.key === "Escape") {
    //             setIsOpen(false);
    //         }
    //     }
    //     document.addEventListener("keydown", handleKeyDown);
    //     return () => {
    //         document.removeEventListener("keydown", handleKeyDown);
    //     }
    // }, [])
    // if(!isOpen) {return null}


    const loadTopMovies = async () => {
        if(isLoading || allMovies.length > 0) return;
        setIsLoading(true);
        try {
            const response = await movies({
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
        setIsLoading(true);
        try {
            const response = await searchMovies(searchQuery)
            setSearchedMovies(response.docs)
            console.log(response.docs)
        }
        catch(e) {
            setError(e.response.data)
        }
        finally {
            setIsLoading(false);
        }
    }

    const handleSearchSumbit = (e) => {
        e.preventDefault()
        if(value.trim().length > 0) {
            getSearchMovie(value)
        }
    }


    return (
        <div className={cl.searchContent} >
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
                     ref={containerRef}>
                    <ul className={cl.movieList}>
                        {(value.trim().length > 0 ? searchedMovies : allMovies).map(movie => {
                            if(!movie.name || movie.name.trim() === '') { return null }
                            return <li key={movie.id}
                                       className={cl.movieListItem}>
                                <Link
                                    to={`/movie/${movie.id}`}
                                    className={cl.movieLink}>
                                    <div className={cl.posterContainer}>
                                        {movie.poster?.previewUrl && (
                                            <img src={movie.poster?.previewUrl}
                                                 alt={movie.name}
                                                 className={cl.posterMovie}/>
                                        )}
                                    </div>
                                    <div>
                                        <h4> {movie.name} </h4>
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
                                        <p>{movie.alternativeName}</p>
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