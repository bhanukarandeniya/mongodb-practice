const mongooese = require('mongoose')
const Schema = mongooese.Schema

const PostSchema = new Schema({
  title: String,
  likes: {
    type: Number,
    default: 0
  }
})

module.exports = { PostSchema }
