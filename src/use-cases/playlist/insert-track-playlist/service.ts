import { errorHandler } from '@common'
import {
  resultInterface, trackInterface,
} from '@interfaces'
import {
  PlaylistSchema, TrackSchema,
} from '@schemas'
import axios from 'axios'

interface optionsInterface {
  spotifyToken: string,
  spotifyId: string
  playlistId: string,
}

const updatePlaylist = async (options: optionsInterface): Promise<resultInterface> => {
  try {
    const playlist = await PlaylistSchema.findById(options.playlistId).populate('tracks')

    if (!playlist) {
      const result: resultInterface = {
        hasError: true,
        statusCode: 404,
        message: 'playlist not found.',
      }
      return result
    }

    const oldTracks = playlist.get('tracks') as Array<trackInterface>
    if (oldTracks.some(track => track.spotifyId === options.spotifyId)) {
      const result: resultInterface = {
        hasError: true,
        statusCode: 409,
        message: 'track already exists in playlist.',
      }
      return result
    }

    let track = await TrackSchema.findOne({ spotifyId: options.spotifyId })
    if (!track) {
      const trackSpotifyResponse = await getTrack({
        spotifyId: options.spotifyId,
        spotifyToken: options.spotifyToken,
      })

      if (trackSpotifyResponse.hasError) { return trackSpotifyResponse }

      const { resources } = <{ resources: trackSpotifyInterface }>trackSpotifyResponse

      track = await TrackSchema.create({
        name: resources.name, spotifyId: resources.id, artist: resources.artists[0].name,
      })
    }

    const newTracks = oldTracks.push(track)
    playlist.set({ newTracks })

    await playlist.save()

    const result: resultInterface = { statusCode: 200 }
    return result
  } catch (error) {
    return await errorHandler(error, 'insert track playlist error.')
  }
}
export default updatePlaylist

interface trackSpotifyInterface {
  name: string,
  id: string,
  artists: [{
    id: string,
    name: string,
  }]
}

interface trackOptionsInterface {
  spotifyToken: string,
  spotifyId: string
}

const getTrack = async (options: trackOptionsInterface): Promise<resultInterface> => {
  const baseUrl = `https://api.spotify.com/v1/tracks/${options.spotifyId}`

  try {
    const track = await axios.get(baseUrl, { headers: { 'Authorization': `Bearer ${options.spotifyToken}` } })

    const result: resultInterface = {
      statusCode: 200,
      resources: track.data,
    }

    return result
  } catch (error) {
    return await errorHandler(error, 'get track spotify error.')
  }
}
