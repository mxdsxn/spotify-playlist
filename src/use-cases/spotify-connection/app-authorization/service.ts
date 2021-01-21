import axios from 'axios'

const {
  CLIENT_ID, CLIENT_SECRET,
} = process.env
const REDIRECT_URI = 'http://localhost:1111/response-spotify/'

const getAppAuthorizationUrl = () => {
  const queryParams = { scopes: 'user-read-private user-read-email' }

  const query_login = 'https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + CLIENT_ID +
    '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
    '&scopes=' + encodeURIComponent(queryParams.scopes)

  return query_login
}

export default { getAppAuthorizationUrl }
