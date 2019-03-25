import React from "react"
import { MoviesService } from "../services/moviesService"
import { MovieItem } from "./MovieItem"
import { MovieEditor } from "./MovieEditor"
import { Movie } from "../models/Movie"
import { ulid } from "ulid"

export class MoviesOverview extends React.Component {
  state = {
    movies: [],
    count: 0,
    movieToDelete: null,
    movieToEdit: null,
    editedMovie: null
  }

  async componentDidMount() {
    const { movies, count } = await MoviesService.getMovies()

    this.setState({
      movies,
      count,
      movieToEdit: movies[0] // TODO: Remove
    })
  }

  getMovieById(id) {
    return this.state.movies.find(t => t.id === id)
  }

  handleEdit = id => {
    const movie = this.getMovieById(id)
    this.setState({
      movieToEdit: movie
    })
  }

  handleDelete = id => {
    const movie = this.getMovieById(id)
    this.setState({
      movieToDelete: movie
    })
  }

  resetMovieToDelete = () => {
    this.setState({
      movieToDelete: null
    })
  }
  resetMovieToEdit = () => {
    this.setState({
      movieToEdit: null
    })
  }
  deleteSelectedMovie = () => {
    this.setState({
      movies: this.state.movies.filter(
        t => t.id !== this.state.movieToDelete.id
      ),
      movieToDelete: null
    })
  }

  handleMovieChange = movie => {
    this.setState({
      editedMovie: movie
    })
  }

  saveMovie = () => {
    const id = this.state.editedMovie.id
    const { title, director, runtime, genre, year } = this.state.editedMovie
    const movie = this.getMovieById(id)
    movie.title = title
    movie.director = director
    movie.runtime = runtime
    movie.year = year
    movie.genre = genre

    this.setState({ movieToEdit: null })
  }

  handleAdd = () => {
    const newMovie = new Movie(ulid(), "", "", "", "", "", "")
    const { movies } = this.state
    movies.push(newMovie)

    this.setState({ movieToEdit: newMovie, movies })
  }

  render() {
    const { movieToDelete, movieToEdit } = this.state

    return (
      <div className="container">
        <h1 className="title">Herolo Movies</h1>
        <div>
          <button className="button is-info" onClick={this.handleAdd}>
            Add
          </button>
        </div>
        {`We found ${this.state.count} movies`}
        <div className="columns is-multiline">
          {this.state.movies.map(movie => (
            <MovieItem
              key={movie.id}
              movie={movie}
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
            />
          ))}
        </div>
        {movieToDelete && (
          <div className="modal is-active">
            <div className="modal-background" />
            <div className="modal-card">
              <section className="modal-card-body">
                {`Are you sure you want to delete ${movieToDelete.title} ?`}
              </section>
              <footer className="modal-card-foot">
                <button
                  className="button is-danger"
                  onClick={this.deleteSelectedMovie}
                >
                  Delete!
                </button>
                <button className="button" onClick={this.resetMovieToDelete}>
                  Cancel
                </button>
              </footer>
            </div>
            <button className="modal-close is-large" aria-label="close" />
          </div>
        )}
        {movieToEdit && (
          <div className="modal is-active">
            <div className="modal-background" />
            <div className="modal-card">
              <section className="modal-card-body">
                <MovieEditor
                  movie={movieToEdit}
                  onMovieChange={this.handleMovieChange}
                />
              </section>
              <footer className="modal-card-foot">
                <button className="button is-success" onClick={this.saveMovie}>
                  Save changes
                </button>
                <button className="button" onClick={this.resetMovieToEdit}>
                  Cancel
                </button>
              </footer>
            </div>
            <button className="modal-close is-large" aria-label="close" />
          </div>
        )}
      </div>
    )
  }
}
