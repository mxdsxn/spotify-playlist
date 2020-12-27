import mongoose from 'mongoose'

import mongoConnection from '../database'

export interface IPlaylist extends mongoose.Document {
  name: string,
  description: string,
  tracks: [any],
  isPrivate: boolean,
  userId: string,
}

const PlaylistSchema = new mongoConnection.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    tracks: [ {
        type: mongoConnection.Schema.Types.ObjectId,
        ref: 'Track',
    }, ],
    isPrivate: {
        type: Boolean,
        required: true,
    },
    userId: {
        type: mongoConnection.Schema.Types.ObjectId,
        ref: 'User',
    },
},)

const Playlist = mongoConnection.model<IPlaylist>('Playlist', PlaylistSchema,)

export default Playlist
