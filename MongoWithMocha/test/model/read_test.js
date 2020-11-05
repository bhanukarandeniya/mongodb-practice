/* eslint-disable no-undef */
const assert = require('assert')
const User = require('../../src/model/user')

describe('Reading users out of the database', () => {
  let mark
  beforeEach((done) => {
    mark = new User({ name: 'Mark' })
    mark.save().then(() => done())
  })

  it('find all users with the name Mark', (done) => {
    User.find({ name: 'Mark' })
      .then(users => {
        assert(users[0]._id.toString() === mark._id.toString())
        done()
      })
  })

  it('find user by Id', (done) => {
    User.findById(mark._id)
      .then(user => {
        assert(user._id.toString() === mark._id.toString())
        done()
      })
  })

  it('find user', (done) => {
    User.findOne({ _id: mark._id })
      .then(user => {
        assert(user.name === mark.name)
        done()
      })
  })
})
