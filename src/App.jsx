import React, { Component } from "react"
import { MoviesOverview } from "./components/MoviesOverview"
import "./App.css"

class App extends Component {
  render() {
    return (
      <div className="App">
        <section className="section">
          <div className="container">
            <MoviesOverview />
          </div>
        </section>
      </div>
    )
  }
}

export default App
