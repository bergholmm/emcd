jest.mock('node-fetch')

import fetch from 'node-fetch'
import { fetchComic } from './comics'

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

describe('In a suit of test for comics', () => {
  describe('for fetchComic', () => {
    it('should throw an error if request failed', async () => {
      // @ts-ignore
      fetch.mockReturnValue(
        Promise.resolve(createMockResponse(500, false, null))
      )
      const promise = fetchComic()
      await expect(promise).rejects.toThrow()
    })
    it('should return a comic in the format Comic if successful', async () => {
      // @ts-ignore
      fetch.mockReturnValue(
        Promise.resolve(createMockResponse(200, true, mockComic))
      )
      const comic = await fetchComic()
      expect(comic).toEqual(mockComic)
    })
  })
})
