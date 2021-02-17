import axios from 'axios'
import mongoConnection from '../../../../database'
import { PlaylistSchema } from '@schemas'
import { PlaylistSchemaType } from '@types'
import removeTrackPlaylist from '../service'
import updatePlaylist from '../../insert-track-playlist/service'
import trackSpotifyMocked from './mocks/trackSpotify.json'

jest.setTimeout(30000000)
jest.mock('axios')

describe('Remove a track in playlist service.', () => {
  beforeAll(async () => {
    mongoConnection.connection
  })

  beforeEach(async () => {
    await PlaylistSchema.deleteMany({})
  })

  afterAll(async () => {
    mongoConnection.disconnect()
  })

  it('Remove a track.', async () => {
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

    const playlistUpdated = await PlaylistSchema.findById(playlistId).populate('tracks') as PlaylistSchemaType
    const tracks = playlistUpdated.get('tracks')
    expect(tracks[0]).toMatchObject({ spotifyId: trackSpotifyId })

    const result = await removeTrackPlaylist({
      trackSpotifyId,
      playlistId,
    })

    const updatedPlaylist = await PlaylistSchema.findById(playlistId).populate('tracks') as PlaylistSchemaType
    const emptyTracks = updatedPlaylist.get('tracks')
    expect(result).toEqual(expect.objectContaining({ statusCode: 200 }))
    expect(emptyTracks).toHaveLength(0)
  })

  it('Remove a track in a non-existent playlist.', async () => {
    const trackSpotifyId = '3zxzCceumX9oWltiRy4HSY'
    const playlistId = '6026e0faec52ff3e242bebfd'

    const result = await removeTrackPlaylist({
      trackSpotifyId,
      playlistId,
    })

    expect(result.statusCode).toEqual(404)
    expect(result.message).toBe('playlist not found.')
  })

  it('Remove track error.', async () => {
    const trackSpotifyId = '3zxzCceumX9oWltiRy4HSY'
    const playlistId = '123456'

    const result = await removeTrackPlaylist({
      trackSpotifyId,
      playlistId,
    })

    expect(result.statusCode).toEqual(500)
    expect(result.message).toBe('remove track playlist error.')
  })
})
