import bcrypt from 'bcryptjs'
import { UserSchema } from '@schemas'
import { userInterface } from '@interfaces'
import loginUser from '../service'

const mockUser = {
  email: 'email@mail.com',
  password: '12303i1204912039412',
} as userInterface

jest.setTimeout(30000000)
jest.mock('@schemas')
jest.mock('bcryptjs')

describe('Login Use Case:', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('Login with all the correct parameters.', async () => {
    const userDocumentMocked = {
      _id: '12r3tw14gt4ty5ewg0THJ',
      __V: 0,
      email: mockUser.email,
      name: mockUser.name,
      password: mockUser.password,
      createdAt: new Date().toDateString(),
      get: jest.fn().mockReturnValue('12r3tw14gt4ty5ewg0THJ'),
    }
    const findSelectMocked = { select: jest.fn().mockResolvedValue(userDocumentMocked) }

    UserSchema.findOne = jest.fn().mockImplementation(() => findSelectMocked)
    UserSchema.findById = jest.fn().mockImplementation(() => findSelectMocked)
    bcrypt.compare = jest.fn().mockResolvedValue(true)

    const result = await loginUser(mockUser)

    expect(UserSchema.findOne).toHaveBeenCalledTimes(1)
    expect(bcrypt.compare).toHaveBeenCalledTimes(1)
    expect(result).toEqual(expect.objectContaining({
      resources: expect.objectContaining({ token: expect.any(String) }),
      statusCode: 200,
    }))
  })

  it('Login with invalid email.', async () => {
    const findOneSelectMocked = { select: jest.fn().mockResolvedValue(null) }

    UserSchema.findOne = jest.fn().mockImplementation(() => findOneSelectMocked)

    const result = await loginUser(mockUser)

    expect(UserSchema.findOne).toHaveBeenCalledTimes(1)
    expect(result).toEqual(expect.objectContaining({
      message: 'user not found.',
      hasError: true,
      statusCode: 404,
    }))
  })

  it('Login with invalid password.', async () => {
    const findOneSelectMocked = {
      select: jest.fn().mockResolvedValue({
        _id: '12r3tw14gt4ty5ewg0THJ',
        __V: 0,
        email: mockUser.email,
        name: mockUser.name,
        password: mockUser.password,
        createdAt: new Date().toDateString(),
        get: jest.fn().mockReturnValue('12r3tw14gt4ty5ewg0THJ'),
      }),
    }

    UserSchema.findOne = jest.fn().mockImplementation(() => findOneSelectMocked)
    bcrypt.compare = jest.fn().mockResolvedValue(false)

    const result = await loginUser(mockUser)

    expect(UserSchema.findOne).toHaveBeenCalledTimes(1)
    expect(bcrypt.compare).toHaveBeenCalledTimes(1)
    expect(result).toEqual(expect.objectContaining({
      message: 'invalid password.',
      hasError: true,
      statusCode: 401,
    }))
  })

  it('Login error.', async () => {
    const findOneSelectMocked = ({
      select: jest.fn().mockResolvedValue({
        _id: '12r3tw14gt4ty5ewg0THJ',
        __V: 0,
        email: mockUser.email,
        name: mockUser.name,
        password: mockUser.password,
        createdAt: new Date().toDateString(),
        get: jest.fn().mockReturnValue('12r3tw14gt4ty5ewg0THJ'),
      }),
    })

    UserSchema.findOne = jest.fn().mockImplementation(() => findOneSelectMocked)
    bcrypt.compare = jest.fn().mockRejectedValue(new Error('Error Test'))

    const result = await loginUser(mockUser)

    expect(UserSchema.findOne).toHaveBeenCalledTimes(1)
    expect(bcrypt.compare).toHaveBeenCalledTimes(1)
    expect(result).toEqual(expect.objectContaining({
      message: 'login error.',
      hasError: true,
      statusCode: 500,
    }))
  })
})
