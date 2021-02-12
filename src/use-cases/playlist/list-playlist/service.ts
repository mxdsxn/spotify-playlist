import { errorHandler } from '@common'
import { resultInterface } from '@interfaces'
import { PlaylistSchema } from '@schemas'

const listPlaylist = async (userId: string): Promise<resultInterface> => {
  try {
    const allPlaylist = await PlaylistSchema.find({ userId }).populate('tracks')

    if (!allPlaylist) {
      const result: resultInterface = {
        hasError: true,
        statusCode: 404,
        message: 'playlist not found.',
      }
      return result
    }

    const result: resultInterface = {
      statusCode: 200,
      resources: allPlaylist,
    }
    return result
  } catch (error) {
    return await errorHandler(error, 'list playlist error.')
  }
}
export default listPlaylist
