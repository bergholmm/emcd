import fetch from 'node-fetch'

const HOST = 'https://xkcd.com/'
const PATH = 'info.0.json'

export const fetchComic = async number => {
  try {
    let response
    if (number) response = await fetch(`${HOST}${number}/${PATH}`)
    else response = await fetch(`${HOST}/${PATH}`)

    if (response.statusText !== 'OK') throw new Error(response.statusText)

    return response.json()
  } catch (error) {
    throw error
  }
}

export const fetchComics = async (number, limit = 20) => {
  try {
    let latestComic
    if (!number) {
      latestComic = await fetchComic()
      number = latestComic.num - 1
      limit--
    }

    let comicPromises = []
    const breakPoint = number - limit
    for (number; number > breakPoint && number > 0; number--) {
      comicPromises.push(fetchComic(number))
    }

    const comics = await Promise.all(comicPromises)
    return latestComic ? [latestComic, ...comics] : comics
  } catch (error) {
    throw error
  }
}
