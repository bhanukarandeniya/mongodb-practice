/* eslint-disable no-undef */
const assert = require('assert')
const BlogPost = require('../../src/model/blogPost')
const User = require('../../src/model/user')

describe('mongoose middleware test', () => {
  let post, author
  beforeEach((done) => {
    author = new User({ name: 'Mark' }) // Blog post author
    post = new BlogPost({ title: 'Js for dummies', content: 'Hello world' })
    author.blogPosts.push(post)
    Promise.all([post.save(), author.save()]).then(() => done())
  })

  it('pre remove hook', (done) => {
    author.remove().then(() => BlogPost.countDocuments()).then((count) => {
      assert(count === 0)
      done()
    })
  })
})
