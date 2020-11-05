/* eslint-disable no-undef */
const assert = require('assert')
const User = require('../../src/model/user')

describe('User Model Validation', () => {
  it('validate name property', (done) => {
    const user = new User({ name: undefined, postCount: 1 })
    const validation = user.validateSync()
    const { message } = validation.errors.name
    assert(message === 'Name filed missing')
    done()
  })

  it('validate name property', (done) => {
    const user = new User({ name: 'Al', postCount: 1 })
    user.save().catch((error) => {
      const { message } = error.errors.name
      assert(message === 'Name should hv minimum 3 characters')
      done()
    })
  })
})
