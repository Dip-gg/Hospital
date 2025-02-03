import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './auth/AuthContext.jsx'
import App from './App.jsx'
import './index.css'
import '@mantine/core/styles.css';
import '@mantine/core/styles.layer.css';
import '@mantine/dates/styles.layer.css';

// ... other styles

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
