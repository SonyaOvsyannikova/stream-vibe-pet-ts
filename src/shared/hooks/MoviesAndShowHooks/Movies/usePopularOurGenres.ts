import { kinopoiskAPI } from "@/shared/api/сlient.ts";
import { useQueries } from "@tanstack/react-query";
import { genreSlugs } from "@/shared/hooks/useMoviesGrouped.ts";

const UsePopularOurGenres = (enabled = false) => {

    const secondPageQueries = Object.entries(genreSlugs).map(([key, genre], index) => ({
        queryKey: ['genre-2', genre.slug, 'page-2'],
        queryFn: async () => {
            const firstPage = await kinopoiskAPI.getSortedMoviesWithParametersSlug(genre.slug, {
                limit: 4,
            })
            if (!firstPage.next) throw new Error('Нет второй страницы');

            return kinopoiskAPI.getSortedMoviesWithParametersSlug(genre.slug, {
                limit: 4,
                next: firstPage.next
            });
        },
        enabled
    }))

    const secondResults = useQueries({queries: secondPageQueries})

    const groupedMoviesPageTwo = Object.entries(genreSlugs).map(([key, genre], index) => ({
        id: key,
        name: genre.name,
        slug: genre.slug,
        movies: [],
        nextMovies: secondResults[index]?.data?.docs?.map(doc => doc.movie || doc) || [],
    }));

    return {
        groupedMoviesPageTwo,
        isLoadingPageTwo: secondResults.some(r => r.isLoading),
        isError: secondResults.some(r => r.isError),
    }
};

export default UsePopularOurGenres;