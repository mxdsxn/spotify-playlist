import { UserSchema } from '@schemas'
import { userInterface } from '@interfaces'
import registerUser from '../service'

const mockUser = {
  email: 'email@mail.com',
  password: '12303i1204912039412',
  name: 'madson',
} as userInterface

jest.setTimeout(30000000)

jest.mock('@schemas')

describe('Register Use Case', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('Register a new user.', async () => {
    const mockUserSchemaCreate = {
      set: jest.fn(),
      _id: '12r3tw14gt4ty5ewg0THJ',
      __V: 0,
      email: mockUser.email,
      name: mockUser.name,
      createdAt: new Date().toDateString(),
    }

    UserSchema.exists = jest.fn().mockResolvedValue(false)
    UserSchema.create = jest.fn().mockResolvedValue(mockUserSchemaCreate)

    const result = await registerUser(mockUser)

    expect(UserSchema.exists).toHaveBeenCalledTimes(1)
    expect(UserSchema.create).toHaveBeenCalledTimes(1)
    expect(mockUserSchemaCreate.set).toHaveBeenCalledTimes(1)

    expect(result).toEqual(expect.objectContaining({
      hasError: false,
      message: 'Registrado com sucesso.',
      resources: { user: expect.any(Object) },
    }))
  })

  it('Register a new user that the email is registered.', async () => {
    UserSchema.exists = jest.fn().mockResolvedValue(true)

    const result = await registerUser(mockUser)

    expect(UserSchema.exists).toHaveBeenCalledTimes(1)
    expect(result).toEqual(expect.objectContaining({
      hasError: true,
      message: 'Email já registrado.',
    }))
  })

  it('Register error.', async () => {
    UserSchema.exists = jest.fn().mockResolvedValue(false)
    UserSchema.create = jest.fn().mockRejectedValue(new Error('teste erro'))

    const result = await registerUser(mockUser)

    expect(UserSchema.exists).toHaveBeenCalledTimes(1)
    expect(UserSchema.create).toHaveBeenCalledTimes(1)
    expect(result).toEqual(expect.objectContaining({
      hasError: true,
      message: 'Erro ao cadastrar novo usuário',
    }))
  })
})
