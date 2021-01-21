import mongoose from 'mongoose'
import { PlaylistSchemaType } from '@types'

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

const Playlist = mongoose.model<PlaylistSchemaType>('Playlist', PlaylistSchema)

export default Playlist
