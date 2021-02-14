import queryString from 'query-string'
import getAppAuthorizationUrl from '../service'

jest.setTimeout(30000000)
jest.mock('query-string')

describe('App authorization', () => {
  afterEach(async () => { jest.clearAllMocks() })

  it('Get a url authorization.', async () => {
    const appUrlAuthorization = await getAppAuthorizationUrl()

    const parsedUrl = queryString.parseUrl(appUrlAuthorization.resources)
    console.log(appUrlAuthorization)

    expect(appUrlAuthorization.statusCode).toEqual(200)
    expect(parsedUrl).toEqual(expect.objectContaining({
      url: 'https://accounts.spotify.com/authorize',
      query: {
        client_id: expect.any(String),
        redirect_uri: expect.any(String),
        response_type: expect.any(String),
        scope: expect.any(String),
        state: expect.any(String),
      },
    }))
  })

  it.only('Get app authorization url error.', async () => {
    queryString.stringifyUrl = jest.fn().mockImplementationOnce(() => {
      throw new Error('Error Test')
    })

    const appUrlAuthorization = await getAppAuthorizationUrl()

    expect(appUrlAuthorization.statusCode).toEqual(500)
    expect(appUrlAuthorization.message).toEqual('app authorization error.')
  })
})
