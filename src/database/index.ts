import mongoose from 'mongoose'

const mongoConnection = mongoose

mongoConnection.connect('mongodb://localhost/spotilist', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})

mongoConnection.Promise = global.Promise

export default mongoConnection
