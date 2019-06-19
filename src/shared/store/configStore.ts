import { applyMiddleware, createStore, DeepPartial, Middleware } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import loggerMW from './middleware/logger'
import rootReducer from './rootReducer'

export default function configStore(
  preloadedState?: DeepPartial<unknown> | undefined
) {
  const middlewares: Middleware[] = []
  if (process.env.NODE_ENV === 'development') {
    middlewares.push(loggerMW())
  }
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(rootReducer, preloadedState, composedEnhancers)

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer))
  }

  return store
}
