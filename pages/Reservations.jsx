import { useEffect, useState } from 'react'
import { api } from '../api.js'

export default function Reservations() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)

  function load() {
    api.reservations().then(setReservations).finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
    const interval = setInterval(load, 15000)
    return () => clearInterval(interval)
  }, [])

  async function handleCancel(id) {
    if (!confirm('Annuler cette réservation ?')) return
    await api.cancelReservation(id)
    load()
  }

  return (
    <>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Registre</div>
          <h1 className="page-title">Réservations</h1>
          <div className="page-meta">{reservations.length} réservations récentes</div>
        </div>
      </div>

      <div className="card">
        {loading ? (
          <div className="loading-state pulse">Chargement…</div>
        ) : reservations.length === 0 ? (
          <div className="empty-state">
            Aucune réservation enregistrée. Les réservations créées par l'agent apparaîtront ici automatiquement.
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Contact</th>
                <th>Chambre</th>
                <th>Arrivée</th>
                <th>Départ</th>
                <th>Total</th>
                <th>Source</th>
                <th>Statut</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r) => (
                <tr key={r.id}>
                  <td>{r.guest_name}</td>
                  <td style={{ color: 'var(--ink-secondary)', fontSize: 12.5 }}>
                    {r.guest_email || r.guest_phone || '—'}
                  </td>
                  <td>{r.room_number} · {r.room_type}</td>
                  <td>{new Date(r.check_in).toLocaleDateString('fr-FR')}</td>
                  <td>{new Date(r.check_out).toLocaleDateString('fr-FR')}</td>
                  <td>{r.total_price ? `${parseFloat(r.total_price).toLocaleString('fr-FR')} €` : '—'}</td>
                  <td style={{ color: 'var(--ink-secondary)', fontSize: 12.5 }}>{r.source}</td>
                  <td><span className={`badge ${r.status}`}>{r.status}</span></td>
                  <td>
                    {r.status === 'confirmed' && (
                      <button
                        onClick={() => handleCancel(r.id)}
                        style={{
                          background: 'none', border: 'none', color: 'var(--status-maintenance)',
                          fontSize: 12, cursor: 'pointer', fontWeight: 500,
                        }}
                      >
                        Annuler
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}
