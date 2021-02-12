import { errorHandler } from '@common'
import {
  resultInterface, playlistInterface,
} from '@interfaces'
import { PlaylistSchema } from '@schemas'

const createPlaylist = async (playlistOptions: playlistInterface): Promise<resultInterface> => {
  try {
    await PlaylistSchema.create(playlistOptions)

    const result: resultInterface = { statusCode: 201 }
    return result
  } catch (error) {
    return await errorHandler(error, 'create playlist error.')
  }
}
export default createPlaylist
