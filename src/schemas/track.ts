import mongoose from 'mongoose'
import { TrackType } from '@types'

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

const Track = mongoose.model<TrackType>('Track', TrackSchema)

export default Track
