import { combineReducers } from 'redux'
import { RootState } from 'types'
import { reducer as exploreReducer } from 'features/Explore/store'

export default combineReducers<RootState>({
  explore: exploreReducer,
})
