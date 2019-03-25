import React from "react"

const missingPicture =
  "https://www.nationalpetregister.org/assets/img/no-photo.jpg"

export class MovieItem extends React.Component {
  handleDelete = () => {
    const { movie } = this.props
    this.props.handleDelete(movie.id)
  }

  handleEdit = () => {
    const { movie } = this.props
    this.props.handleEdit(movie.id)
  }

  render() {
    const { movie } = this.props
    return (
      <div className="column is-one-quarter">
        <div className="card">
          <div className="card-image">
            <div className="image is-4by3">
              <img src={movie.poster || missingPicture} alt="movie" />
            </div>
          </div>
          <div className="card-content">
            <div className="media-content">
              <div className="title is-4">{movie.niceTitle()}</div>
              <div className="subtitle is-6">{movie.director}</div>
            </div>
          </div>
          <div className="card-footer">
            <span className="icon" onClick={this.handleEdit}>
              <i className="fas fa-edit" />
            </span>
            <span className="icon" onClick={this.handleDelete}>
              <i className="fas fa-trash" />
            </span>
          </div>
        </div>
      </div>
    )
  }
}
