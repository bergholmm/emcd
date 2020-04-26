import { fetchComics, fetchLatestComic } from './comics'

const mockComic = {
  month: '1',
  num: 1,
  link: '',
  year: '2006',
  news: '',
  safe_title: 'Barrel - Part 1',
  transcript: '',
  alt: "Don't we all.",
  img: 'https://imgs.xkcd.com/comics/barrel_cropped_(1).jpg',
  title: 'Barrel - Part 1',
  day: '1',
}

const createMockResponse = (status: number, ok: boolean, data: any) => ({
  status,
  ok,
  json: async () => Promise.resolve(data),
})

const mockFetch = (status: number, ok: boolean, data: any) => {
  // @ts-ignore
  // eslint-disable-next-line
  fetch = jest.fn(() => Promise.resolve(createMockResponse(status, ok, data)))
}

describe('In a suit of test for services/comics', () => {
  describe('for fetchLatestComic', () => {
    it('should throw an error if request failed', async () => {
      mockFetch(500, false, null)
      const promise = fetchLatestComic()
      await expect(promise).rejects.toThrow()
    })
    it('should return the latestComic in the format Comic if successfull', async () => {
      mockFetch(200, true, mockComic)
      const comic = await fetchLatestComic()
      expect(comic).toEqual(mockComic)
    })
  })
  describe('for fetchComics', () => {
    it('should throw an error if request failed', async () => {
      mockFetch(500, false, null)
      const promise = fetchComics(1)
      await expect(promise).rejects.toThrow()
    })
    it('should return a response in the format ComicsResponse if successfull', async () => {
      mockFetch(200, true, { next: 0, comics: [mockComic] })
      const response = await fetchComics(-1)
      expect(response).toEqual({ next: 0, comics: [mockComic] })
    })
  })
})
