'use strict'

import Joi from 'joi'
import passport from 'passport'
import { Profile } from '../../models/profile'

export default function (server) {
  server.post({
    name: 'profile//post',
    path: '/profile',
    validation: {
      schema: {
        body: Joi.object({
          media: Joi.object({
            profileBackground: Joi.string().required(),
            profilePicture: Joi.string().required()
          }),
          name: Joi.string().required(),
          nickname: Joi.string().required(),
          bio: Joi.string().required()
        }).required()
      }
    }
  },
  passport.authenticate('jwt', { session: false }),
  function (req, res, next) {
    var newProfile = new Profile({
      user: req.user.email,
      profile: {
        name: req.body.name,
        nickname: req.body.nickname,
        level: 1,
        isLeader: false,
        isCurator: false,
        isDev: false,
        bio: req.body.bio,
        titles: [],
        media: {
          profilePicture: req.body.media.profilePicture,
          profileBackground: req.body.media.profileBackground
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
