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

export const fetchComics = async (
  comicIssue: number
): Promise<ComicsResponse> => {
  try {
    let response
    if (comicIssue !== -1)
      response = await fetch(
        `/api/comics?comicIssue=${comicIssue}&limit=${LIMIT}`
      )
    else response = await fetch(`/api/comics?limit=${LIMIT}`)

    if (!response.ok) throw new Error(response.statusText)
    return await response.json()
  } catch (error) {
    throw error
  }
}
