/* eslint-disable no-undef */
const assert = require('assert')
const User = require('../../src/model/user')

describe('Creating a record', () => {
  it('Save a user', (done) => {
    const mark = new User({ name: 'Mark' })
    mark.save()
      .then(() => {
        assert(!mark.isNew)
        done()
      }
      )
  })
})
