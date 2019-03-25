import React from "react"

export class MovieEditor extends React.Component {
  state = {
    movie: {}
  }

  componentDidMount() {
    this.setState({ movie: { ...this.props.movie } })
  }

  handleFieldChange = fieldName => event => {
    const movie = { ...this.state.movie }
    movie[fieldName] = event.target.value
    this.setState({ movie })
    this.props.onMovieChange(movie)
  }

  render() {
    const { movie } = this.state
    return (
      <div>
        <h2 className="title">Edit movie details</h2>
        <div className="field">
          <label htmlFor="" className="label">
            Title
          </label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Title"
              value={movie.title}
              onChange={this.handleFieldChange("title")}
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="" className="label">
            Director
          </label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Director"
              value={movie.director}
              onChange={this.handleFieldChange("director")}
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="" className="label">
            Year
          </label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Year"
              value={movie.year}
              onChange={this.handleFieldChange("year")}
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="" className="label">
            Genre
          </label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Genre"
              value={movie.genre}
              onChange={this.handleFieldChange("genre")}
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="" className="label">
            Runtime
          </label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Runtime"
              value={movie.runtime}
              onChange={this.handleFieldChange("runtime")}
            />
          </div>
        </div>
      </div>
    )
  }
}
