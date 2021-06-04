import mongoConnection from '../../../../database'
import {
  PlaylistSchema, UserSchema,
} from '@schemas'
import updatePlaylist from '../service'

jest.setTimeout(30000000)

describe('Show playlist service.', () => {
  beforeAll(async () => {
    mongoConnection.connection
  })

  beforeEach(async () => {
    await PlaylistSchema.deleteMany()
    await UserSchema.deleteMany()
  })

  afterAll(async () => {
    mongoConnection.disconnect()
  })

  it('Update a playlist.', async () => {
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

    const playlist = await PlaylistSchema.create(playlistOptions)

    const playlistId = playlist.get('_id')

    const playlistUpdateOptions = {
      description: 'update test',
      name: 'playlist update name',
      isPrivate: true,
      playlistId,
    }

    const result = await updatePlaylist(userId, playlistUpdateOptions)

    expect(result.statusCode).toEqual(200)
  })

  it('Update a another user\'s playlist.', async () => {
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

    const playlist = await PlaylistSchema.create(playlistOptions)

    const playlistId = playlist.get('_id')

    const playlistUpdateOptions = {
      description: 'update test',
      name: 'playlist update name',
      isPrivate: true,
      playlistId,
    }

    const result = await updatePlaylist('userId', playlistUpdateOptions)

    expect(result.statusCode).toEqual(401)
    expect(result.message).toBe('unauthorized.')
  })

  it('Update a non-existent playlist.', async () => {
    const playlistUpdateOptions = {
      description: 'update test',
      name: 'playlist update name',
      isPrivate: true,
      playlistId: '602c41f90800952be3a3eb5e',
    }

    const result = await updatePlaylist('userId', playlistUpdateOptions)

    expect(result.statusCode).toEqual(404)
    expect(result.message).toBe('playlist not found.')
  })

  it('Update playlist error.', async () => {
    const playlistOptions = {
      name: 'playlist name',
      description: 'description test',
      isPrivate: true,
      playlistId: 'userAnotherId',
    }

    const result = await updatePlaylist('userId', playlistOptions)

    expect(result.statusCode).toEqual(500)
    expect(result.message).toBe('update playlist error.')
  })

})
