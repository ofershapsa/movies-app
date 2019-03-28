export class Movie {
  constructor(id, title, year, runtime, genre, director, poster) {
    this.id = id
    this.title = title
    this.year = year
    this.runtime = runtime
    this.genre = genre
    this.director = director
    this.poster = poster
  }

  niceTitle() {

    const clean = this.title.replace(/[^A-Za-z0-9 .]/g, "")
    const low = clean.toLowerCase().trim()
    const nice = this.toTitleCase(low)

    console.log({ title: this.title, clean, low, nice })
    return nice
  }

  toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
}
