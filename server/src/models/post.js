'use strict'

import mongoose from 'mongoose'
import timestamps from 'mongoose-timestamp'

const postSchema = new mongoose.Schema({
  author: {
    type: String,
    index: true
  },
  post: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    media: {
      url: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: ''
      }
    },
    counts: {
      likes: {
        type: String,
        default: ''
      },
      comments: {
        type: String,
        default: ''
      },
      shares: {
        type: String,
        default: ''
      }
    },
    lastComments: Array
  }
})
postSchema.plugin(timestamps)

postSchema.query.byAuthor = function (email) {
  return this.where({ author: email })
}

// https://github.com/Automattic/mongoose/issues/1251
let instance

try {
  // http://mongoosejs.com/docs/api.html#index_Mongoose-model
  instance = mongoose.model('Post', postSchema, 'posts')
} catch (error) {
  instance = mongoose.model('Post')
}

module.exports.Post = instance
