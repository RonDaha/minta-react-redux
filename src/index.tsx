import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './styles/loader.css'
import './styles/index.css'
import App from './App'
import store from './Store/store'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
      <Provider store={store}>
          <Router>
              <App />
        </Router>
      </Provider>, document.getElementById('root')
)

