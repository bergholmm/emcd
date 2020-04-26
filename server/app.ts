import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as path from 'path'
import * as morgan from 'morgan'
import createRoutes from './routes'

const createResources = () => {
  const shutdown = (signal: string) => {
    return (err: any) => {
      console.log(`App stopped because of: ${signal}`)
      if (err) console.log(err.stack || err)
      process.exit(err ? 1 : 0)
    }
  }

  return { shutdown }
}

const createApp = async () => {
  const app: express.Application = express()
  const router = express.Router()
  const { shutdown } = createResources()

  app.use(bodyParser.json())
  app.use(morgan('tiny'))
  app.use(express.static(path.resolve(__dirname, '../app/build')))
  app.use('/api', router)

  createRoutes({ router })

  app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, '../app/build', 'index.html'))
  })

  app.listen(process.env.PORT || 5000, function() {
    console.log(`Node server listening on port ${process.env.PORT || 5000}`)
  })

  return { shutdown }
}

export default createApp
