import axios from 'axios'
import Buffer from 'buffer'
import { urlencoded } from 'express'

const { CLIENT_ID, CLIENT_SECRET } = process.env
const REDIRECT_URI = 'http://localhost:1111/response-spotify/'

const getAppAuthorizationUrl = () => {
  const queryParams = {
    scopes: 'user-read-private user-read-email',
  }

  const query_login = 'https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + CLIENT_ID +
    '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
    '&scopes=' + encodeURIComponent(queryParams.scopes)

  return query_login
}

const getAppAuthenticationnUrl = async () => {
  const bodyParams = {
    grant_type: 'client_credentials',
    code: 'AQD25WzlX2ozKi_Yv1-blb6MZrVQu7omeGR5w_xQErYN5GLJumFS1YIbT0KhBUBJAzK95AkB3hzKbzQwRe0HKPzxa2VrtNVwmT6cnGKScvO884Pd0_GDUvyl-AVzOCA6raEpGFyNlxu-aAhYijkdl8F7f1Nsowsz4c6DtWeVe1WovC5GJSPwRRAndQ',
    redirect_uri: REDIRECT_URI,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  }

  const url_token = 'https://accounts.spotify.com/api/token'

  let result: any
  try {
    result = await axios.post(url_token, null, { params: bodyParams, })

    console.log('ok', result.data)

  } catch (error) {
    console.log('erro', error)

  }


  return result.data
}

export default {
  getAppAuthorizationUrl,
  getAppAuthenticationnUrl
}
