/* eslint-disable no-undef */
const assert = require('assert')
const User = require('../../src/model/user')

describe('Update user', () => {
  let joe

  beforeEach((done) => {
    joe = new User({ name: 'Joe' })
    joe.save()
      .then(() => done())
  })

  it('instance type using set n save', (done) => {
    joe.set('name', 'Alex')
    assertName(joe.save(), done)
  })

  it('instance type using update', (done) => {
    assertName(joe.updateOne({ name: 'Alex' }), done)
  })

  it('class type using update', (done) => {
    assertName(User.updateOne({ _id: joe._id }, { name: 'Alex' }), done)
  })

  it('model class can find a record with an Id and update', (done) => {
    assertName(User.findOneAndUpdate({ _id: joe._id }, { name: 'Alex' }, {useFindAndModify: false}), done)
  })

  const assertName = (operation, done) => {
    operation
      .then(() => User.findById(joe._id))
      .then((user) => {
        assert(user.name === 'Alex')
        done()
      })
  }
})
