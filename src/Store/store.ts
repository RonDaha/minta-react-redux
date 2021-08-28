import { createStore } from 'redux'
import rootReducer from './rootReducer'
import { devToolsEnhancer } from 'redux-devtools-extension'

const store = createStore(rootReducer, devToolsEnhancer({}))
export default store
