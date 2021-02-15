import React from 'react'
import {getAuth, getTheAccounts, depositTen, feedConfirm} from '../utils/api'
import Transaction from './Transaction'
import Loading from './Loading'
import TransactionMap from './Map'
import TransactionDetails from './TransactionDetails'
import {Link} from 'react-router-dom'
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps'

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      transactions: [],
      loading: true,
      searchString: '',
      searchResults: [],
      activeTransaction: {},
    }
    this.activeTrans = this.activeTrans.bind(this)
  }

  logout() {
    localStorage.clear()
    window.location.href = '/'
  }

  searchTransactions = event => {
    event.preventDefault()

    const searchtransactions = JSON.parse(localStorage.getItem('transactions') || "[]")
    const searchstring = this.state.searchString
    const resultsArray = []
    for(let i=0; i < searchtransactions.length; i++){
      if(searchtransactions[i].description.toLowerCase().includes(searchstring.toLowerCase())) {
        resultsArray.push(searchtransactions[i])
      }
       this.setState({
          searchResults: resultsArray
        })
    }
  }

  handleChange = (event) => {
    this.setState({
      searchString: event.target.value
    })
  }

  resetSearch() {
    location.reload();
  }

  clearSearch() {
    this.setState({
      searchString: ''
    })
    location.reload()
  }

  activeTrans(transaction) {
    this.setState({
      activeTransaction: transaction
    })
  }

  triggerDeposit() {
    const amountText = this.state.activeTransaction.amount.substring(2)
    const fullAmount = parseFloat(amountText)
    const amount = (fullAmount*10).toFixed(0)
    console.log(amount)
    depositTen(amount)
    feedConfirm()
  }

  componentDidMount(){
    if(localStorage.getItem('transactions') !== null) {
      this.setState({
        loading: false
      })
    } else {
      getTheAccounts(localStorage.monzo_access_token)
      .then(data => {
        const ordered = data.transactions.reverse()
        const ordered100 = ordered.splice(0,200)
        this.setState({
          transactions: ordered100,
          loading: false
        })
        localStorage.setItem('transactions', JSON.stringify(ordered100))
      })
      .catch(error => console.log(error))
    }
  }

  render() {
    const {loading, searchResults, activeTransaction} = this.state
    const transactions = JSON.parse(localStorage.getItem('transactions') || "[]")
    const long = activeTransaction.long
    const lat = activeTransaction.lat
    const logo = activeTransaction.logo
    if (loading === true) {
      return <Loading text={"Fetching Data"} speed={300}/>
    }
    if(searchResults.length > 0) {
      return(
        <React.Fragment>
          <div className="top-bar">
            <button className="details" onClick={() => {this.logout()}}>Logout</button>
          </div>
          <div className="transactions-block">
           <form onSubmit={this.searchTransactions}>
            <input type='text'
                id='searchString'
                placeholder='Search...'
                autoComplete='off'
                //STEP 4: which updates the value of the input field
                value={this.state.searchString}
                //STEP 1: when user types something in input box
                onChange={this.handleChange}/>
            <button type="submit">Search</button>
          </form>
          <a className="clear" onClick={()=>{this.clearSearch()}}>clear</a>
          <div className="transactions">
            {searchResults.map((searchTransaction) => {
                return <Transaction key={searchTransaction.id} activeTrans={this.activeTrans} transaction={searchTransaction}/>
            })}
          </div>
          </div>
          <div className="info">
              {activeTransaction.name ? <h1>{activeTransaction.name}</h1> :<h2>{activeTransaction.description}</h2>}
              {activeTransaction.name && <p>{activeTransaction.description}</p>}
              {activeTransaction.category && <p>{activeTransaction.category}</p>}
              {activeTransaction.amount && <h4>{activeTransaction.amount}</h4>}
              {activeTransaction.lat && <TransactionMap lat={lat} long={long} logo={logo}/>}
              {activeTransaction.amount && <button onClick={() => this.triggerDeposit()} className="pot-button">Add 10% of amount to Savings Pot</button>}
          </div>
        </React.Fragment>
      )

    }
    return (
      <React.Fragment>
          <div className="top-bar">
            <button className="details" onClick={() => {this.logout()}}>Logout</button>
          </div>

          <div className="transactions-block">
          <b>Search Transactions</b>
            <form onSubmit={this.searchTransactions}>
              <input type='text'
                  id='searchString'
                  placeholder='Search...'
                  autoComplete='off'
                  //STEP 4: which updates the value of the input field
                  value={this.state.searchString}
                  //STEP 1: when user types something in input box
                  onChange={this.handleChange}/>
              <button type="submit">Search</button>
            </form>
            {transactions.map((transaction) => {
              const transID = transaction.id
                return (
                  <Transaction key={transaction.id} activeTrans={this.activeTrans} transaction={transaction}/>
                )
              })}
          </div>
          <div className="info">
              {activeTransaction.name ? <h1>{activeTransaction.name}</h1> :<h2>{activeTransaction.description}</h2>}
              {activeTransaction.name && <p>{activeTransaction.description}</p>}
              {activeTransaction.category && <p>{activeTransaction.category}</p>}
              {activeTransaction.amount && <h4>{activeTransaction.amount}</h4>}
              {activeTransaction.lat && <TransactionMap lat={lat} long={long} logo={logo}/>}
              {activeTransaction.amount && <button onClick={() => this.triggerDeposit()} className="pot-button">Add 10% of amount to Savings Pot</button>}
          </div>

        </React.Fragment>
    )
  }
}