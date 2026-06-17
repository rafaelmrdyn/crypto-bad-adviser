import { useEffect, useMemo, useState } from 'react'
import { pickTier, pickLine, pickAdvice, bagJabs, makeCtx, freshBurn } from './roasts.js'
import { getBlockchains, getBalance } from './api.js'

const fmtUsd = (n) =>
  n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: n < 1 ? 6 : 2,
  })

const LOADING_QUIPS = [
  'Counting your disappointment…',
  'Calling the blockchain. It picked up. Bad sign.',
  'Appraising your life choices…',
  'Asking the whales if they know you. They said no.',
  'Loading emotional damage…',
  'Sharpening the insults…',
  'Cross-referencing your wallet with rock bottom…',
  'Warming up the roast oven…',
  'Consulting the candles. They lit themselves.',
  'Translating your balance into pity…',
  'Measuring the silence after the question "how much?"…',
  'Politely informing the IRS… kidding. Maybe.',
  'Fetching receipts. So many receipts.',
  'Calculating exactly how to hurt your feelings…',
  'Booting up brutal honesty v2.0…',
]

export default function App() {
  const [address, setAddress] = useState('')
  const [network, setNetwork] = useState('ethereum')
  const [chains, setChains] = useState([])
  const [loading, setLoading] = useState(false)
  const [quip, setQuip] = useState(LOADING_QUIPS[0])
  const [error, setError] = useState('')
  const [result, setResult] = useState(null) // { total, coins }
  const [seed, setSeed] = useState(0)

  // Populate the network dropdown from CoinStats.
  useEffect(() => {
    getBlockchains()
      .then((data) => Array.isArray(data) && setChains(data))
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!loading) return
    const id = setInterval(() => {
      setQuip(LOADING_QUIPS[Math.floor(Math.random() * LOADING_QUIPS.length)])
    }, 900)
    return () => clearInterval(id)
  }, [loading])

  async function roastMe(e) {
    e?.preventDefault()
    const addr = address.trim()
    if (!addr) {
      setError('I need an address to judge you. Cough one up.')
      return
    }
    setError('')
    setResult(null)
    setLoading(true)
    try {
      let data
      try {
        data = await getBalance(addr, network)
      } catch (apiErr) {
        if (apiErr.status === 404 || apiErr.status === 400) {
          throw new Error(
            "Couldn't find that wallet on this network. Either it's empty, fake, or as imaginary as your gains."
          )
        }
        throw new Error(`The API choked (${apiErr.status || '?'}). ${apiErr.message}`)
      }
      const raw = Array.isArray(data) ? data : data?.coins || []
      const coins = raw
        .map((c) => {
          const usd = (Number(c.amount) || 0) * (Number(c.price) || 0)
          return {
            symbol: c.symbol || c.name || '???',
            name: c.name || c.symbol || 'Unknown',
            amount: Number(c.amount) || 0,
            price: Number(c.price) || 0,
            pCh24h: Number(c.pCh24h) || 0,
            imgUrl: c.imgUrl,
            usd,
          }
        })
        .filter((c) => c.amount > 0)
      const total = coins.reduce((s, c) => s + c.usd, 0)
      coins.forEach((c) => (c.share = total > 0 ? c.usd / total : 0))
      coins.sort((a, b) => b.usd - a.usd)
      setResult({ total, coins })
      setSeed((s) => s + 1)
    } catch (err) {
      setError(err.message || 'Something broke. Probably your finances.')
    } finally {
      setLoading(false)
    }
  }

  const verdict = useMemo(() => {
    if (!result) return null
    const tier = pickTier(result.total)
    const ctx = makeCtx(result.total, result.coins)
    return {
      tier,
      line: pickLine(tier, seed),
      burn: freshBurn(ctx, seed),
      advice: pickAdvice(tier, seed),
      jabs: bagJabs(result.coins, seed),
    }
  }, [result, seed])

  return (
    <div className="page">
      <header className="hero">
        <div className="badge">💀 100% certified financial cruelty</div>
        <h1>
          Crypto <span className="strike">Adviser</span> <span className="grad">Bad Adviser</span>
        </h1>
        <p className="tagline">
          Paste your wallet. We fetch your real balance. Then we say the things your
          financial adviser was too professional to say.
        </p>
      </header>

      <form className="card form" onSubmit={roastMe}>
        <label className="lbl">Your wallet address (be brave)</label>
        <div className="row">
          <input
            className="input"
            placeholder="0x… paste your shame here"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            spellCheck={false}
            autoComplete="off"
          />
          <select
            className="select"
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
            title="Pick the chain of your suffering"
          >
            {chains.length === 0 && <option value="ethereum">Ethereum</option>}
            {chains.map((c) => (
              <option key={c.connectionId} value={c.connectionId}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <button className="btn" type="submit" disabled={loading}>
          {loading ? quip : 'Roast my wallet 🔥'}
        </button>
        {error && <div className="error">😈 {error}</div>}
      </form>

      {verdict && result && (
        <Result result={result} verdict={verdict} onAgain={() => setSeed((s) => s + 1)} />
      )}

      <footer className="footer">
        <p>
          No data is stored. We forget you the instant you close this tab — just like
          everyone else in your life. Built with the CoinStats API.
        </p>
        <p className="fineprint">
          This is satire. Not financial advice. If you actually took financial advice
          from a website called "Bad Adviser," that's the funniest part.
        </p>
      </footer>
    </div>
  )
}

function Result({ result, verdict, onAgain }) {
  const { tier } = verdict
  const { total, coins } = result
  return (
    <section className="card result" style={{ '--tier': tier.color }}>
      <div className="result-head">
        <div className="emoji">{tier.emoji}</div>
        <div>
          <div className="tier-title">{tier.title}</div>
          <div className="net">{fmtUsd(total)}</div>
          <div className="verdict">{tier.verdict}</div>
        </div>
      </div>

      <blockquote className="roast">“{verdict.line}”</blockquote>

      <p className="burn">{verdict.burn}</p>

      {verdict.jabs.length > 0 && (
        <ul className="jabs">
          {verdict.jabs.map((j, i) => (
            <li key={i}>{j}</li>
          ))}
        </ul>
      )}

      <div className="advice">
        <span className="advice-tag">📢 Today's terrible advice</span>
        {verdict.advice}
      </div>

      <div className="actions">
        <button className="btn ghost" onClick={onAgain}>
          Hit me again 🥊
        </button>
      </div>

      {coins.length > 0 && (
        <details className="holdings">
          <summary>The evidence ({coins.length} {coins.length === 1 ? 'coin' : 'coins'})</summary>
          <div className="coins">
            {coins.slice(0, 30).map((c, i) => (
              <div className="coin" key={i}>
                {c.imgUrl ? (
                  <img src={c.imgUrl} alt="" className="coin-img" loading="lazy" />
                ) : (
                  <div className="coin-img placeholder" />
                )}
                <div className="coin-name">
                  <strong>{c.symbol}</strong>
                  <span>{c.amount.toLocaleString('en-US', { maximumFractionDigits: 4 })}</span>
                </div>
                <div className="coin-val">
                  <strong>{fmtUsd(c.usd)}</strong>
                  <span className={c.pCh24h < 0 ? 'down' : 'up'}>
                    {c.pCh24h > 0 ? '▲' : '▼'} {Math.abs(c.pCh24h).toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </details>
      )}
    </section>
  )
}
