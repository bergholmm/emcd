import { fetchComic, fetchComics } from './comics'

const getNextNumber = comics => {
  const comic = comics[comics.length - 1]
  return comic.num > 0 ? comic.num - 1 : 0
}

const createRoutes = ({ router, logger }) => {
  router.get('/status', (_, res) => {
    res.json({ message: 'ok' })
  })

  router.get('/latestComic', async (req, res) => {
    try {
      const comic = await fetchComic()
      res.json({ ...comic })
    } catch (error) {
      logger.error(`[ERROR] ${req.method}:${req.url} 500`, error)
      res.status(500).send(error)
    }
  })

  router.get('/comics', async (req, res) => {
    const number = req.query.number
    const limit = req.query.limit

    try {
      const comics = await fetchComics(number, limit)
      const next = getNextNumber(comics)
      res.json({ comics, next })
    } catch (error) {
      logger.error(`[ERROR] ${req.method}:${req.url} 500`, error)
      res.status(500).send(error)
    }
  })
}

export default createRoutes
