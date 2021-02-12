import { errorHandler } from '@common'
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
        statusCode: 404,
        message: 'playlist not found.',
      }
      return result
    }

    const oldTracks = playlist.get('tracks') as Array<trackInterface>

    const newTracks = oldTracks.filter(track => track.spotifyId !== options.trackSpotifyId)
    playlist.set({ tracks: newTracks })

    await playlist.save()

    const result: resultInterface = { statusCode: 200 }
    return result
  } catch (error) {
    return await errorHandler(error, 'remove track playlist error.')
  }
}
export default removeTrackPlaylist
