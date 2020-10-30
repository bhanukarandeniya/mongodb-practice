/* eslint-disable no-undef */
const assert = require('assert')
const User = require('../../src/model/user')
const Comment = require('../../src/model/comment')
const BlogPost = require('../../src/model/blogPost')

describe('association test of User, BlogPost, Comment', () => {
  let owner, post, comment, author
  beforeEach((done) => {
    author = new User({ name: 'Mark' }) // Blog post author
    owner = new User({ name: 'Joe' }) // Commented user
    post = new BlogPost({ title: 'Js for dummies', content: 'Hello world' })
    comment = new Comment({ content: 'Great post !!' })

    comment.owner = owner
    post.comments.push(comment)
    author.blogPosts.push(post)
    Promise.all([owner.save(), post.save(), comment.save(), author.save()]).then(() => done())
  })

  it('association persistance', (done) => {
    User.findOne({ _id: author._id }).then(user => {
      assert(user.name === 'Mark')
      assert(user.blogPosts.length === 1)
    }).then(() => {
      BlogPost.findOne({ _id: post._id }).then(post => {
        assert(post.title === 'Js for dummies')
        assert(post.content === 'Hello world')
      })
    }).then(() => {
      Comment.findOne({ _id: comment._id }).then(comment => {
        assert(comment.content === 'Great post !!')
        done()
      })
    })
  })

  it('retrive nested subdocuments', (done) => {
    User.findOne({ _id: author._id }).populate('blogPosts')
      .then((user) => {
        assert(user.blogPosts[0].title === 'Js for dummies')
        assert(user.blogPosts[0].content === 'Hello world')
        done()
      })
  })

  it('retrive deeply nested subdocuments', (done) => {
    User.findOne({ _id: author._id }).populate({
      path: 'blogPosts',
      populate: {
        path: 'comments',
        model: 'comment',
        populate: {
          path: 'owner',
          model: 'user'
        }
      }
    }).then(user => {
      assert(user.blogPosts[0].title === 'Js for dummies')
      assert(user.blogPosts[0].content === 'Hello world')
      assert(user.blogPosts[0].comments[0].content === 'Great post !!')
      assert(user.blogPosts[0].comments[0].owner.name === 'Joe')
      done()
    })
  })

})
