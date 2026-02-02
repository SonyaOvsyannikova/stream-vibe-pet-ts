export type IResponseApiMovie = {
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
  docs: Docs[]
}
type Docs = {
  id?: number
  genres?: Genre[]
  poster?: Backdrop
  rating?: Rating
  year?: number
  name?: string
  alterNativeName?: string
  backdrop?: Backdrop
}
type Person = {
  id: number
  name?: string
  profession?: string
  photo?: string
}
export type Name = {
  name: string
  language?: string
  type?: string | null
}
export type Rating = {
  await?: number | null
  kp?: number | null
  imdb?: number | null
  filmCritics?: null | number
  russianFilmCritics?: null | number
}
type Genre = {
  name?: string
}
type Backdrop = {
  previewUrl: string
  url: string
}
type Logo = {
  previewUrl: string
  url: string
}
