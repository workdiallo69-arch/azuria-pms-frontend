const STATUS_LABELS = {
  available: 'Disponible',
  occupied: 'Occupée',
  cleaning: 'Nettoyage',
  maintenance: 'Maintenance',
}

export default function KeyBoard({ rooms }) {
  const floors = {}
  rooms.forEach((r) => {
    if (!floors[r.floor]) floors[r.floor] = []
    floors[r.floor].push(r)
  })
  const floorNumbers = Object.keys(floors).sort((a, b) => b - a)

  return (
    <div>
      <div className="keyboard-wrap">
        {floorNumbers.map((floor) => (
          <div className="keyboard-floor" key={floor}>
            <span className="floor-label">ÉT. {floor}</span>
            <div className="floor-rooms">
              {floors[floor]
                .sort((a, b) => a.room_number.localeCompare(b.room_number))
                .map((room) => (
                  <div
                    key={room.id}
                    className={`room-peg ${room.status}`}
                    title={`Chambre ${room.room_number} — ${room.room_type} — ${STATUS_LABELS[room.status]}`}
                  >
                    {room.room_number}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <div className="legend">
        <div className="legend-item">
          <span className="legend-dot" style={{ background: 'var(--status-available)' }} />
          Disponible
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: 'var(--brass)' }} />
          Occupée
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: 'var(--status-cleaning)' }} />
          Nettoyage
        </div>
        <div className="legend-item">
          <span className="legend-dot" style={{ background: 'var(--status-maintenance)' }} />
          Maintenance
        </div>
      </div>
    </div>
  )
}
