import { UserSchema } from '@schemas'
import { userInterface } from '@interfaces'
import forgotPassword from '../service'
import crypto from 'crypto'

const mockUser = { email: 'email@mail.com' } as userInterface

jest.setTimeout(30000000)
jest.mock('@schemas')

describe('Forgot Password Use Case:', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('Forgot password with all the correct parameters', async () => {
    const findOneMocked = {
      _id: '12r3tw14gt4ty5ewg0THJ',
      __V: 0,
      email: mockUser.email,
      name: 'Name User',
      passwordResetExpires: 'passwordResetExpires',
      passwordResetCode: 'passwordResetCode',
      createdAt: new Date().toDateString(),
      get: jest.fn().mockReturnValueOnce('12r3tw14gt4ty5ewg0THJ'),
    }

    UserSchema.findOne = jest.fn().mockImplementation(() => findOneMocked)
    UserSchema.findByIdAndUpdate = jest.fn()
    const cryptoRandomBytesSpy = jest.spyOn(crypto, 'randomBytes')

    const result = await forgotPassword(mockUser)

    expect(UserSchema.findOne).toBeCalledTimes(1)
    expect(cryptoRandomBytesSpy).toBeCalledTimes(1)
    expect(UserSchema.findByIdAndUpdate).toBeCalledTimes(1)
    expect(result).toEqual(expect.objectContaining({
      resources: { resetCode: expect.any(String) },
      statusCode: 200,
    }))
  })

  it('Forgot password with incorrect email.', async () => {
    UserSchema.findOne = jest.fn().mockImplementation(() => null)

    const result = await forgotPassword(mockUser)

    expect(UserSchema.findOne).toBeCalledTimes(1)
    expect(result).toEqual(expect.objectContaining({
      message: 'user not found.',
      hasError: true,
      statusCode: 404,
    }))
  })

  it('Forgot password error.', async () => {
    UserSchema.findOne = jest.fn().mockRejectedValue(new Error('Error Test'))

    const result = await forgotPassword(mockUser)

    expect(UserSchema.findOne).toBeCalledTimes(1)
    expect(result).toEqual(expect.objectContaining({
      message: 'forgot password error.',
      hasError: true,
      statusCode: 500,
    }))
  })
})
