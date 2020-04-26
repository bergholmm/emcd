import { Request, Response } from 'express'
import { fetchComic, fetchComics } from './comics'
import { Comic } from './types'

const getNextNumber = (comics: Comic[]): number => {
  const comic = comics[comics.length - 1]
  return comic.num > 0 ? comic.num - 1 : 0
}

const createRoutes = ({ router }) => {
  router.get('/status', (_: Request, res: Response) => {
    res.json({ message: 'ok' })
  })

  router.get('/latestComic', async (_: Request, res: Response) => {
    try {
      const comic = await fetchComic()
      res.json({ ...comic })
    } catch (error) {
      res.status(500).send(error)
    }
  })

  router.get('/comics', async (req: Request, res: Response) => {
    const comicIssue = parseInt(req.query.comicIssue as string, 10)
    const limit = parseInt(req.query.limit as string, 10)

    try {
      const comics = await fetchComics(comicIssue, limit)
      const next = getNextNumber(comics)
      res.json({ comics, next })
    } catch (error) {
      res.status(500).send(error)
    }
  })
}

export default createRoutes
