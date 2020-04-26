import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as path from 'path'
import createRoutes from './routes'

const createLoggerMiddleware = (logger: Logger) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const now = new Date()
  const formattedDate =
    now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
  logger.info(`[${formattedDate}] ${req.method}:${req.url} ${res.statusCode}`)
  next()
}

interface Logger {
  info: (message: string, ...rest: any) => void
  error: (message: string, ...rest: any) => void
}

const logger: Logger = {
  info: (message: string, ...rest: any) => console.info(message, ...rest),
  error: (message: string, ...rest: any) => console.error(message, ...rest),
}

const createResources = () => {
  const shutdown = (signal: string) => {
    return (err: any) => {
      logger.info(`App stopped because of: ${signal}`)
      if (err) logger.error(err.stack || err)
      process.exit(err ? 1 : 0)
    }
  }

  return { logger, shutdown }
}

const createApp = async () => {
  const app: express.Application = express()
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
