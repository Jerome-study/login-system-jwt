import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import AxiosErrorHandler from './pages/AxiosErrorHandler.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter forceRefresh >
      <AuthProvider>
        <AxiosErrorHandler>
          <App />
        </AxiosErrorHandler>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
