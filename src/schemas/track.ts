import mongoose from 'mongoose'

export interface ITrack extends mongoose.Document {
  trackSpotifyId: string,
  trackName: string,
}

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

const Track = mongoose.model<ITrack>('Track', TrackSchema)

export default Track
