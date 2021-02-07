import { resultInterface } from '@interfaces'
import {
  PlaylistSchema, TrackSchema,
} from '@schemas'

interface optionsInterface {
  trackId: string
  playlistId: string,
}

const updatePlaylist = async (options: optionsInterface): Promise<resultInterface> => {
  try {
    const playlist = await PlaylistSchema.findById(options.playlistId)

    if (!playlist) {
      const result: resultInterface = {
        hasError: true,
        message: 'Playlist não encontrada.',
      }
      return result
    }

    let track = await TrackSchema.findOne({ spotifyId: options.trackId })
    if (!track) {
      track = await TrackSchema.create({
        name: 'trackname', spotifyId: options.trackId, artist: 'artist',
      })

    }
    global.console.log(track, 'new')

    // await playlist.save()

    const result: resultInterface = {
      hasError: false,
      message: 'Playlist alterada com sucesso.',
    }
    return result
  } catch (error) {
    const result: resultInterface = {
      hasError: true,
      message: 'Falha ao alterar a playlist.',
    }
    return result
  }
}
export default updatePlaylist
