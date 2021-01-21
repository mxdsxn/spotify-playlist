import { Document } from 'mongoose'
import { playlistInterface } from '@interfaces'

type PlaylistSchemaType = playlistInterface & Document

export default PlaylistSchemaType
