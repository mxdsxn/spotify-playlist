import { envs } from '@config'

const {
  CLIENT_ID, CLIENT_SECRET,
} = envs
const REDIRECT_URI = 'http://localhost:1111/spotify-connection/spotilist-callback-url/'

const getAppAuthorizationUrl = async (): Promise<string> => {
  const queryParams = {
    scope:
      [
        'user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private', 'playlist-read-private', 'playlist-read-collaborative',
      ],
  }

  const authorizationUrl = 'https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
    '&client_id=' + CLIENT_ID +
    '&client_secret=' + CLIENT_SECRET +
    '&scope=' + encodeURIComponent(queryParams.scope.join(' ')) +
    '&state=34fFs29kd09'

  return authorizationUrl
}

export default { getAppAuthorizationUrl }
