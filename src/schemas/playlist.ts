import mongoose from 'mongoose'

export interface IPlaylist extends mongoose.Document {
  name: string,
  description: string,
  tracks: [any],
  isPrivate: boolean,
  userId: string,
}

const PlaylistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  tracks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Track',
  }],
  isPrivate: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

const Playlist = mongoose.model<IPlaylist>('Playlist', PlaylistSchema)

export default Playlist
