import { Action, AsyncAction, ComicsResponse } from 'types'
import { fetchComics } from 'services'

export const GET_COMICS = 'GET_COMICS'
export const GET_COMICS_SUCCESS = 'GET_COMICS_SUCCESS'
export const GET_COMICS_FAILURE = 'GET_COMICS_FAILURE'
export const TOGGLE_DIALOG = 'TOGGLE_DIALOG'
export const SET_CURRENT_COMIC = 'SET_CURRENT_COMIC'
export const NEXT_COMIC = 'NEXT_COMIC'
export const PREV_COMIC = 'PREV_COMIC'

export const getComics = (): Action => ({
  type: GET_COMICS,
})

export const getComicsSuccess = (data: ComicsResponse): Action => ({
  type: GET_COMICS_SUCCESS,
  payload: {
    next: data.next,
    comics: data.comics,
  },
})

export const getComicsFailure = (errorMessage: string): Action => ({
  type: GET_COMICS_FAILURE,
  payload: errorMessage,
})

export const toggleDialog = (): Action => ({
  type: TOGGLE_DIALOG,
})

export const setCurrentComic = (current: number): Action => ({
  type: SET_CURRENT_COMIC,
  payload: current,
})

export const nextComic = (): Action => ({
  type: NEXT_COMIC,
})

export const prevComic = (): Action => ({
  type: PREV_COMIC,
})

export const fetchComicsAction = (): AsyncAction => {
  return async (dispatch, getState) => {
    const { next, isFetching } = getState().explore
    if (isFetching) return

    try {
      dispatch(getComics())
      const res = await fetchComics(next)
      dispatch(getComicsSuccess(res))
    } catch (error) {
      dispatch(getComicsFailure(error))
    }
  }
}
