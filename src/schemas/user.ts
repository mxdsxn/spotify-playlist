import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import { UserType } from '@types'

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

const User = mongoose.model<UserType>('User', UserSchema)

export default User
