import {memo, use, useEffect, useMemo, useState, lazy, Suspense, useRef} from "react";
import cl from './ShowsPageMovie.module.scss'
import Tab from "@/shared/ui/Tab/Tab.tsx";
import { useInView } from 'react-intersection-observer';
import {MovieCollectionFromUseMovies, MovieWithCategory} from "@/shared/hooks/useMovie.ts";

type ShowsPageMovieProps = {
    groupedMovies: MovieCollectionFromUseMovies[],
    groupedLength: number,
    moviesTop: MovieWithCategory[],
}

const Movies = lazy(() => {
    console.log('Начинаем загрузку Movies в:', performance.now());
    return import("@/widgets/MoviesWidget/Movies.tsx").then(module => {
        console.log('✅ Movies загружен в:', performance.now());
        return module;
    });
});
const Shows = lazy(() => {
    console.log('Начинаем загрузку Shows в:', performance.now());
    return import("@/widgets/ShowsWidget/Shows.tsx").then(module => {
        console.log('✅ Shows загружен в:', performance.now());
        return module;
    });
});

const ShowsPageMovie = () => {

    const [activeTab, setActiveTab] = useState<number>(1)
    const [isTablet, setIsTablet] = useState<boolean>(false)


    useEffect(() => {
        const handleSize = () => {
            setIsTablet(window.innerWidth < 1024)
        }
        handleSize()
        window.addEventListener('resize', handleSize)
        return () => window.removeEventListener('resize', handleSize)
    }, [])

    const {ref: moviesRef, inView: moviesInView} = useInView({
        triggerOnce: true,
        rootMargin: '400px 0px',
        skip: isTablet
    })

    const {ref: showsRef, inView: showsInView} = useInView({
        triggerOnce: true,
        rootMargin: '400px 0px',
        skip: isTablet
    })


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
                <div className = {cl.moviePageTablet}>

                         <div
                             style={{
                                 minHeight: moviesInView ? 'auto' : '400px',
                             }}
                             ref={moviesRef}>
                                {moviesInView && (
                            <Suspense fallback={<div> Идет загрузка фильмов ...</div>}>
                                <Movies />
                            </Suspense>
                                )}
                        </div>

                        <div
                            style={{
                                minHeight: moviesInView ? 'auto' : '400px',
                            }}
                            ref={showsRef}>
                                {showsInView && (
                                <Suspense fallback={<div> Идет загрузка сериалов ...</div>}>
                                    <Shows />
                                </Suspense>
                                )}
                        </div>

                </div>
                ) : (
                <>
                    {(activeTab === 1) ? (
                        <>
                            <Suspense fallback={<div> Идет загрузка фильмов ...</div>}>
                                <Movies />
                            </Suspense>
                        </>
                    ): (
                        <>
                            <Suspense fallback={<div> Идет загрузка сериалов ...</div>}>
                                <Shows />
                            </Suspense>
                        </>
                    )}
                </>
            ) }

        </div>
    );
};

export default ShowsPageMovie;