import React from 'react';
//import './index.css';

export default class Login extends React.Component {

  render() {
    const client_id = "oauth2client_0000A3J0zyLSlxFYZPw7EX"
    const redirect_uri = "http://localhost:8080/callback"
    const client_secret = "mnzpub.TU3wVQ4HiX/sytoxNrK6OnsfyHddoXj+HZWrEFH0ynkNiEUvwNoMTKfFQ9P7VVzfkpFqikWYPQv44BL1Vk7v/A=="

    return (
      <div className="mzw-login">
        <div className="mzw-login__info">
        </div>
        <div className="mzw-login__form">
          <h1>Log in</h1>
          <p>
            Authorize Monzo Web to use your Monzo account.
          </p>
          <a className="mzw-button" href={`https://auth.monzo.com/?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&state=sgdhfgjhresdhfgs`}>
            Authorize with Monzo
          </a>
        </div>
      </div>
    );
  }
}