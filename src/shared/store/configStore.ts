import {
  checkInternetConnection,
  createNetworkMiddleware,
  offlineActionTypes
} from 'react-native-offline'
import {
  AnyAction,
  applyMiddleware,
  createStore,
  DeepPartial,
  Middleware,
  Store
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore } from 'redux-persist'
import { PersistPartial } from 'redux-persist/es/persistReducer'
import { Persistor } from 'redux-persist/es/types'
import thunk from 'redux-thunk'
import { getHost } from 'shared/api'
import loggerMW from './middleware/logger'
import rootReducer from './rootReducer'

export default function configStore(
  callback: () => void,
  preloadedState?: DeepPartial<unknown> | undefined
) {
  const networkMiddleware = createNetworkMiddleware({
    queueReleaseThrottle: 200
  })
  const middlewares: Middleware[] = [networkMiddleware, thunk]
  if (process.env.NODE_ENV === 'development') {
    middlewares.push(loggerMW())
  }
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(rootReducer, preloadedState, composedEnhancers)

  if (module.hot) {
    module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer))
  }

  const persist = persistStore(store, undefined, () => {
    checkInternetConnection(getHost()).then((isConnected: any) => {
      store.dispatch({
        type: offlineActionTypes.CONNECTION_CHANGE,
        payload: isConnected
      })
      callback() // Notify our root component we are good to go, so that we can render our app
    })
  })

  return [store, persist] as [Store<PersistPartial, AnyAction>, Persistor]
}
