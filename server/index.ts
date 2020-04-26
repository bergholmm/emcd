import * as cluster from 'cluster'
import { cpus } from 'os'
import createApp from './app'

const isDev = process.env.NODE_ENV !== 'production'
const numCPUs = cpus().length

if (!isDev && cluster.isMaster) {
  console.log(`Node cluster master ${process.pid} is running`)
  for (let i = 0; i < numCPUs; i++) cluster.fork()
  cluster.on('exit', (worker, code, signal) => {
    console.log(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
    )
  })
} else {
  createApp().then(({ shutdown }) => {
    console.log('App is running 🚀')
    process
      .on('SIGTERM', shutdown('SIGTERM'))
      .on('SIGINT', shutdown('SIGINT'))
      .on('uncaughtException', shutdown('uncaughtException'))
  })
}

