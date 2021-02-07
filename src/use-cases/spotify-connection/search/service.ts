import { resultInterface } from '@interfaces'
import axios from 'axios'
import queryString from 'query-string'

interface optionsInterface {
  token: string,
  q: string,
  type: string
}

const searchService = async (options: optionsInterface): Promise<resultInterface | any> => {
  const baseUrl = 'https://api.spotify.com/v1/search'

  const {
    q, type, token,
  } = options

  const searchUrl = queryString.stringifyUrl({
    url: baseUrl,
    query: {
      q, type,
    },
  })

  try {
    const result = await axios.get(searchUrl, { headers: { 'Authorization': `Bearer ${token}` } })
    return result.data
  } catch (error) {
    const result: resultInterface = {
      message: 'Falha ao buscar itens.',
      hasError: true,
    }
    return result
  }
}

export default searchService  
