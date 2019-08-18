const express = require('express')
const { host, port } = require('config')

const expressSetup = require('./config/express')
const nuxt = require('./config/nuxt')

const app = express()

expressSetup(app)
app.use(nuxt.render) // render with nuxt
app.listen(port, host) // start http listner

const logger = console
logger.log(`Server listening on ${host}:${port}`)
