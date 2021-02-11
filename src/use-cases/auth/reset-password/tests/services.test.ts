import { UserSchema } from '@schemas'
import resetPassword from '../service'

const mockUserToPassword = {
  email: 'email@mail.com',
  newPassword: 'new_password',
  resetCode: 'passwordResetCode',
}

jest.setTimeout(30000000)
jest.mock('@schemas')

describe('Reset Password Use Case:', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('Reset password with all the correct parameters', async () => {
    const selectMocked = {
      _id: '12r3tw14gt4ty5ewg0THJ',
      __V: 0,
      email: mockUserToPassword.email,
      name: 'Name User',
      passwordResetExpires: 'passwordResetExpires',
      passwordResetCode: 'passwordResetCode',
      createdAt: new Date().toDateString(),
      get: jest.fn().mockReturnValueOnce('passwordResetCode').mockReturnValueOnce('passwordResetExpires'),
      set: jest.fn(),
      save: jest.fn(),
    }
    const findOneSelectMocked = { select: jest.fn().mockResolvedValue(selectMocked) }

    UserSchema.findOne = jest.fn().mockImplementation(() => findOneSelectMocked)

    const result = await resetPassword(mockUserToPassword)

    expect(UserSchema.findOne).toBeCalledTimes(1)
    expect(selectMocked.get).toBeCalledTimes(2)
    expect(selectMocked.set).toBeCalledTimes(1)
    expect(selectMocked.save).toBeCalledTimes(1)
    expect(result).toEqual(expect.objectContaining({ statusCode: 200 }))
  })

  it('Reset password with incorrect email.', async () => {
    const findOneSelectMocked = { select: jest.fn().mockResolvedValue(null) }
    UserSchema.findOne = jest.fn().mockImplementation(() => findOneSelectMocked)

    const result = await resetPassword(mockUserToPassword)

    expect(UserSchema.findOne).toBeCalledTimes(1)
    expect(result).toEqual(expect.objectContaining({
      message: 'user not found.',
      hasError: true,
      statusCode: 404,
    }))
  })

  it('Reset password with invalid reset Code.', async () => {
    const selectMocked = {
      _id: '12r3tw14gt4ty5ewg0THJ',
      __V: 0,
      email: mockUserToPassword.email,
      name: 'Name User',
      passwordResetExpires: 'passwordResetExpires',
      passwordResetCode: 'wrongResetCode',
      createdAt: new Date().toDateString(),
      get: jest.fn().mockReturnValueOnce('wrongResetCode').mockReturnValueOnce('passwordResetExpires'),
      set: jest.fn(),
      save: jest.fn(),
    }
    const findOneSelectMocked = { select: jest.fn().mockResolvedValue(selectMocked) }

    UserSchema.findOne = jest.fn().mockImplementation(() => findOneSelectMocked)

    const result = await resetPassword(mockUserToPassword)

    expect(UserSchema.findOne).toBeCalledTimes(1)
    expect(selectMocked.get).toBeCalledTimes(2)
    expect(result).toEqual(expect.objectContaining({
      message: 'invalid code.',
      hasError: true,
      statusCode: 401,
    }))
  })

  it('Reset password with reset code expired.', async () => {
    const selectMocked = {
      _id: '12r3tw14gt4ty5ewg0THJ',
      __V: 0,
      email: mockUserToPassword.email,
      name: 'Name User',
      passwordResetExpires: '1000',
      passwordResetCode: 'passwordResetCode',
      createdAt: new Date().toDateString(),
      get: jest.fn().mockReturnValueOnce('passwordResetCode').mockReturnValueOnce('1000'),
      set: jest.fn(),
      save: jest.fn(),
    }
    const findOneSelectMocked = { select: jest.fn().mockResolvedValue(selectMocked) }

    UserSchema.findOne = jest.fn().mockImplementation(() => findOneSelectMocked)

    const result = await resetPassword(mockUserToPassword)

    expect(UserSchema.findOne).toBeCalledTimes(1)
    expect(selectMocked.get).toBeCalledTimes(2)
    expect(result).toEqual(expect.objectContaining({
      message: 'expired code.',
      hasError: true,
      statusCode: 401,
    }))
  })

  it('Reset password error.', async () => {
    const findOneSelectMocked = { select: jest.fn().mockRejectedValue(new Error('Error Test')) }
    UserSchema.findOne = jest.fn().mockImplementation(() => findOneSelectMocked)

    const result = await resetPassword(mockUserToPassword)

    expect(UserSchema.findOne).toBeCalledTimes(1)
    expect(result).toEqual(expect.objectContaining({
      message: 'reset password error.',
      hasError: true,
      statusCode: 500,
    }))
  })
})
