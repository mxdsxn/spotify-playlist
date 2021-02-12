import { errorHandler } from '@common'
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
        message: 'playlist not found.',
        statusCode: 404,
      }
      return result
    }

    const propertiesMatrix = Object.entries(playlistOptions)
    propertiesMatrix.map(propValue => {
      if (propValue[1] !== undefined && propValue[0] !== 'playlistId') {
        const propValueJSON = `{"${propValue[0]}": "${propValue[1]}"}`

        const propValueParsed = JSON.parse(propValueJSON)
        playlist.set(propValueParsed)
      }
    })

    await playlist.save()

    const result: resultInterface = { statusCode: 200 }

    return result
  } catch (error) {
    return await errorHandler(error, 'update playlist error.')
  }
}
export default updatePlaylist
