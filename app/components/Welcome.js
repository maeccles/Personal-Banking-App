import React from 'react'
import queryString from 'query-string'
import {getAuth, getTheAccounts} from '../utils/api'
import Accounts from './Accounts'

export default class Welcome extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      authcode: ''
    }

    this.getAccounts = this.getAccounts.bind(this)
  }
  getAccounts() {
    let authcode = this.state.authcode
    getTheAccounts(authcode)
      .then(response => console.log(response))
      .catch(error => console.log('gettheaccounts: ' + error))
  }

  componentDidMount() {
    const params = queryString.parse(window.location.search)
    getAuth(params.code)
      .then((body) => {
        localStorage.setItem('monzo_access_token', body.access_token)
        window.location.href = '/allow'
        })
      .catch(error => console.log(error))
  }
  render() {
    const access_token = this.state.authcode
    return(
      <div>

      </div>
    )
  }
}