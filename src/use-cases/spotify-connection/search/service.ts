import { errorHandler } from '@common'
import { resultInterface } from '@interfaces'
import axios from 'axios'
import queryString from 'query-string'

interface optionsInterface {
  token: string,
  q: string,
  type: string
}

const TYPE_AVAILABLE = ['track', 'album', 'artist']
const BASE_URL = 'https://api.spotify.com/v1/search'
const searchService = async (options: optionsInterface): Promise<resultInterface> => {
  const {
    q, type, token,
  } = options

  const typesArray = type.split(',').filter((item) => {
    return TYPE_AVAILABLE.includes(item)
  }).join(',')

  if (typesArray.length < 1) {
    const result: resultInterface = {
      statusCode: 400,
      hasError: true,
      message: 'invalid search type.',
    }
    return result
  }

  const searchUrl = queryString.stringifyUrl({
    url: BASE_URL,
    query: {
      q,
      type: typesArray,
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
    return await errorHandler(error, 'spotify search items error.')
  }
}

export default searchService  
