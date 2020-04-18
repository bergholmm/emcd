export const createLoggerMiddleware = logger => (req, res, next) => {
  const now = new Date()
  const formattedDate =
    now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
  logger.info(`[${formattedDate}] ${req.method}:${req.url} ${res.statusCode}`)
  next()
}
