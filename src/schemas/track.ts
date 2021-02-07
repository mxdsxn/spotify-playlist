import mongoose from 'mongoose'
import { TrackSchemaType } from '@types'

const TrackSchema = new mongoose.Schema({
  spotifyId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
})

const Track = mongoose.model<TrackSchemaType>('Track', TrackSchema)

export default Track
