import type { responseType } from "../models"

class MuvieService {
    _apiKey = "api_key=7ea6eda06e3a0abc87a489ba55981386"
    _baseUrl = "https://api.themoviedb.org/3"
    _lngUrl = "language=en-US"
    _imgUrl = "https://image.tmdb.org/t/p/original/"    

    getRecourses = async (url: string) => {
        const response = await fetch(url)
        if(!response.ok) {
            return new Error(`Could not fetch ${url} status: ${response.status}`)
        }
        return await response.json()
    }

    // getPopularMuvies = async (index = 1) => {
    //     return this.getRecourses(`${this._baseUrl}/movie/popular?${this._lngUrl}?&page=${index}&${this._apiKey}`)
    // }

    // getTopRatedMuvies = async (index = 1) => {
    //     return this.getRecourses(`${this._baseUrl}/movie/top_rated?${this._lngUrl}&page=${index}&${this._apiKey}`)
    // }

    // getPremiereMuvies = async (index = 1) => {
    //     return this.getRecourses(`${this._baseUrl}/movie/now_playing?${this._lngUrl}&page=${index}&${this._apiKey}`)
    // }

    getMuviesWithType = async (type: responseType, index = 1) => {
        return this.getRecourses(`${this._baseUrl}/movie/${type}?${this._lngUrl}&page=${index}&${this._apiKey}`)
    }

    // getUpcomingMuvies = async (index = 1) => {
    //     return this.getRecourses(`${this._baseUrl}/movie/upcoming?${this._lngUrl}&page=${index}&${this._apiKey}`)
    // }

    getDetailMuvie = async (id: string) => {
        return this.getRecourses(`${this._baseUrl}/movie/${id}?${this._lngUrl}&${this._apiKey}`)
    }

    searchMuviesWithGenres = async (genre_id: number | undefined, index: number = 1) => {
        return this.getRecourses(`${this._baseUrl}/discover/movie?${this._apiKey}&with_genres=${genre_id}&page=${index}`)
    }
    
    getGenres = async () => {
        return this.getRecourses(`${this._baseUrl}/genre/movie/list?${this._lngUrl}&${this._apiKey}`)
    }
}

export default MuvieService