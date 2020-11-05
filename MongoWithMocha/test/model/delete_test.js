const assert = require('assert')
const User = require('../../src/model/user')

// eslint-disable-next-line no-undef
describe('Deleting a user', () => {
  let joe
  // eslint-disable-next-line no-undef
  beforeEach((done) => {
    joe = new User({ name: 'Joe' })
    joe.save().then(() => done())
  })

  it('model instance delete', (done) => {
    joe.deleteOne()
      .then(() => User.findOne({ _id: joe._id }))
      .then((user) => {
        assert(user === null)
        done()
      })
  })

  it('class instance delete', (done) => {
    User.deleteOne({ _id: joe._id })
      .then(() => User.findOne({ _id: joe._id }))
      .then((user) => {
        assert(user === null)
        done()
      })
  })

  it('class method findOneAndRemove', (done) => {
    User.findOneAndDelete({ _id: joe._id })
      .then(() => User.findOne({ _id: joe._id }))
      .then((user) => {
        assert(user === null)
        done()
      })
  })

  it('class method findByIdAndRemove', (done) => {
    User.findByIdAndDelete({ _id: joe._id })
      .then(() => User.findOne({ _id: joe._id }))
      .then((user) => {
        assert(user === null)
        done()
      })
  })
  
})
