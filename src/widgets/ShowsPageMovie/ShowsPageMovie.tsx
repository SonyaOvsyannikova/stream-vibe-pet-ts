import {memo, use, useEffect, useMemo, useState} from "react";
import {GroupedMovies, Movie, MovieCollection} from '@/shared/hooks/useMovies'
import  { MovieData } from '@/shared/hooks/useMoviesList'
import cl from './ShowsPageMovie.module.scss'
import ShowsWidget from "@/widgets/ShowsWidget";
import MoviesWidget from "@/widgets/MoviesWidget";
import Tab from "@/shared/ui/Tab/Tab.tsx";


type ShowsPageMovieProps = {
    groupedMovies: MovieCollection[],
    groupedLength: number,
    moviesTop: MovieData[],
}

const ShowsPageMovie = memo((props: ShowsPageMovieProps) => {

    const [activeTab, setActiveTab] = useState<number>(1)
    const [isTablet, setIsTablet] = useState<boolean>(false)

    const {
        groupedMovies,
        groupedLength,
        moviesTop
    } = props;

    useEffect(() => {
        const handleSize = () => {
            setIsTablet(window.innerWidth < 1024)
        }
        handleSize()
        window.addEventListener('resize', handleSize)
        return () => window.removeEventListener('resize', handleSize)
    }, [])


    return (
        <div className={cl.moviePage}>
            {isTablet && (
                <Tab classNameForTab={cl.moviePageTab}
                     classNameForButton = {cl.moviePageButton}
                    labels={[{id: 1, label: 'Movies'}, {id: 2, label: 'Shows'}]} onChange={(id) => {
                    setActiveTab(id)
                }} />
            )}
            {!isTablet ? (
                <>
                    <MoviesWidget groupedMovies={groupedMovies} groupedLength={groupedLength} moviesTop={moviesTop} />
                    <ShowsWidget groupedMovies={groupedMovies}/>
                </>
                ) : (
                <>
                    {(activeTab === 1) ? (
                        <>
                            <MoviesWidget groupedMovies={groupedMovies} groupedLength={groupedLength} moviesTop={moviesTop} />
                        </>
                    ): (
                        <>
                            <ShowsWidget groupedMovies={groupedMovies}/>
                        </>
                    )}
                </>
            ) }

        </div>
    );
});

export default ShowsPageMovie;