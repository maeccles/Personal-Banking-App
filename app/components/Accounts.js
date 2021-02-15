import React from 'react'
import queryString from 'query-string'
import {getAuth, getTheAccounts} from '../utils/api'

export default class Accounts extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      transactions: []
    }
  }

  componentDidMount(){
    getTheAccounts(this.props.auth)
      .then(response => {
        this.setState({
          transactions: response.splice(0,100)
        })
      })
  }

  render() {
    const {transactions} = this.state
    return (
      <div>
      <h1> Transactions </h1>
        {transactions.map((transaction) => {
          <div>
            <h1>{transaction.amount}</h1>
            <h4>{transaction.description}</h4>
          </div>
        })}

      </div>
    )
  }
}