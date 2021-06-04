import axios from 'axios'
import mongoConnection from '../../../../database'
import { PlaylistSchema } from '@schemas'
import { PlaylistSchemaType } from '@types'
import updatePlaylist from '../service'
import trackSpotifyMocked from './mocks/trackSpotify.json'

jest.setTimeout(30000000)
jest.mock('axios')

describe('Insert track in playlist service.', () => {
  beforeAll(async () => {
    mongoConnection.connection
  })

  beforeEach(async () => {
    await PlaylistSchema.deleteMany({})
  })

  afterAll(async () => {
    mongoConnection.disconnect()
  })

  it('Insert a track in the playlist.', async () => {
    const playlistOptions = {
      name: 'playlist name',
      description: 'description test',
      isPrivate: false,
      userId: '601a985cb89df8088fea9af7',
    }
    const trackSpotifyId = '3zxzCceumX9oWltiRy4HSY'

    const playlist = await PlaylistSchema.create(playlistOptions)
    const playlistId = playlist.get('_id')

    axios.get = jest.fn().mockResolvedValueOnce(trackSpotifyMocked)
    const result = await updatePlaylist({
      spotifyId: trackSpotifyId,
      spotifyToken: 'access_token',
      playlistId,
    })

    const playlistUpdated = await PlaylistSchema.findById(playlistId).populate('tracks') as PlaylistSchemaType
    const tracks = playlistUpdated.get('tracks')

    expect(tracks[0]).toMatchObject({ spotifyId: trackSpotifyId })
    expect(result).toEqual(expect.objectContaining({ statusCode: 200 }))
  })

  it('Insert track in non-existent playlist.', async () => {
    jest.mock('@schemas')
    const trackSpotifyId = '3zxzCceumX9oWlti123456'
    const playlistId = '601ed70988ed498b034a2a77'

    // PlaylistSchema.findById = jest.fn().mockRejectedValueOnce(new Error('Error Test'))
    const result = await updatePlaylist({
      spotifyId: trackSpotifyId,
      spotifyToken: 'access_token',
      playlistId,
    })

    expect(result).toEqual(expect.objectContaining({
      statusCode: 404,
      message: 'playlist not found.',
      hasError: true,
    }))
  })

  it('Insert a track in the playlist that track is already inserted.', async () => {
    const playlistOptions = {
      name: 'playlist name',
      description: 'description test',
      isPrivate: false,
      userId: '601a985cb89df8088fea9af7',
    }
    const trackSpotifyId = '3zxzCceumX9oWltiRy4HSY'

    const playlist = await PlaylistSchema.create(playlistOptions)
    const playlistId = playlist.get('_id')

    axios.get = jest.fn().mockResolvedValueOnce(trackSpotifyMocked)

    await updatePlaylist({
      spotifyId: trackSpotifyId,
      spotifyToken: 'access_token',
      playlistId,
    })
    const result = await updatePlaylist({
      spotifyId: trackSpotifyId,
      spotifyToken: 'access_token',
      playlistId,
    })

    const playlistUpdated = await PlaylistSchema.findById(playlistId).populate('tracks') as PlaylistSchemaType
    const tracks = playlistUpdated.get('tracks')

    expect(tracks[0]).toMatchObject({ spotifyId: trackSpotifyId })
    expect(result).toEqual(expect.objectContaining({
      hasError: true,
      statusCode: 409,
      message: 'track already exists in playlist.',
    }))
  })

  it('Insert a track with wrong spotifyId.', async () => {
    const playlistOptions = {
      name: 'playlist name',
      description: 'description test',
      isPrivate: false,
      userId: '601a985cb89df8088fea9af7',
    }
    const trackSpotifyId = '3zxzCceumX9oWlti123456'

    const playlist = await PlaylistSchema.create(playlistOptions)
    const playlistId = playlist.get('_id')

    axios.get = jest.fn().mockRejectedValueOnce(new Error('Error Test'))
    const result = await updatePlaylist({
      spotifyId: trackSpotifyId,
      spotifyToken: 'access_token',
      playlistId,
    })

    expect(result).toEqual(expect.objectContaining({
      statusCode: 500,
      message: 'get track spotify error.',
      hasError: true,
    }))
  })

  it('Insert track in playlist error.', async () => {
    jest.mock('@schemas')
    const trackSpotifyId = '3zxzCceumX9oWlti123456'
    const playlistId = '601ed70988ed498b034a2a77'

    PlaylistSchema.findById = jest.fn().mockRejectedValueOnce(new Error('Error Test'))
    const result = await updatePlaylist({
      spotifyId: trackSpotifyId,
      spotifyToken: 'access_token',
      playlistId,
    })

    expect(result).toEqual(expect.objectContaining({
      statusCode: 500,
      message: 'insert track playlist error.',
      hasError: true,
    }))
  })
})
