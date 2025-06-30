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

    searchMuvieWithName = async (name: string, index = 1) => {
        return this.getRecourses(`${this._baseUrl}/search/movie?${this._apiKey}&query=${name}&page=${index}`)
    }

    getMuvieWithGenre = async (id: number, index = 1) => {
        return this.getRecourses(`${this._baseUrl}/discover/movie?${this._apiKey}&with_genres=${id}&${this._lngUrl}&page=${index}`)
    }

    getMuvieWithGenres = async (genres: number[], index = 1) => {
        return this.getRecourses(`${this._baseUrl}/discover/movie?${this._apiKey}&with_genres=${genres.join(",")}&${this._lngUrl}&page=${index}`)
    }

    getMuviesWithType = async (type: responseType, index = 1) => {
        return this.getRecourses(`${this._baseUrl}/movie/${type}?${this._lngUrl}&page=${index}&${this._apiKey}`)
    }

    getDetailMuvie = async (id: string) => {
        return this.getRecourses(`${this._baseUrl}/movie/${id}?${this._lngUrl}&${this._apiKey}`)
    }

    getSimilarMuvies = async (muvie_id: number) => {
        return this.getRecourses(`${this._baseUrl}/movie/${muvie_id}/similar?language=en-US&page=1&${this._apiKey}`)
    }
    
    getGenres = async () => {
        return this.getRecourses(`${this._baseUrl}/genre/movie/list?${this._lngUrl}&${this._apiKey}`)
    }
}

export default MuvieService