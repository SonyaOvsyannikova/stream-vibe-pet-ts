import { kinopoiskAPI } from "@/shared/api/сlient.ts";

export const useGetMoviesLoader =  () => {

     const loadMovies = async (slug: string, limit: number) => {
        try {
            const response = await kinopoiskAPI.getSortedMoviesWithParametersSlug(slug, {
                limit: limit,
                sortField: 'year',
                sortType: 1
            })

            const arrId: Array<number> = response.docs.map(item => item.movie.id)

            const promises = await Promise.all(arrId.map(id => {
                return kinopoiskAPI.getMoviesId(id)
                    .then((data) => data)
                    .catch((e) => null)
            }))

            const combinedData = response.docs.map((serial, index) => {
                return({
                    ...serial,
                    details: promises[index]
                })
            })
            return combinedData

        } catch(e) {
            console.log(e)
        }
    }
    return { loadMovies }
}