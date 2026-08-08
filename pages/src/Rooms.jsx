import { useEffect, useState } from 'react'
import { api } from '../api.js'

export default function Rooms() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    api.rooms().then(setRooms).finally(() => setLoading(false))
  }, [])

  const filtered = filter === 'all' ? rooms : rooms.filter((r) => r.status === filter)

  return (
    <>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Inventaire</div>
          <h1 className="page-title">Chambres</h1>
          <div className="page-meta">{rooms.length} chambres au total</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {['all', 'available', 'occupied', 'cleaning', 'maintenance'].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              padding: '7px 14px',
              borderRadius: 20,
              fontSize: 12.5,
              fontWeight: 500,
              border: '1px solid var(--border-hairline)',
              background: filter === s ? 'var(--brass)' : 'var(--bg-card)',
              color: filter === s ? '#12151A' : 'var(--ink-secondary)',
              cursor: 'pointer',
            }}
          >
            {s === 'all' ? 'Toutes' : s === 'available' ? 'Disponibles' : s === 'occupied' ? 'Occupées' : s === 'cleaning' ? 'Nettoyage' : 'Maintenance'}
          </button>
        ))}
      </div>

      <div className="card">
        {loading ? (
          <div className="loading-state pulse">Chargement des chambres…</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Chambre</th>
                <th>Étage</th>
                <th>Type</th>
                <th>Capacité</th>
                <th>Prix / nuit</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{r.room_number}</td>
                  <td>{r.floor}</td>
                  <td>{r.room_type}</td>
                  <td>{r.capacity} pers.</td>
                  <td>{parseFloat(r.base_price).toLocaleString('fr-FR')} €</td>
                  <td><span className={`badge confirmed`} style={{
                    background: `var(--status-${r.status}-bg)`,
                    color: r.status === 'occupied' ? 'var(--brass-bright)' : `var(--status-${r.status})`,
                  }}>{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}
