export interface Comic {
  month: string
  num: number
  link: string
  year: string
  news: string
  safe_title: string
  transcript: string
  alt: string
  img: string
  title: string
  day: string
}

export interface ComicResponse {
  next: number
  comics: Comic[]
}

export const fetchLatestComic = async (): Promise<Comic> => {
  try {
    const response = await fetch('/api/latestComic')
    return await response.json()
  } catch (error) {
    console.error(error)
    return {} as Comic
  }
}

export const fetchComics = async (
  number?: number | null
): Promise<ComicResponse> => {
  try {
    let response
    if (number) response = await fetch(`/api/comics?number=${number}&limit=24`)
    else response = await fetch(`/api/comics?limit=24`)
    return await response.json()
  } catch (error) {
    console.error(error)
    return { next: -1, comics: [] }
  }
}
