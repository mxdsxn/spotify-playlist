import {
  resultInterface, trackInterface,
} from '@interfaces'
import {
  PlaylistSchema, TrackSchema,
} from '@schemas'
import axios from 'axios'

interface optionsInterface {
  spotifyToken: string,
  trackId: string
  playlistId: string,
}

const updatePlaylist = async (options: optionsInterface): Promise<resultInterface> => {
  try {
    const playlist = await PlaylistSchema.findById(options.playlistId).populate('tracks')

    if (!playlist) {
      const result: resultInterface = {
        hasError: true,
        message: 'Playlist não encontrada.',
      }
      return result
    }

    const oldTracks = playlist.get('tracks') as Array<trackInterface>
    if (oldTracks.some(track => track.spotifyId === options.trackId)) {
      const result: resultInterface = {
        hasError: true,
        message: 'Track já pertence à playlist.',
      }
      return result
    }

    let track = await TrackSchema.findOne({ spotifyId: options.trackId })
    if (!track) {
      const trackSpotify = await getTrack({
        trackId: options.trackId,
        spotifyToken: options.spotifyToken,
      })

      const { resources } = <{ resources: trackSpotifyInterface }>trackSpotify

      track = await TrackSchema.create({
        name: resources.name, spotifyId: resources.id, artist: resources.artists[0].name,
      })
    }

    const newTracks = oldTracks.push(track)
    playlist.set({ newTracks })

    await playlist.save()

    const result: resultInterface = {
      hasError: false,
      message: 'Playlist alterada com sucesso.',
    }
    return result
  } catch (error) {
    const result: resultInterface = {
      hasError: true,
      message: 'Falha ao adicionar track a playlist.',
    }
    return result
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
  trackId: string
}

const getTrack = async (options: trackOptionsInterface): Promise<resultInterface> => {
  const baseUrl = `https://api.spotify.com/v1/tracks/${options.trackId}`

  try {
    const track = await axios.get(baseUrl, { headers: { 'Authorization': `Bearer ${options.spotifyToken}` } })

    const result: resultInterface = {
      hasError: false,
      resources: track.data,
    }

    return result
  } catch (error) {
    const result: resultInterface = {
      message: 'Falha ao buscar track.',
      hasError: true,
    }
    return result
  }
}
