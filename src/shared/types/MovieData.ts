export interface IResponseApiMovie {
    id: number
    name?: string
    alternativeName?: string
    type?: string
    persons?: Person[]
    year?: number
    names?: Name[]
    rating?: Rating
    genres?: Genre[]
    backdrop: Backdrop
    description?: string
    logo?: Logo
    poster: Backdrop
}
interface Person {
    id: number
    name?: string
    profession?: string
    photo?: string

}
export interface Name {
    name: string
    language?: string
    type?: string | null
}
export interface Rating {
    await?: number | null
    kp?: number | null
    imdb?: number | null
    filmCritics?: null | number
    russianFilmCritics?: null | number,
}
interface Genre {
    name?: string
}
interface Backdrop {
    previewUrl: string
    url: string
}
type Logo = {
    previewUrl: string
    url: string
}