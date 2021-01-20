import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

export interface IUser {
  name: string,
  email: string,
  password: string,
  passwordResetCode: string,
  passwordResetExpires: string,
  spotifyToken: string
  createdAt: Date,
}

const UserSchema = new mongoose.Schema({
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
})

UserSchema.pre('save', async function (next) {
  const passwordDecripted = this.get('password')
  const passwordEncripted = await bcrypt.hash(passwordDecripted, 11)

  this.set({ password: passwordEncripted })
  next()
})

export type UserSchemaType = IUser & mongoose.Document

const User = mongoose.model<UserSchemaType>('User', UserSchema)

export default User
