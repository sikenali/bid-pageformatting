const API_BASE = 'http://localhost:8099'

export async function formatDocument(file, config) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('config', JSON.stringify(config))

  const res = await fetch(`${API_BASE}/api/format`, {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error || `HTTP ${res.status}`)
  }

  return await res.blob()
}

export async function healthCheck() {
  const res = await fetch(`${API_BASE}/api/health`)
  return res.ok
}
