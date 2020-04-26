import { createStore, applyMiddleware, Middleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from 'store/rootReducer'

const middlewares: Middleware[] = [thunkMiddleware]
if (process.env.NODE_ENV !== 'production') middlewares.push(createLogger())

export default () => createStore(rootReducer, applyMiddleware(...middlewares))
