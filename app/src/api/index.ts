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

export const fetchLatestComic = async (): Promise<Comic> => {
  try {
    const response = await fetch('/api/latestComic')
    return await response.json()
  } catch (error) {
    console.error(error)
    return {} as Comic
  }
}

export const fetchComics = async (): Promise<Comic[]> => {
  try {
    const response = await fetch('/api/comics')
    const data = await response.json()
    return data.comics
  } catch (error) {
    console.error(error)
    return []
  }
}
