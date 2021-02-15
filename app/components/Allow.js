import React from 'react'
import {Link} from 'react-router-dom'

export default class Allow extends React.Component {
  render() {
    return (
      <div>
          <h4>
            Please allow additional access your Monzo App
          </h4>
          <p>You have been sent a notification</p>
          <Link to="/dashboard">I've given permission in the Monzo App</Link>
        </div>
    )
  }
}