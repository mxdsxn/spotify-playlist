import mongoConnection from '../../../../database'
import {
  PlaylistSchema, UserSchema,
} from '@schemas'
import showPlaylist from '../service'

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

  it('Show a playlist.', async () => {
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
    const result = await showPlaylist(userId, playlistId)

    expect(result.statusCode).toEqual(200)
    expect(result.resources).toEqual(expect.objectContaining({
      tracks: expect.any(Array),
      _id: playlistId,
      __v: expect.any(Number),
      ...playlistOptions,
    }))
  })

  it('Show a another user\'s public playlist.', async () => {
    const userOptions = {
      email: 'email@mail.com',
      password: '12303i1204912039412',
      name: 'madson',
    }
    const userAnotherOptions = {
      email: 'another@mail.com',
      password: '12303i1204912039412',
      name: 'another',
    }

    const user = await UserSchema.create(userOptions)
    const userAnother = await UserSchema.create(userAnotherOptions)
    const userId = user.get('_id')
    const userAnotherId = userAnother.get('_id')

    const playlistOptions = {
      name: 'playlist name',
      description: 'description test',
      isPrivate: false,
      userId: userAnotherId,
    }

    const playlistAnotherUser = await PlaylistSchema.create(playlistOptions)
    const playlistAnotherUserId = playlistAnotherUser.get('_id')

    const result = await showPlaylist(userId, playlistAnotherUserId)

    expect(result.statusCode).toEqual(200)
    expect(result.resources).toEqual(expect.objectContaining({
      tracks: expect.any(Array),
      _id: playlistAnotherUserId,
      __v: expect.any(Number),
      ...playlistOptions,
    }))
  })

  it('Show a another user\'s private playlist.', async () => {
    const userOptions = {
      email: 'email@mail.com',
      password: '12303i1204912039412',
      name: 'madson',
    }
    const userAnotherOptions = {
      email: 'another@mail.com',
      password: '12303i1204912039412',
      name: 'another',
    }

    const user = await UserSchema.create(userOptions)
    const userAnother = await UserSchema.create(userAnotherOptions)
    const userId = user.get('_id')
    const userAnotherId = userAnother.get('_id')

    const playlistOptions = {
      name: 'playlist name',
      description: 'description test',
      isPrivate: true,
      userId: userAnotherId,
    }

    const playlistAnotherUser = await PlaylistSchema.create(playlistOptions)
    const playlistAnotherUserId = playlistAnotherUser.get('_id')

    const result = await showPlaylist(userId, playlistAnotherUserId)

    expect(result.statusCode).toEqual(401)
    expect(result.message).toBe('unauthorized.')
  })

  it('Show a non-existent playlist.', async () => {
    const userId = '602c38949cb080282e086744'
    const playlistAnotherUserId = '602c41f90800952be3a3eb5e'

    const result = await showPlaylist(userId, playlistAnotherUserId)

    expect(result.statusCode).toEqual(404)
    expect(result.message).toBe('playlist not found.')
  })

  it('Show playlist error.', async () => {
    jest.mock('@schemas')

    const userId = '123456'
    const playlistId = '123456'
    const result = await showPlaylist(userId, playlistId)

    expect(result.statusCode).toEqual(500)
    expect(result.message).toBe('show playlist error.')
  })
})
