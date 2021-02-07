import { resultInterface } from '@interfaces'
import { PlaylistSchema } from '@schemas'

const showPlaylist = async (playlistId: string): Promise<resultInterface> => {
  try {
    const playlist = await PlaylistSchema.findById(playlistId).populate('tracks')

    if (!playlist) {
      const result: resultInterface = {
        hasError: true,
        message: 'Playlist não encontrada.',
      }
      return result
    }

    const result: resultInterface = {
      hasError: false,
      message: 'Consulta de uma playlist.',
      resources: playlist,
    }
    return result
  } catch (error) {
    const result: resultInterface = {
      hasError: true,
      message: 'Falha ao buscar uma playlist.',
    }
    return result
  }
}
export default showPlaylist
