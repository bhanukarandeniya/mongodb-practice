/* eslint-disable no-undef */
const assert = require('assert')
const User = require('../../src/model/user')

describe('Update user', () => {
  let joe

  beforeEach((done) => {
    joe = new User({ name: 'Joe', posts: [] })
    joe.posts.push({ title: 'My first title' })
    joe.posts.push({ title: 'My Second title' })
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
    assertName(User.findOneAndUpdate({ _id: joe._id }, { name: 'Alex' }, { useFindAndModify: false }), done)
  })

  it('user update their postcount by one', (done) => {
    User.updateOne({ _id: joe._id, 'posts.title': 'My first title' }, { $inc: { 'posts.$.likes': 2 } })
      .then(() => User.findById(joe._id))
      .then(user => {
        assert(user.posts[0].likes === 2)
        done()
      })
  })

  it('update an existing user with a post', (done) => {
    const joe = new User({ name: 'Joe', posts: [] })
    joe.posts.push({ title: 'My first title' })
    joe.save()
      .then(() => User.findOne({ _id: joe._id }))
      .then((user) => {
        assert(user.posts.length === 1)
        done()
      })
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
