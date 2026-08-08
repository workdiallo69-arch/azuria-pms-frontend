const API_BASE = 'https://azuria-pms-backend.onrender.com'

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || `Erreur ${res.status}`)
  }
  return res.json()
}

export const api = {
  dashboard: () => request('/dashboard'),
  rooms: () => request('/rooms'),
  roomTypes: () => request('/room-types'),
  availability: (checkin, checkout) =>
    request(`/availability?checkin=${checkin}&checkout=${checkout}`),
  reservations: () => request('/reservations'),
  createReservation: (data) =>
    request('/reservations', { method: 'POST', body: JSON.stringify(data) }),
  cancelReservation: (id) =>
    request(`/reservations/${id}/cancel`, { method: 'PATCH' }),
}
