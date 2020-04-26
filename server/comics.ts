import fetch, { Response } from 'node-fetch'
import { Comic } from './types'

const HOST = 'https://xkcd.com/'
const PATH = 'info.0.json'

export const fetchComic = async (comicIssue?: number): Promise<Comic> => {
  try {
    let response: Response
    if (comicIssue) response = await fetch(`${HOST}${comicIssue}/${PATH}`)
    else response = await fetch(`${HOST}/${PATH}`)

    if (!response.ok) throw new Error(response.statusText)

    return response.json()
  } catch (error) {
    throw error
  }
}

export const fetchComics = async (
  comicIssue: number,
  limit: number = 20
): Promise<Comic[]> => {
  try {
    let latestComic: Comic
    if (!comicIssue) {
      latestComic = await fetchComic()
      comicIssue = latestComic.num - 1
      limit--
    }

    let comicPromises = []
    const breakPoint = comicIssue - limit
    for (comicIssue; comicIssue > breakPoint && comicIssue > 0; comicIssue--) {
      comicPromises.push(fetchComic(comicIssue))
    }

    const comics = await Promise.all(comicPromises)
    return latestComic ? [latestComic, ...comics] : comics
  } catch (error) {
    throw error
  }
}
