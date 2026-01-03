import { kinopoiskAPI } from "@/shared/api/сlient.ts";
import { useQueries } from "@tanstack/react-query";
import { genreSlugs } from "@/shared/hooks/useMoviesGrouped.ts";



const UseOurGenres = (enabled = false) => {

    const firstPageQueries = Object.entries(genreSlugs).map(([key, genre]) => ({
        queryKey: ['genre-page1', genre.slug],
        queryFn: () => kinopoiskAPI.getSortedMoviesWithParametersSlug(genre.slug, { limit: 2 }),
        enabled,
    }))
    const firstResults = useQueries({queries: firstPageQueries})

    const groupedMoviesPageOne = Object.entries(genreSlugs).map(([key, genre], index) => ({
        id: key,
        name: genre.name,
        slug: genre.slug,
        movies: firstResults[index]?.data?.docs?.map(doc => doc.movie || doc) || [],
        nextMovies: [],
    }));

    return {
        groupedMoviesPageOne,
        isLoadingPageOne: firstResults.some(r => r.isLoading),
        isError: firstResults.some(r => r.isError)
    }
};

export default UseOurGenres;