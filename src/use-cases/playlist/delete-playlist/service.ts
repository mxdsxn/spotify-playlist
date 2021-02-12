import { errorHandler } from '@common'
import { resultInterface } from '@interfaces'
import { PlaylistSchema } from '@schemas'

const deletePlaylist = async (playlistId: string): Promise<resultInterface> => {
  try {
    const playlist = await PlaylistSchema.findById(playlistId)

    if (!playlist) {
      const result: resultInterface = {
        hasError: true,
        statusCode: 404,
        message: `playlist not found.`,
      }
      return result
    }

    await playlist.deleteOne()

    const result: resultInterface = { statusCode: 200 }
    return result
  } catch (error) {
    return await errorHandler(error, 'delete playlist error.')
  }
}
export default deletePlaylist
