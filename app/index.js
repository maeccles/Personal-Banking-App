import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.css'
import Login from './components/Login'
import Welcome from './components/Welcome'
import Dashboard from './components/Dashboard'
import Allow from './components/Allow'
import {BrowserRouter as Router, Switch, Redirect, Route} from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <Router>

        <nav className='header row space-between'>
          <div className='container'>
            <img src="https://aws1.discourse-cdn.com/monzo/original/3X/c/b/cb04bb110e959e20561779ec79407107dbd9378a.png"/><br/>
          </div>
        </nav>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/callback" component={Welcome} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/allow" component={Allow} />
          </Switch>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)