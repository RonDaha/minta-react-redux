import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './styles/loader.css'
import './styles/index.css'
import App from './App'
import store from './Store/store'


ReactDOM.render(
      <Provider store={store}>
          <App />
      </Provider>, document.getElementById('root')
)

