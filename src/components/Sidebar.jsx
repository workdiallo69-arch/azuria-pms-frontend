const NAV_MAIN = [
  { id: 'overview', label: "Vue d'ensemble", icon: '◈' },
  { id: 'rooms', label: 'Chambres', icon: '▤' },
  { id: 'reservations', label: 'Réservations', icon: '▥' },
]

export default function Sidebar({ current, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">A</div>
        <div className="brand-text">
          <div className="brand-name">Azuria Palace</div>
          <div className="brand-sub">PMS</div>
        </div>
      </div>

      <nav className="nav-group">
        <div className="nav-label">Principal</div>
        {NAV_MAIN.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${current === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}
