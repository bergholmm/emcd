import { Comic, ComicsResponse } from 'types'

const LIMIT = 24

export const fetchLatestComic = async (): Promise<Comic> => {
  try {
    const response = await fetch('/api/latestComic')
    return await response.json()
  } catch (error) {
    throw error
  }
}

export const fetchComics = async (number: number): Promise<ComicsResponse> => {
  try {
    if (number !== -1) {
      const response = await fetch(
        `/api/comics?number=${number}&limit=${LIMIT}`
      )
      return await response.json()
    } else {
      const response = await fetch(`/api/comics?limit=${LIMIT}`)
      return await response.json()
    }
  } catch (error) {
    throw error
  }
}
