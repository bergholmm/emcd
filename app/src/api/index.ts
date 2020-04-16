// interface Comic {
//   month: string
//   num: number
//   link: string
//   year: string
//   news: string
//   safe_title: string
//   transcript: string
//   alt: string
//   img: string
//   title: string
//   day: string
// }

export const fetchLatestComic = async (): Promise<any> => {
  try {
    const response = await fetch('/api/status')
    return await response.json()
  } catch (error) {
    console.error(error)
  }
}
