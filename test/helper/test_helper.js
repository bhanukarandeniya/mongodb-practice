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
  const { users, comments, blogposts } = mongoose.connection.collections
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => done())
    })
  })
})

module.exports = { mongoose }
