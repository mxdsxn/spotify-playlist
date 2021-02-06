import { resultInterface } from '@interfaces'
import { PlaylistSchema } from '@schemas'

interface playlistOptionsInterface {
  description?: string,
  name?: string,
  isPrivate?: string,
  playlistId: string,
}

const updatePlaylist = async (playlistOptions: playlistOptionsInterface): Promise<resultInterface> => {
  try {
    const playlist = await PlaylistSchema.findById(playlistOptions.playlistId)
    const {
      description,
      name,
      isPrivate,
    } = playlistOptions

    if (!playlist) {
      const result: resultInterface = {
        hasError: true,
        message: 'Playlist não encontrada.',
      }
      return result
    }

    description && playlist.set({ description })
    name && playlist.set({ name })
    isPrivate && playlist.set({ isPrivate })

    await playlist.save()

    const result: resultInterface = {
      hasError: false,
      message: 'Playlist alterada com sucesso.',
    }
    return result
  } catch (error) {
    console.log(error)
    const result: resultInterface = {
      hasError: true,
      message: 'Falha ao alterar a playlist.',
    }
    return result
  }
}
export default updatePlaylist
