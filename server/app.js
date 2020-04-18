import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'

import createRoutes from './routes'
import { createLoggerMiddleware } from './middleware'

const createResources = () => {
  const logger = {
    info: (message, ...rest) => console.info(message, ...rest),
    error: (message, ...rest) => console.error(message, ...rest),
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
  const loggerMiddleware = createLoggerMiddleware(logger)

  app.use(bodyParser.json())
  app.use(loggerMiddleware)
  app.use(express.static(path.resolve(__dirname, '../app/build')))
  app.use('/api', router)

  createRoutes({ router, logger })

  app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, '../app/build', 'index.html'))
  })

  app.listen(process.env.PORT || 5000, function() {
    logger.info(`Node server listening on port ${process.env.PORT || 5000}`)
  })

  return { logger, shutdown }
}

export default createApp
