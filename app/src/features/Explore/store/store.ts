import { Action, ExploreState } from 'types'
import {
  GET_COMICS,
  GET_COMICS_SUCCESS,
  GET_COMICS_FAILURE,
  TOGGLE_DIALOG,
  SET_CURRENT_COMIC,
  NEXT_COMIC,
  PREV_COMIC,
} from './actions'

const initialState: ExploreState = {
  comics: [],
  next: -1,
  currentComic: -1,
  isDialogOpen: false,
  isFetching: false,
  errorMessage: '',
}

export const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_COMICS:
      return { ...state, isFetching: true, errorMessage: '' }
    case GET_COMICS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        comics: [...state.comics, ...action.payload.comics],
        next: action.payload.next,
      }
    case GET_COMICS_FAILURE:
      return { ...state, isFetching: false, errorMessage: action.payload }
    case TOGGLE_DIALOG:
      return { ...state, isDialogOpen: !state.isDialogOpen }
    case SET_CURRENT_COMIC:
      return { ...state, currentComic: action.payload }
    case NEXT_COMIC: {
      const lastComic = state.comics.length - 1
      if (state.currentComic === lastComic) return state
      return { ...state, currentComic: state.currentComic + 1 }
    }
    case PREV_COMIC: {
      if (state.currentComic === 0) return state
      return { ...state, currentComic: state.currentComic - 1 }
    }
    default:
      return state
  }
}

export const getComic = (state: ExploreState, index: number) =>
  state.comics[index]
