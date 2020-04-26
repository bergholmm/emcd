import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { ThunkDispatch } from 'redux-thunk'
import { Comic } from 'types'

export type Action = AnyAction

export type AsyncAction<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>

export type AsyncDispatch = ThunkDispatch<RootState, unknown, Action>

export interface ExploreState {
  comics: Comic[]
  next: number
  currentComic: number
  isDialogOpen: boolean
  isFetching: boolean
  errorMessage: string
}

export interface RootState {
  explore: ExploreState
}
