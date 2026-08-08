import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Overview from './pages/Overview.jsx'
import Rooms from './pages/Rooms.jsx'
import Reservations from './pages/Reservations.jsx'

export default function App() {
  const [page, setPage] = useState('overview')

  return (
    <div className="app-shell">
      <Sidebar current={page} onNavigate={setPage} />
      <main className="main-content">
        {page === 'overview' && <Overview />}
        {page === 'rooms' && <Rooms />}
        {page === 'reservations' && <Reservations />}
      </main>
    </div>
  )
}
