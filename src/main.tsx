import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './store'
import App from './components/root/App'
import './index.css'

const router = createBrowserRouter([{ path: '*', element: <App /> }], {
  basename: '/corpus',
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
