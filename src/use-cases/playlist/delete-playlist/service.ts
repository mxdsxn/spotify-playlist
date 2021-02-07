import { resultInterface } from '@interfaces'
import { PlaylistSchema } from '@schemas'

const deletePlaylist = async (playlistId: string): Promise<resultInterface> => {
  try {
    const playlist = await PlaylistSchema.findById(playlistId)

    if (!playlist) {
      const result: resultInterface = {
        hasError: false,
        message: `Playlist não encontrada.`,
      }
      return result
    }

    await playlist.deleteOne()

    const result: resultInterface = {
      hasError: false,
      message: `${playlist.name} deletada com sucesso.`,
    }
    return result
  } catch (error) {
    const result: resultInterface = {
      hasError: true,
      message: 'Falha ao buscar todas as playlists.',
    }
    return result
  }
}
export default deletePlaylist
