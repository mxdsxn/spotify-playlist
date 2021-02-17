import mongoConnection from '../../../../database'
import {
  PlaylistSchema, UserSchema,
} from '@schemas'
import listPlaylist from '../service'

jest.setTimeout(30000000)

describe('List playlists service.', () => {
  beforeAll(async () => {
    mongoConnection.connection
  })

  beforeEach(async () => {
    await PlaylistSchema.deleteMany({})
  })

  afterAll(async () => {
    mongoConnection.disconnect()
  })

  it('List playlists.', async () => {
    const userOptions = {
      email: 'email@mail.com',
      password: '12303i1204912039412',
      name: 'madson',
    }

    const user = await UserSchema.create(userOptions)
    const userId = user.get('_id')

    const playlistOptions = {
      name: 'playlist name',
      description: 'description test',
      isPrivate: false,
      userId,
    }

    await PlaylistSchema.create(playlistOptions)
    await PlaylistSchema.create(playlistOptions)
    await PlaylistSchema.create(playlistOptions)
    const result = await listPlaylist(userId)

    expect(result.statusCode).toEqual(200)
    expect(result.resources).toHaveLength(3)
  })

  it('List playlists error.', async () => {
    const userId = '123456'
    const result = await listPlaylist(userId)

    expect(result.statusCode).toEqual(500)
    expect(result.message).toBe('list playlist error.')
  })
})
