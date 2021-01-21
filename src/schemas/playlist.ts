import mongoose from 'mongoose'
import { PlaylistType } from '@types'

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

const Playlist = mongoose.model<PlaylistType>('Playlist', PlaylistSchema)

export default Playlist
