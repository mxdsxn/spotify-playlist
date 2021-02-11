import { errorHandler } from '@common'
import { resultInterface } from '@interfaces'
import axios from 'axios'
import queryString from 'query-string'

interface optionsInterface {
  token: string,
  q: string,
  type: string
}

const BASE_URL = 'https://api.spotify.com/v1/search'
const searchService = async (options: optionsInterface): Promise<resultInterface> => {
  const {
    q, type, token,
  } = options

  const searchUrl = queryString.stringifyUrl({
    url: BASE_URL,
    query: {
      q, type,
    },
  })

  try {
    const searchResult = await axios.get(searchUrl, { headers: { 'Authorization': `Bearer ${token}` } })
    const result: resultInterface = {
      resources: searchResult.data,
      statusCode: searchResult.status,
    }

    return result
  } catch (error) {
    return await errorHandler(error, 'spotify search items')
  }
}

export default searchService  
