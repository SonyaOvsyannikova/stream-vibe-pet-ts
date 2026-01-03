import { kinopoiskAPI } from "@/shared/api/сlient.ts";
import { Movie, MovieWithCategory } from "@/shared/hooks/useMovie.ts";

export const fetchSeriesOrMovies = async (slug: string, categorySlug: string, categoryName: string) => {
    const response = await kinopoiskAPI.getSortedMoviesWithParametersSlug(slug, {limit: 2});

    const arrId: number[] = response.docs.map((item: MovieWithCategory):number => item.movie.id)

    const promises = await Promise.all(arrId.map((id: number) => {
        return kinopoiskAPI.getMoviesId(id)
            .then((result: Movie) => result)
            .catch(() => null);
    }))
    const combinedData: MovieWithCategory[] = response.docs.map((item: Movie, index: number) => ({
        ...item,
        details: promises[index],
        category: {
            slug: categorySlug,
            name: categoryName,
        }
    }))
    return combinedData;
}