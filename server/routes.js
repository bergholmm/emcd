const createRoutes = (router) => {
  router.get('/status', (_, res) => {
    res.json({ message: 'ok' })
  })
}

export default createRoutes
