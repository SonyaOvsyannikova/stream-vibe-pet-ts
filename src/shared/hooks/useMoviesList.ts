import {kinopoiskAPI} from "@/shared/api/сlient.ts";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";


export type MovieData = {
    movie: Movie;
    position?: number;
    positionDiff?: number;
    details?: Movie;
}
export type Movie = {
    id?: number;
    name?: string;
    year?: number;
    poster?: {
        url: string;
        previewUrl: string;
    },
    movieLength?: number;
    rating?: {
        kp: number;
    },
    premiere?: {
        world: Date,
    }
    seasonsInfo?: Array<SeasonInfo>,
    votes?: {
        kp?: number;
    },
    seriesLength?: number;


}
export type SeasonInfo = {
    number?:number,
    episodesCount?:number,
}

const fetchMovies  = async (slug: string) => {
    try {
        const response = await kinopoiskAPI.getTopMovies(slug, {
            sortField: "name",
            limit: 10,
            sortType: 1,
        })

        return response.docs || [];
    }
    catch (error) {
        console.error(error)
        throw new Error("Could not fetch movies info")
    }
}

const useMoviesList = () => {

    const {data: moviesTop, isLoading: isMovieLoading } = useQuery<MovieData[]>({
        queryKey: ['moviesTop'],
        queryFn: () => fetchMovies('top250'),

        staleTime: 12 * 60 * 60 * 1000, // 12 часов данные "свежие"
        gcTime: 24 * 60 * 60 * 1000,    // 24 часа хранить в кеше

        refetchOnWindowFocus: false,    // не обновлять при фокусе окна
        refetchOnMount: false,          // не обновлять при монтировании
        refetchOnReconnect: false,      // не обновлять при reconnect
    })

    return {
        fetchMovies,
        moviesTop,
    };
};

export default useMoviesList;