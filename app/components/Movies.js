import React from 'react'
import MovieInput from './MovieInput'
import Login from './Login'
import PropTypes from 'prop-types'

function CreateList({array}) {
    return(
      <ul>
      {array.map((movie => (
        <li key={movie.name}>
            <h1>{movie.name}</h1>
            <p>Duration: {movie.duration}</p>
        </li>
      )))}
      </ul>
    )
}


export default class Movies extends React.Component {
  constructor(props) {
    super(props)

    this.state= {
      movies: [
        {name: 'Die Another Day', duration: '50 mins'},
        {name: 'Jaws', duration: '25 mins'},
        {name: 'Modern Family', duration: '55 mins'},
        {name: 'Superman', duration: '50 mins'},
      ]
    }

    this.addMovie = this.addMovie.bind(this)
  }

  addMovie(movie){
    this.setState({
      movies: [
        ...this.state.movies,
        movie
      ]
    })

  }

  render() {

    return(
      <div>
        <CreateList array= {this.state.movies} />
        <MovieInput addMovie={this.addMovie}/>
        <Login/>
      </div>
    )
  }
}