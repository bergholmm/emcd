import { Comic, ComicsResponse } from 'types'

const LIMIT = 24

export const fetchLatestComic = async (): Promise<Comic> => {
  try {
    const response = await fetch('/api/latestComic')
    if (!response.ok) throw new Error(response.statusText)
    return await response.json()
  } catch (error) {
    throw error
  }
}

export const fetchComics = async (number: number): Promise<ComicsResponse> => {
  try {
    let response
    if (number !== -1)
      response = await fetch(`/api/comics?number=${number}&limit=${LIMIT}`)
    else response = await fetch(`/api/comics?limit=${LIMIT}`)

    if (!response.ok) throw new Error(response.statusText)
    return await response.json()
  } catch (error) {
    throw error
  }
}
