import React from 'react'
import PropTypes from 'prop-types'

export default class TransactionDetails extends React.Component {
  state = {
    transaction: this.props.activeTransaction
  }

  componentDidMount(){
    const t = this.props.activeTransaction
    this.setState({
      transaction: t
    })

  }

  render() {
    const {transaction} = this.props.activeTransaction
    console.log('yooo'+JSON.stringify(this.props.activeTransaction))
    return <h1> this {transaction} </h1>
  }
}

TransactionDetails.propTypes = {
  activeTransaction: PropTypes.object.isRequired
}