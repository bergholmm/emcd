import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'

import createRoutes from './routes'

const createResources = () => {
  const logger = {
    info: message => console.info(message),
    error: message => console.error(message),
  }

  const shutdown = signal => {
    return err => {
      logger.info(`App stopped because of: ${signal}`)
      if (err) logger.error(err.stack || err)
      process.exit(err ? 1 : 0)
    }
  }

  return { logger, shutdown }
}

const createApp = async () => {
  const app = express()
  const router = express.Router()
  const { logger, shutdown } = createResources()

  app.use(bodyParser.json())
  app.use(express.static(path.resolve(__dirname, '../app/build')))
  app.use('/api', router)

  createRoutes(router)

  app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, '../app/build', 'index.html'))
  })

  app.listen(5000, function() {
    logger.info(`Node server listening on port 5000`)
  })

  return { logger, shutdown }
}

export default createApp
