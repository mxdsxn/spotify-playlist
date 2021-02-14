import axios from 'axios'
import setUserAuthenticationToken from '../service'
import { UserSchema } from '@schemas'
import tokenResponseMocked from './mocks/mockUserAuthentication.json'

jest.setTimeout(30000000)
jest.mock('axios')
jest.mock('@schemas')

const USER_ID = '60248cbb6e86512285578a04'
const AUTHORIZATION_CODE = 'AQA8EV_K8I61yOS3G-OXb6F9YkGUOO1Mgvb-TMa0NkLe6pQwAlW5UO4q1MavZ5D3dCoUVGrJ_HwOxduO9Vg64JouHCzFem09f2fW-ibPnGr85EPzfz7w6BDngtPoZvPKuVpUfWLDbc64YtSFO1gMe4xDtiQOUdTm5hQRLrSvscnH3QNIB--KfvhW2uRTw7B7bG6Pt51WRK2_BEfNmw0Or9uUNkwqW4kzwzbqSmmZQowt6hmOYC4xhMN_ZpGm6WD2VtB9mLx9NSqBIBVEaChZdF-3Ql9R_H1C2gvEu4_VywwLr533SDqk0QyRbG4fFqaaBhoiZIharRfDV_t-5qI_HgvV09OnH8tAUH0q1lbrmG0bpwCoOsrGY9LwYmED3fPh3l_8-_LiHXEFY277Xw'

describe('User Authentication token.', () => {
  beforeEach(async () => { jest.clearAllMocks() })

  it('Get User Authentication Url.', async () => {
    axios.post = jest.fn().mockImplementationOnce(() => tokenResponseMocked)
    UserSchema.findByIdAndUpdate = jest.fn().mockImplementationOnce(jest.fn)

    const result = await setUserAuthenticationToken(USER_ID, AUTHORIZATION_CODE)

    expect(result).toEqual(expect.objectContaining({ statusCode: 200 }))
  })

  it('Get User Authentication Error.', async () => {
    axios.post = jest.fn().mockImplementationOnce(jest.fn)

    const result = await setUserAuthenticationToken(USER_ID, AUTHORIZATION_CODE)

    expect(result).toEqual(expect.objectContaining({
      statusCode: 500,
      message: 'spotify token error.',
      hasError: true,
    }))
  })
})
