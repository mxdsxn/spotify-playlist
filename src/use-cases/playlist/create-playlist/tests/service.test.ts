import mongoConnection from '../../../../database'
import { PlaylistSchema } from '@schemas'
import createPlaylist from '../service'

// jest.setTimeout(30000000)
describe('Create playlist service.', () => {
  beforeAll(async () => {
    mongoConnection.connection
  })

  beforeEach(async () => {
    await PlaylistSchema.deleteMany({})
  })

  afterAll(async () => {
    mongoConnection.disconnect()
  })

  it('Create a playlist.', async () => {
    const playlistOptions = {
      name: 'playlist name ',
      description: 'description test',
      isPrivate: false,
      userId: '601a985cb89df8088fea9af7',
    }

    const result = await createPlaylist(playlistOptions)
    expect(result).toEqual(expect.objectContaining({ statusCode: 201 }))
  })

  it('Create playlist error.', async () => {
    jest.mock('@schemas')
    const playlistOptions = {
      name: 'playlist name ',
      description: 'description test',
      isPrivate: false,
      userId: 'fai',
    }

    const result = await createPlaylist(playlistOptions)
    expect(result).toEqual(expect.objectContaining({
      statusCode: 500,
      message: 'create playlist error.',
      hasError: true,
    }))
  })
})
