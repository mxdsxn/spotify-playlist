import mongoose from 'mongoose'
import mongoConnection from '../database'

export interface ITrack extends mongoose.Document {
  trackSpotifyId: String,
  trackName: String,
}

const TrackSchema = new mongoConnection.Schema({
  trackSpotifyId: {
    type: String,
    required: true
  },
  trackName: {
    type: String,
    required: true
  },
})

const Track = mongoConnection.model<ITrack>('Track', TrackSchema)

export default Track