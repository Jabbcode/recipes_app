import './App.css'
import { Outlet } from 'react-router-dom'

import Navbar from './components/Navbar'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default App
