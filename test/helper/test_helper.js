/* eslint-disable no-undef */
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

before((done) => {
  mongoose.connect('mongodb://localhost/users_test', { useNewUrlParser: true, useUnifiedTopology: true })
  mongoose.connection
    .once('open', () => console.log('Mongodb Connection established successfully...'))
    .on('error', (error) => console.error('Error occurred in mongodb connection..', error))
  done()
})

beforeEach((done) => {
  const { users } = mongoose.connection.collections
  users.drop(() => {
    done()
  })
})

module.exports = { mongoose }
