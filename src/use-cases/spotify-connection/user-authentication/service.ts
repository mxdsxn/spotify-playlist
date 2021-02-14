import axios from 'axios'
import { envs } from '@config'
import { resultInterface } from '@interfaces'
import { errorHandler } from '@common'
import { UserSchema } from '@schemas'

const {
  SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTILIST_API_REDIRECT_URI,
} = envs

const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token'

const setUserAuthenticationToken = async (userId: string, codeAuthorization: string): Promise<resultInterface> => {
  const bodyParams = {
    client_id: SPOTIFY_CLIENT_ID,
    client_secret: SPOTIFY_CLIENT_SECRET,
    code: codeAuthorization,
    grant_type: 'client_credentials',
    redirect_uri: SPOTILIST_API_REDIRECT_URI,
  }

  try {
    const getTokenResult = await axios.post(SPOTIFY_TOKEN_URL, null, { params: bodyParams })

    const { data: { access_token } } = getTokenResult

    await UserSchema.findByIdAndUpdate(userId, { spotifyToken: access_token })

    const result: resultInterface = { statusCode: 200 }
    return result
  } catch (error) {
    return await errorHandler(error, 'spotify token error.')
  }
}

export default setUserAuthenticationToken
