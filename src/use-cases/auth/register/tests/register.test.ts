import {
  IUser, userSchema,
} from '../../../../schemas'
import registerUser from '../service'
import { UserSchemaType } from '../../../../schemas/user'

const mockUser = {
  email: 'email@mail.com',
  password: '12303i1204912039412',
  name: 'madson',
} as IUser

jest.setTimeout(30000000)

jest.mock('../../../../schemas')

describe('Register Use Case', () => {
  let userSchemaMocked: jest.Mocked<typeof userSchema>

  beforeAll(async () => {
  })

  afterEach(async () => {
    jest.clearAllMocks()
  })

  beforeEach(async () => {
    userSchemaMocked = userSchema as jest.Mocked<typeof userSchema>
  })

  it('Registring a new user', async () => {
    const mockUserSchemaCreate = {
      set: jest.fn(),
      _id: '12r3tw14gt4ty5ewg0THJ',
      __V: 0,
      email: mockUser.email,
      name: mockUser.name,
      createdAt: new Date().toDateString(),
    } as unknown as UserSchemaType

    userSchemaMocked.exists.mockResolvedValue(false)
    userSchemaMocked.create.mockResolvedValue(mockUserSchemaCreate)

    const result = await registerUser(mockUser)

    expect(userSchemaMocked.exists).toHaveBeenCalledTimes(1)
    expect(userSchemaMocked.create).toHaveBeenCalledTimes(1)
    expect(mockUserSchemaCreate.set).toHaveBeenCalledTimes(1)

    expect(result).toEqual(expect.objectContaining({
      message: expect.any(String),
      resources: { user: expect.any(Object) },
    }))
  })

  it('Registring a new user that the email is registered', async () => {
    userSchemaMocked.exists.mockResolvedValue(true)

    const result = await registerUser(mockUser)

    expect(userSchemaMocked.exists).toHaveBeenCalledTimes(1)
    expect(result).toEqual(expect.objectContaining({
      message: expect.any(String),
      resources: null,
    }))
  })
})
