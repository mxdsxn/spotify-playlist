import { Document } from 'mongoose'
import { trackInterface } from '@interfaces'

type TrackSchemaType = trackInterface & Document

export default TrackSchemaType
