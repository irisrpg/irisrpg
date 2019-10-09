'use strict'

import passport from 'passport'
import errors from 'restify-errors'
import { Profile } from '../../models/profile'

export default function (server) {
  server.get({
    name: 'profile//get',
    path: '/profile'
  },
  passport.authenticate('jwt', { session: false }),
  function (req, res, next) {
    Profile.find().byEmail(req.user.email).exec(function (err, profile) {
      if (err) return next(err)
      if (profile.length > 0) {
        res.send(profile[0])
      } else {
        return next(new errors.NotFoundError('No Profile Set'))
      }
      return next()
    })
  })
}
