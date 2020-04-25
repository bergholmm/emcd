import { combineReducers } from 'redux'
import {
  reducer as exploreReducer,
  State as ExploreState,
} from 'features/Explore/store'

export interface RootState {
  explore: ExploreState
}

export default combineReducers({
  explore: exploreReducer,
})
