export interface IResponseApiEpisodeData {
    number: number;
    name: string
    description: string
}
export interface SelectedEpisode {
    episode: IResponseApiEpisodeData | MovieData
    episodeIndex: number
}
interface MovieData {
    id: number
    name: string
    number?: number
}
