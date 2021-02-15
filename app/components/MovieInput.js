import React from 'react'
import PropTypes from 'prop-types'
import { fetchAuth } from '../utils/api'

export default class MovieInput extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      name: '',
      duration: ''
    }
    this.baseState = this.state

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleDurationChange = this.handleDurationChange.bind(this)
  }



  handleSubmit(event){
    event.preventDefault();
    this.props.addMovie(this.state)
    this.setState({
      name: ' ',
      duration: ' '
    })

  }

  handleTitleChange(event) {
    this.setState({
      name: event.target.value,

    })
  }

  handleDurationChange(event) {
    this.setState({
      duration: event.target.value,
    })
  }

  render() {
    return(
      <React.Fragment>
        <form className='column player' onSubmit={this.handleSubmit}>
        <label className='label' htmlFor='username'>
          {this.props.label}
        </label>
        <div className='row player-inputs'>
          <input
            type='text'
            id='title'
            className='input-light'
            placeholder='Movie Title'
            autoComplete='off'
            //STEP 4: which updates the value of the input field
            value={this.state.title}
            //STEP 1: when user types something in input box
            onChange={this.handleTitleChange}
          />
          <input
            type='text'
            id='duration'
            className='input-light'
            placeholder='Movie Duration'
            autoComplete='off'
            //STEP 4: which updates the value of the input field
            value={this.state.duration}
            //STEP 1: when user types something in input box
            onChange={this.handleDurationChange}
          />
          <button
            className='btn btn-dark'
            type='submit'
            disabled={!this.state.username && !this.state.duration}
          >
          Submit
          </button>
        </div>
      </form>
      </React.Fragment>
    )
  }
}

MovieInput.propTypes = {
  addMovie: PropTypes.func.isRequired
}