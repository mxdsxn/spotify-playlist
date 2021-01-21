import { Document } from 'mongoose'
import { trackInterface } from '@interfaces'

type TrackType = trackInterface & Document

export default TrackType
