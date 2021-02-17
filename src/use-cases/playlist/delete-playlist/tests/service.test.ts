import mongoConnection from '../../../../database'
import { PlaylistSchema } from '@schemas'
import deletePlaylist from '../service'

jest.setTimeout(30000000)
describe('Delete playlist service.', () => {
  beforeAll(async () => {
    mongoConnection.connection
  })

  beforeEach(async () => {
    await PlaylistSchema.deleteMany({})
  })

  afterAll(async () => {
    mongoConnection.disconnect()
  })

  it('Delete a playlist.', async () => {
    const playlistOptions = {
      name: 'playlist name ',
      description: 'description test',
      isPrivate: false,
      userId: '601a985cb89df8088fea9af7',
    }

    const newPlaylist = await PlaylistSchema.create(playlistOptions)
    const playlistId = newPlaylist.get('id')
    let playlistExists = await PlaylistSchema.exists({ _id: playlistId })

    expect(playlistExists).toBeTruthy

    const result = await deletePlaylist(playlistId)
    playlistExists = await PlaylistSchema.exists({ _id: playlistId })

    expect(playlistExists).toBeFalsy
    expect(result).toEqual(expect.objectContaining({ statusCode: 200 }))
  })

  it('Delete non-existent playlist.', async () => {
    jest.mock('@schemas')
    const playlistId = '601ed70988ed498b034a2a77'

    const result = await deletePlaylist(playlistId)
    expect(result).toEqual(expect.objectContaining({
      statusCode: 404,
      message: 'playlist not found.',
      hasError: true,
    }))
  })

  it('Delete playlist error.', async () => {
    jest.mock('@schemas')
    const playlistId = 'fail'

    const result = await deletePlaylist(playlistId)
    expect(result).toEqual(expect.objectContaining({
      statusCode: 500,
      message: 'delete playlist error.',
      hasError: true,
    }))
  })
})
