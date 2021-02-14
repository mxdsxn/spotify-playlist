import mongoose from 'mongoose'
import { envs } from '@config'

const {
  DB_NAME, DB_HOST, NODE_ENV, MONGO_URL,
} = envs

const mongoUrl = NODE_ENV === 'test' && !!MONGO_URL
  ? MONGO_URL
  : `mongodb://${DB_HOST}/${DB_NAME}`

const mongoConnection = mongoose

mongoConnection.connect(mongoUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})

mongoConnection.Promise = global.Promise

export default mongoConnection
