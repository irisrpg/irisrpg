'use strict'

import mongoose from 'mongoose'
import timestamps from 'mongoose-timestamp'

const profileSchema = new mongoose.Schema({
  user: {
    type: String,
    index: true
  },
  profile: {
    name: {
      type: String,
      default: ''
    },
    nickname: {
      type: String,
      default: ''
    },
    level: {
      type: Number,
      default: 1
    },
    isLeader: {
      type: Boolean,
      default: false
    },
    isCurator: {
      type: Boolean,
      default: false
    },
    isDev: {
      type: Boolean,
      default: false
    },
    bio: {
      type: String,
      default: ''
    },
    titles: Array,
    media: {
      profilePicture: {
        type: String,
        default: ''
      },
      profileBackground: {
        type: String,
        default: ''
      }
    }
  }
})
profileSchema.plugin(timestamps)

profileSchema.query.byEmail = function (email) {
  return this.where({ user: email })
}

// https://github.com/Automattic/mongoose/issues/1251
let instance

try {
  // http://mongoosejs.com/docs/api.html#index_Mongoose-model
  instance = mongoose.model('Profile', profileSchema, 'profiles')
} catch (error) {
  instance = mongoose.model('Profile')
}

module.exports.Profile = instance
