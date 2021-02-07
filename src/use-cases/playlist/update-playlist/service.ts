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

    const propertiesMatrix = Object.entries(playlistOptions)
    propertiesMatrix.map(propValue => {
      if (propValue[1] !== undefined && propValue[0] !== 'playlistId') {
        const propValueJSON = `{"${propValue[0]}": "${propValue[1]}"}`

        const propValueParsed = JSON.parse(propValueJSON)
        playlist.set(propValueParsed)
      }
    })

    await playlist.save()

    const result: resultInterface = {
      hasError: false,
      message: 'Playlist alterada com sucesso.',
    }
    return result
  } catch (error) {
    const result: resultInterface = {
      hasError: true,
      message: 'Falha ao alterar a playlist.',
    }
    return result
  }
}
export default updatePlaylist
