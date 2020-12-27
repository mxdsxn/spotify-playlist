import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

import mongoConnection from '../database'

export interface IUser extends mongoose.Document {
  name: string,
  email: string,
  password: string,
  passwordResetCode: string,
  passwordResetExpires: string,
  spotifyToken: string
  createdAt: Date,
}

const UserSchema = new mongoConnection.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    passwordResetCode: {
        type: String,
        select: false,
    },
    passwordResetExpires: {
        type: String,
        select: false,
    },
    spotifyToken: {
        type: String,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
},)

UserSchema.pre('save', async function (next,) {
  const passwordDecripted = this.get('password',)
  const passwordEncripted = await bcrypt.hash(passwordDecripted, 11,)

  this.set({
      password: passwordEncripted, 
  },)
  next()
},)

const User = mongoConnection.model<IUser>('User', UserSchema,)

export default User
