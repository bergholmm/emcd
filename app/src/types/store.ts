import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { ThunkDispatch } from 'redux-thunk'

import { RootState } from 'store'

export type Action = AnyAction

export type AsyncAction<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>

export type AsyncDispatch = ThunkDispatch<RootState, unknown, Action>
