/* eslint-disable no-undef */
const assert = require('assert')
const User = require('../../src/model/user')

describe('creating a record', () => {
  it('Save a user', (done) => {
    const mark = new User({ name: 'Mark' })
    mark.save()
      .then(() => {
        assert(!mark.isNew)
        done()
      }
      )
  })

  it('saving a user with a post', (done) => {
    const joe = new User({ name: 'Joe', posts: [{ title: 'First post' }] })
    joe.save().then(() => User.findOne({ _id: joe._id }))
      .then((user) => {
        assert(user.posts.length === 1)
        done()
      })
  })
})
