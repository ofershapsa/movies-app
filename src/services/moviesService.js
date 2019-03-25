import axios from "axios"
import { Movie } from "../models/Movie"

const baseApi = "http://www.omdbapi.com/"
const apiKey = `2c7f5f8c`

export class MoviesService {
  static async getMovies() {
    const dummySearch = "dad"
    const url = `${baseApi}?apiKey=${apiKey}&s=${dummySearch}`
    const response = await axios(url)

    const movieTasks = response.data.Search.map(movie =>
      MoviesService.getMovieDetails(movie.imdbID)
    )
    const fullMovies = await Promise.all(movieTasks)

    const result = {
      count: response.data.totalResults,
      movies: fullMovies
    }

    return result
  }

  static async getMovieDetails(id) {
    const url = `${baseApi}?apiKey=${apiKey}&i=${id}`
    const response = await axios(url)
    return new Movie(
      response.data.imdbID,
      response.data.Title,
      response.data.Year,
      response.data.Runtime,
      response.data.Genre,
      response.data.Director,
      response.data.Poster
    )
  }
}
