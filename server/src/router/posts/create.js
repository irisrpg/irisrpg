'use strict'

import Joi from 'joi'
import passport from 'passport'
import { Post } from '../../models/post'

export default function (server) {
  server.post({
    name: 'posts//post',
    path: '/posts',
    validation: {
      schema: {
        body: Joi.object({
          media: Joi.object({
            url: Joi.string().required(),
            type: Joi.string().required()
          }).optional(),
          title: Joi.string().required(),
          content: Joi.string().required()
        }).required()
      }
    }
  },
  passport.authenticate('jwt', { session: false }),
  function (req, res, next) {
    var newProfile = new Post({
      author: req.user.email,
      post: {
        title: req.body.title,
        content: req.body.content,
        media: {
          url: (req.body.media ? req.body.media.url : null),
          type: (req.body.media ? req.body.media.type : null)
        },
        counts: {
          likes: 0,
          comments: 0,
          shares: 0
        }
      }
    })
    newProfile.save(function (err) {
      if (err) {
        next(err)
      } else {
        res.send({
          status: 'ok'
        })
      }
    })
  })
}
