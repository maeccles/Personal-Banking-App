import queryString from 'query-string'
const client_id = YOUR_CLIENT_ID
const client_secret = YOUR_CLIENT_SECRET
const redirect_uri = YOUR_REDIRECT_URI
const account_id = YOUR_ACCOUNT_ID
const pot_id = YOUR_POT_ID

export function getAuth(authorizationCode) {
  let data = {
    grant_type: "authorization_code",
    client_id: client_id,
    client_secret: client_secret,
    redirect_uri: redirect_uri,
    code: authorizationCode
  }
  let fetchData = {
    method: 'POST',
    body: queryString.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  return fetch('https://api.monzo.com/oauth2/token', fetchData)
    .then(response => response.json())
    .then((body) => {
      return body
    })
    .catch(error => console.log('error ' + error))
}

export function getTheAccounts(access_token) {
  return fetch(`https://api.monzo.com/transactions?account_id=${account_id}`, {
  headers: {
     Authorization: 'Bearer ' + access_token
   }})
    .then(response => response.json())
      .then((body) => {
        return body
        console.log(body)
      })
      .catch(error => console.log('error ' + error))
}

export function fetchTransactions(transaction_id) {
  return fetch(`https://api.monzo.com/transactions/${transaction_id}?expand[]=merchant`, {
    headers: {
      Authorization: 'Bearer ' + localStorage.monzo_access_token
    }
  })
    .then(response => response.json())
    .then(body => body)
}

export function depositTen(amount) {
  console.log('api '+amount)
  const depositData = {
    source_account_id: account_id,
    amount: amount,
    dedupe_id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }
  const depoistDataBody = {
    method: 'PUT',
    body: queryString.stringify(depositData),
    headers: {
      Authorization: 'Bearer ' + localStorage.monzo_access_token,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  return fetch(`https://api.monzo.com/pots/${pot_id}/deposit`, depoistDataBody)
    .then(response => response.json())
    .then((body) => {
      console.log(body)
      return body
    })
    .catch(error => console.log('error ' + error))
}

export function feedConfirm() {
  const body = {
    account_id: account_id,
    type: "basic",
    url: "",
  }
  const feedData = {
    method: 'POST',
    body: queryString.stringify(body) + '&params[body]=YOU%20DA%20MAN%21&params[image_url]=https%3A%2F%2Fmedia.tenor.com%2Fimages%2F337fc151c7cc7870c51be465bdc06ac2%2Ftenor.gif&params[title]=You%20added%2010%25%20to%20your%20savings%21&type=basic&url="',
    headers: {
      Authorization: 'Bearer ' + localStorage.monzo_access_token,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  console.log(feedData)
  return fetch('https://api.monzo.com/feed', feedData)
    .then((response) => response.json())
    .then(body => console.log(body))
    .catch(error => error)
}

