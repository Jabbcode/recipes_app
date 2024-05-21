import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Toaster } from 'sonner'
import { RecipePage } from './pages/recipe'
import { HomePage } from './pages/home'
import { SettingsPage } from './pages/settings'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Toaster />
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="/add-recipe" element={<RecipePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
