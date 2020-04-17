import fetch from 'node-fetch'

const createRoutes = router => {
  router.get('/status', (_, res) => {
    res.json({ message: 'ok' })
  })

  router.get('/latestComic', async (_, res) => {
    try {
      const response = await fetch('https://xkcd.com/info.0.json')

      if (response.statusText !== 'OK')
        res.status(500).send(response.statusText)

      const comic = await response.json()
      res.json({ ...comic })
    } catch (error) {
      res.status(500).send(error)
    }
  })
}

export default createRoutes
