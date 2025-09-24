import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './shared/styles'
import App from './app/App.jsx'

createRoot(document.getElementById('root')).render(
    <App />
)
