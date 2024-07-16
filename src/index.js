import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { store } from './features/store'
import App from './App'
import './styles/main.scss'

/**
 * Main entry point of the React application.
 * Uses ReactDOM.createRoot to create a rendering root.
 * Wraps the application in the Redux provider and React Router.
 */
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)