import React from 'react'
import { fetchTransactions } from '../utils/api'

const styles = {
  img: {
    height: '70px',
    width: '70px'
  }
}

export default class Transaction extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id: '',
      name: '',
      description: '',
      amount: '',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/Monzo_logo.svg/1200px-Monzo_logo.svg.png',
      category: '',
      long: '',
      lat: '',
      spending: false,
    }
  }

  componentDidMount() {
    fetchTransactions(this.props.transaction.id)
      .then(t => {
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'GBP',
          minimumFractionDigits: 2
        })
        if(typeof t.transaction.merchant === 'object' && t.transaction.merchant !== null) {
          this.setState({
            id: t.transaction.id,
            name: t.transaction.merchant.name,
            description: t.transaction.description,
            amount: formatter.format(t.transaction.amount/100),
            logo: t.transaction.merchant.logo,
            category: t.transaction.category,
            long: t.transaction.merchant.address.longitude,
            lat: t.transaction.merchant.address.latitude,
            spending: t.transaction.include_in_spending
          })
        }
        else if(t.transaction.description.substring(0,3) === 'pot') {
          this.setState({
            id: t.transaction.id,
            description: 'Personal Pot',
            amount: formatter.format(t.transaction.amount/100),
            logo: 'https://image.freepik.com/free-vector/piggy-bank-icon-flat-design-illustration_168129-198.jpg',
            category: t.transaction.category,
          })
        }
        else {
          this.setState({
            id: t.transaction.id,
            description: t.transaction.description,
            amount: formatter.format(t.transaction.amount/100),
            logo: 'https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/money-with-wings.png',
            category: t.transaction.category,
          })
        }

      })
      .catch(error => console.log('error ' + error))
  }

  setActiveTransaction() {
    this.props.activeTrans(this.state)
  }

  render(){
    const {id, name, description, amount, logo, category, spending } = this.state
    if(name !== '') {
      return (
        <div className="transaction">
          <img style={styles.img} src={logo ? logo : 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a3/Monzo_logo.svg/1200px-Monzo_logo.svg.png' }/>
          <div className="inline-table">
            <table>
              <tr>
                <th>
                  <a className="transaction-link" onClick={()=> {this.setActiveTransaction()}}>
                  <h4>{name}</h4>
                  </a>
                </th>
                <th>
                  <span className={spending === true ? 'red' : 'green'}>{amount}</span>
                </th>
              </tr>
              <tr>
                <th>
                  <p>{description}</p>
                </th>
                <th>
                  <span>{category}</span>
                </th>
              </tr>
            </table>
          </div>
        </div>
      )
    } else {
      return (
        <div className="transaction">
          <img style={styles.img} src={logo}/>
          <div className="inline-table">
            <table>
              <tr>
                <th>
                  <h4>{description}</h4>
                </th>
                <th>
                  <span className={spending === true ? 'red' : 'green'}>{amount}</span>
                </th>
              </tr>
              <tr>
                <th className="cat-span">
                  <span>{category}</span>
                </th>
                <th>
                  <span></span>
                </th>
              </tr>
            </table>
          </div>
        </div>
      )
    }
  }
}