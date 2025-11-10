export interface IResponseApiSeasons {
    episodes: Episodes[]
    number: number
    id: number
    poster: string
    duration: number
    episodesCount: number
    name: string
    description: string
}
interface Episodes {
    number: number
    name: string
    description: string
    poster: string
    still: Still
}
interface Still {
    previewUrl: string
    url: string
}
