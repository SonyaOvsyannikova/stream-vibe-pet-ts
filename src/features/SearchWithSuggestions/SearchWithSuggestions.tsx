import React, {ChangeEvent, useEffect, useRef, useState} from "react"
import {kinopoiskAPI} from "@/shared/api/сlient.js";
import { useDebounce } from "use-debounce";
import cl from './SearchWithSuggestions.module.scss';
import SearchInput from "@/shared/ui/SearchInput";
import { Link } from "react-router-dom";
import {useOutsideClick} from "@/shared/hooks/useOutsideClick.ts";

type SearchWithSuggestionsProps = {
    onClose: () => void;
}
type TMovie = {
    id: number,
    name: string,
    year: string,
    type: string,
    alternativeName: string,
    poster: TPoster,
    rating: TRating,
}
type TPoster = {
    previewUrl: string,
    url: string,
}
type TRating = {
    await?: number,
    filmCritics?: number,
    imdb?: number,
    kp?: number,
    russianFilmCritics?: number
}

const SearchWithSuggestions = (props: SearchWithSuggestionsProps) => {

    const {
        onClose,
    } = props;

    const outsideRef = useOutsideClick( () => {
        if (onClose) onClose();
    })

    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [value, setValue] = useState<string>("");
    const [allMovies, setAllMovies] = useState<TMovie[]>([]);
    const [searchedMovies, setSearchedMovies] = useState<TMovie[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>(null);
    const [debouncedSearchValue] = useDebounce<string | null >(value, 250);
    const abortControllerRef = useRef<AbortController | null>(null);


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

    const loadTopMovies  = async  () => {
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

    const handleSearchMovies = (event: ChangeEvent<HTMLInputElement>)  => {
        const dataInput = event.target.value;
        setValue(dataInput);
        console.log(dataInput);
    }
    const getSearchMovie = async (searchQuery: string):Promise<AbortController | void> => {

        if(isLoading) return;

        if(abortControllerRef.current) {
            abortControllerRef?.current.abort();
        }
        const controller = new AbortController();
        abortControllerRef.current = controller;

        setIsLoading(true);

        try {
            const response = await kinopoiskAPI.getSearchMovies(searchQuery,{
                signal: controller.signal,
                limit: 10,
            })
            setSearchedMovies(response.docs)
            console.log(response.docs)
        }
        catch(e: unknown) {
            if( e instanceof Error )
            {
                if (e.name === 'CanceledError' || e.name === 'AbortError') {
                    console.log('Запрос был отменён');
                } else {
                    console.log(e.message);
                }
            } else {
                console.log('неизвестная ошибка')
            }
        }
        finally {
            setIsLoading(false);
        }
        return controller;
    }


    const handleSearchSumbit = () => {
        if(value?.trim().length > 0) {
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