import { resultInterface } from '@interfaces'
import { PlaylistSchema } from '@schemas'

const listPlaylist = async (userId: string): Promise<resultInterface> => {
  try {
    const allPlaylist = await PlaylistSchema.find({ userId })

    if (!allPlaylist) {
      const result: resultInterface = {
        hasError: true,
        message: 'Playlists não encontradas.',
      }
      return result
    }

    const result: resultInterface = {
      hasError: false,
      message: 'Todas as playlists',
      resources: allPlaylist,
    }
    return result
  } catch (error) {
    const result: resultInterface = {
      hasError: true,
      message: 'Falha ao criar nova playlist.',
    }
    return result
  }
}
export default listPlaylist
