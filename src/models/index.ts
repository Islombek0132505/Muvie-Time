export interface IData {
    page: number
    results: IMuvies[]
    total_pages: number
}

export interface IMuvies {
    adult: boolean
    backdrop_path: string
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
    genre_ids: [number]
}

export interface IMuvieDetail {
    adult: boolean
    backdrop_path: string
    id: number
    genres: [
        {name: string}
    ]
    genre_ids: [number]
    runtime: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

export interface IGenresData {
    genres: [IGenre]
}

export interface IGenre {
    id: number
    name: string
}

export type responseType = "popular" | "top_rated" | "now_playing" | "upcoming"
