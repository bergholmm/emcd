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

export const fetchLatestComic = async (): Promise<Comic | undefined> => {
  try {
    const response = await fetch('/api/latestComic')
    return await response.json()
  } catch (error) {
    console.error(error)
  }
}
