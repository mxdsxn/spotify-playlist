import { Document } from 'mongoose'
import { playlistInterface } from '@interfaces'

type PlaylistType = playlistInterface & Document

export default PlaylistType
