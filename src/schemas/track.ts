import mongoose from 'mongoose'
import { TrackSchemaType } from '@types'

const TrackSchema = new mongoose.Schema({
  trackSpotifyId: {
    type: String,
    required: true,
  },
  trackName: {
    type: String,
    required: true,
  },
})

const Track = mongoose.model<TrackSchemaType>('Track', TrackSchema)

export default Track
