import { errorHandler } from '@common'
import { resultInterface } from '@interfaces'
import { PlaylistSchema } from '@schemas'

const showPlaylist = async (userId: string, playlistId: string): Promise<resultInterface> => {
  try {
    const playlist = await PlaylistSchema.findById(playlistId).populate('tracks')

    if (!playlist) {
      const result: resultInterface = {
        hasError: true,
        statusCode: 404,
        message: 'playlist not found.',
      }
      return result
    }

    const isPrivate = playlist.get('isPrivate')

    if ((String(playlist.userId) === String(userId)) || !isPrivate) {
      const result: resultInterface = {
        resources: playlist,
        statusCode: 200,
      }

      return result
    }

    const result: resultInterface = {
      hasError: true,
      statusCode: 401,
      message: 'unauthorized.',
    }

    return result
  } catch (error) {
    return await errorHandler(error, 'show playlist error.')
  }
}
export default showPlaylist
