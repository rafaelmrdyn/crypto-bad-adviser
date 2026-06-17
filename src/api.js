// Direct CoinStats API client. CoinStats sends `access-control-allow-origin: *`
// and allows the `x-api-key` header, so the browser can call it directly — no
// server-side proxy needed. The key is embedded at build time via Vite's env.
//
// NOTE: in a static build the key IS visible in the client bundle. That's an
// accepted tradeoff for this joke app. To hide it, switch to a Cloud Function
// proxy and route through /api/** instead.

const BASE = 'https://openapiv1.coinstats.app'
const KEY = import.meta.env.VITE_COINSTATS_API_KEY || ''

async function call(path) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'X-API-KEY': KEY, accept: 'application/json' },
  })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    const err = new Error(body.slice(0, 160))
    err.status = res.status
    throw err
  }
  return res.json()
}

export function getBlockchains() {
  return call('/wallet/blockchains')
}

export function getBalance(address, connectionId) {
  const q = `address=${encodeURIComponent(address)}&connectionId=${encodeURIComponent(connectionId)}`
  return call(`/wallet/balance?${q}`)
}
