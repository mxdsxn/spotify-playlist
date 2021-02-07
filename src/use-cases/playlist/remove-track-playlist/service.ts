import {
  resultInterface, trackInterface,
} from '@interfaces'
import { PlaylistSchema } from '@schemas'

interface optionsInterface {
  trackSpotifyId: string
  playlistId: string,
}

const removeTrackPlaylist = async (options: optionsInterface): Promise<resultInterface> => {
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

    const newTracks = oldTracks.filter(track => track.spotifyId !== options.trackSpotifyId)
    playlist.set({ tracks: newTracks })

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
export default removeTrackPlaylist
