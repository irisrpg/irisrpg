'use strict'

import passport from 'passport'
import { Post } from '../../models/post'

export default function (server) {
  server.get({
    name: 'posts//get',
    path: '/posts'
  },
  passport.authenticate('jwt', { session: false }),
  function (req, res, next) {
    Post.find().byAuthor(req.user.email).exec(function (err, posts) {
      if (err) return next(err)
      res.send(posts)
      return next()
    })
  })
}
