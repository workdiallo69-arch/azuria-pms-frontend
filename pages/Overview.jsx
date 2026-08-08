import { useEffect, useState } from 'react'
import { api } from '../api.js'
import KeyBoard from '../components/KeyBoard.jsx'

export default function Overview() {
  const [stats, setStats] = useState(null)
  const [rooms, setRooms] = useState([])
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function load() {
    try {
      const [statsData, roomsData, resData] = await Promise.all([
        api.dashboard(),
        api.rooms(),
        api.reservations(),
      ])
      setStats(statsData)
      setRooms(roomsData)
      setReservations(resData.slice(0, 5))
      setError(null)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    const interval = setInterval(load, 15000)
    return () => clearInterval(interval)
  }, [])

  const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Hôtel Azuria Palace</div>
          <h1 className="page-title">Vue d'ensemble</h1>
          <div className="page-meta">
            <span className="live-dot" style={{ marginRight: 7 }} />
            {today}
          </div>
        </div>
      </div>

      {error && (
        <div className="card" style={{ padding: 18, marginBottom: 20, borderColor: 'var(--status-maintenance)' }}>
          <span style={{ color: 'var(--status-maintenance)' }}>
            Connexion à l'API impossible : {error}. Le service gratuit peut mettre jusqu'à 50s à démarrer — réessayez.
          </span>
        </div>
      )}

      <div className="kpi-row">
        <div className="kpi-card" style={{ '--kpi-accent': 'var(--brass)' }}>
          <div className="kpi-label">Chambres total</div>
          <div className="kpi-value">{loading ? '—' : stats?.total_rooms ?? 0}</div>
          <div className="kpi-sub">dans l'établissement</div>
        </div>
        <div className="kpi-card" style={{ '--kpi-accent': 'var(--status-available)' }}>
          <div className="kpi-label">Disponibles</div>
          <div className="kpi-value">{loading ? '—' : stats?.available_rooms ?? 0}</div>
          <div className="kpi-sub">prêtes à louer</div>
        </div>
        <div className="kpi-card" style={{ '--kpi-accent': 'var(--status-cleaning)' }}>
          <div className="kpi-label">Réservations</div>
          <div className="kpi-value">{loading ? '—' : stats?.active_reservations ?? 0}</div>
          <div className="kpi-sub">enregistrées</div>
        </div>
        <div className="kpi-card" style={{ '--kpi-accent': 'var(--status-occupied)' }}>
          <div className="kpi-label">Taux d'occupation</div>
          <div className="kpi-value">{loading ? '—' : `${stats?.occupancy_rate ?? 0}%`}</div>
          <div className="kpi-sub">ce jour</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-header">
          <span className="card-title">Plan des chambres</span>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="loading-state pulse">Chargement du plan…</div>
          ) : rooms.length === 0 ? (
            <div className="empty-state">Aucune chambre trouvée.</div>
          ) : (
            <KeyBoard rooms={rooms} />
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">Dernières réservations</span>
        </div>
        {loading ? (
          <div className="loading-state pulse">Chargement…</div>
        ) : reservations.length === 0 ? (
          <div className="empty-state">Aucune réservation pour l'instant. L'agent créera ici les prochaines.</div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Chambre</th>
                <th>Arrivée</th>
                <th>Départ</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r) => (
                <tr key={r.id}>
                  <td>{r.guest_name}</td>
                  <td>{r.room_number} · {r.room_type}</td>
                  <td>{new Date(r.check_in).toLocaleDateString('fr-FR')}</td>
                  <td>{new Date(r.check_out).toLocaleDateString('fr-FR')}</td>
                  <td><span className={`badge ${r.status}`}>{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}
