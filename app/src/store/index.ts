import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import rootReducer from 'store/rootReducer'

const middlewares: any[] = [thunkMiddleware]

if (process.env.NODE_ENV !== 'production') middlewares.push(createLogger())

export * from 'store/rootReducer'
export default () => createStore(rootReducer, applyMiddleware(...middlewares))
