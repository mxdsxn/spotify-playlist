import axios from 'axios'
import searchService from '../service'
import searchResultMocked from './mocks/searchResultMocked.json'

jest.setTimeout(30000000)
jest.mock('axios')

describe('Search item in Spotify', () => {
  beforeEach(async () => { jest.clearAllMocks() })

  it('Search music', async () => {
    const searchOption = {
      q: 'Djonga',
      type: 'track',
      token: 'access_token',
    }

    axios.get = jest.fn().mockImplementationOnce(() => searchResultMocked)

    const result = await searchService(searchOption)

    expect(result).toEqual({
      statusCode: searchResultMocked.status,
      resources: searchResultMocked.data,
    })
  })

  it('Search music with wrong type', async () => {
    const searchOptions = {
      q: 'Djonga',
      type: 'episode',
      token: 'access_token',
    }

    const result = await searchService(searchOptions)
    expect(result).toEqual(expect.objectContaining({
      statusCode: 400,
      message: 'invalid search type.',
    }))
  })

  it('Search music error.', async () => {
    const searchOptions = {
      q: 'Djonga',
      type: 'track',
      token: 'access_token',
    }

    axios.get = jest.fn().mockRejectedValueOnce(new Error('Error Test'))

    const result = await searchService(searchOptions)
    expect(result).toEqual(expect.objectContaining({
      statusCode: 500,
      message: 'spotify search items error.',
      hasError: true,
    }))
  })
})
