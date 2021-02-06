import {
  resultInterface, playlistInterface,
} from '@interfaces'
import { PlaylistSchema } from '@schemas'

const createPlaylist = async (playlistOptions: playlistInterface): Promise<resultInterface> => {
  try {
    await PlaylistSchema.create(playlistOptions)

    const result: resultInterface = {
      hasError: false,
      message: `${playlistOptions.name} criada com sucesso.`,
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
export default createPlaylist
