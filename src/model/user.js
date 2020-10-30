const mongoose = require('mongoose')
const { PostSchema } = require('./post-schema')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name filed missing'],
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name should hv minimum 3 characters'
    }
  },
  posts: [PostSchema],
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
})

UserSchema.virtual('postCount').get(function () {
  return this.posts.length
})

const User = mongoose.model('user', UserSchema)

module.exports = User
