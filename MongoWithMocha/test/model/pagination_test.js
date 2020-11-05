/* eslint-disable no-undef */
const assert = require('assert')
const User = require('../../src/model/user')

describe('pagination testing', () => {
  let mark, joe, tim, andy
  beforeEach((done) => {
    mark = new User({ name: 'Mark' })
    joe = new User({ name: 'Joe' })
    tim = new User({ name: 'Tim' })
    andy = new User({ name: 'Andy' })
    Promise.all([mark.save(), joe.save(), tim.save(), andy.save()]).then(() => done())
  })

  it('load 2nd and 3rd users in asending order', (done) => {
    User.find({}).sort({ name: 1 }).skip(1).limit(2).then((users) => {
      assert(users.length === 2)
      assert(users[0].name === 'Joe')
      assert(users[1].name === 'Mark')
      done()
    })
  })
})
