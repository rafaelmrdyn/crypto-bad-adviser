// The Bad Adviser's brain. It roasts YOU about YOUR OWN bags. You opted in.
//
// Variety strategy: each tier has a big pool of hand-written lines AND a set of
// "terrible advice" options. On top of that, freshBurn() is a combinatorial
// generator that stitches together opener + burn + kicker fragments (with your
// real coins/total spliced in), producing a practically unlimited number of
// unique insults. "Hit me again" rerolls all of it.

export const TIERS = [
  {
    max: 0, // empty / not found
    title: 'The Void Stares Back',
    emoji: '🪦',
    verdict: 'Diagnosis: financially deceased.',
    color: '#6b7280',
    lines: [
      "Zero dollars. Zero coins. Zero reasons for your wallet to keep waking up every morning.",
      "I've audited graves with more liquidity than this.",
      "Your portfolio and your dating life have the same balance: nothing.",
      "This isn't a wallet, it's a moment of silence.",
      "Even the scammers looked at this address and felt bad.",
      "You didn't get rugged. There was nothing here to pull.",
      "Schrödinger's wallet: it's both empty and also empty.",
      "NASA called. They said this is the emptiest space they've ever measured.",
      "Your net worth has the structural integrity of a ghost.",
      "I ran the numbers three times. The number is 'no'.",
      "This wallet is so empty it echoes.",
      "Congratulations, you've achieved the financial equivalent of a blank page.",
      "The blockchain logged your balance and immediately took the rest of the day off.",
      "You're not broke. 'Broke' implies you once had something.",
      "Archaeologists will find this wallet and assume it was a tomb.",
    ],
    advice: [
      "Have you considered a job? People do those.",
      "Step one of getting rich: have money. We'll workshop step two later.",
      "Try shaking the blockchain upside down, maybe some loose change falls out.",
      "Bold strategy: stay at zero. Can't lose money you don't have. You're basically a genius.",
      "Sell your kidney. No, the good one. Go big.",
    ],
  },
  {
    max: 1,
    title: 'Sub-Dollar Menace',
    emoji: '🪙',
    verdict: 'Net worth: rounding error.',
    color: '#a16207',
    lines: [
      "Under a dollar. You could find more crypto by checking your couch for actual coins.",
      "The gas fee to move this costs more than this. You're financially trapped, like a tiny sad raccoon.",
      "Wall Street trembles. Just kidding, they can't see numbers this small.",
      "Your wallet qualifies for charity. From other wallets.",
      "Technically you're 'in crypto', the way a fly is 'in soup'.",
      "A single vending machine has rejected richer men than you.",
      "Your balance rounds to zero on any chart with self-respect.",
      "This is less money than the average toddler finds in a sofa.",
      "You're one transaction fee away from owing the blockchain an apology.",
      "Pigeons in the park have a better risk-adjusted return.",
      "I'd say 'pocket change' but your pockets are filing for bankruptcy.",
      "You hold dust. Cosmically, beautifully, irrelevant dust.",
    ],
    advice: [
      "Ape your entire $0.74 into a coin named after a frog. What's the worst that happens — you go to $0.73?",
      "Take out a loan against this. Banks LOVE confidence.",
      "Buy the top. At these amounts, gravity can't even find you.",
      "Set a price alert for when you become a millionaire. It'll be a fun, quiet phone.",
      "Diversify your dollar. Put fifty cents into hope and fifty into denial.",
    ],
  },
  {
    max: 10,
    title: 'Lunch Money Larry',
    emoji: '🍟',
    verdict: 'You could almost afford a combo meal.',
    color: '#ca8a04',
    lines: [
      "Single digits. A whole financial portfolio you can convert into a medium fries.",
      "Diamond hands? Buddy, these are gas-station-gift-card hands.",
      "You're not 'early', you're just broke with extra steps.",
      "Whales move markets. You move… emotionally, mostly.",
      "This is the kind of money you'd be embarrassed to drop on the sidewalk.",
      "Your portfolio and a Happy Meal have the same value and one of them comes with a toy.",
      "You check the price every hour for a sum that wouldn't tip a barista.",
      "Generational wealth, if your descendants are very small and very forgiving.",
      "You've got 'rent's-due-and-I-panicked' levels of conviction.",
      "This much money has fallen out of holes in pockets and was never missed.",
      "You're playing the long game with the budget of a short nap.",
      "A coin flip has more upside than your strategy, and better odds.",
    ],
    advice: [
      "This is clearly not enough, so obviously borrow money to buy more. Generational wealth starts with terrible decisions.",
      "Quit your job to day-trade this. The freedom alone is worth the eviction.",
      "Put it all on a coin you saw in a meme four seconds ago. Vibes are an asset class.",
      "Skip lunch and reinvest. Hunger sharpens the mind and shrinks the portfolio.",
      "Tell everyone you 'work in finance.' Technically your finances are working you.",
    ],
  },
  {
    max: 100,
    title: 'Two-Digit Tony',
    emoji: '📉',
    verdict: 'A respectable amount… for 2013.',
    color: '#d97706',
    lines: [
      "Double digits. The financial equivalent of a participation trophy.",
      "You're rich! In a country that doesn't exist anymore.",
      "Lambo? You can afford the keychain. Maybe.",
      "This is 'check the price 40 times a day' money for a portfolio that does nothing.",
      "Statistically, your bags are mostly hopes, dreams, and one coin that went to zero.",
      "You've got enough to feel something and not enough to fix anything.",
      "This is the gift-card-from-an-aunt tier of wealth.",
      "You could go all-in and the market wouldn't even notice you flinch.",
      "Your portfolio is the financial version of a houseplant you forget to water.",
      "A single nice dinner could end your entire investing career.",
      "You're one bad candle from being the previous tier's mascot.",
      "Big enough to screenshot, too small to show anyone.",
    ],
    advice: [
      "A wise man once said 'all in.' He's broke now, but he said it with confidence.",
      "Triple down on the coin that already ruined you. Loyalty is everything.",
      "Discover leverage. It's like your portfolio, but with a self-destruct button.",
      "Name your wallet after a god. Confidence is 90% of a bull run.",
      "Reinvest your dividends. You have no dividends. Reinvest harder.",
    ],
  },
  {
    max: 1000,
    title: 'Mid-Curve Maximalist',
    emoji: '🥴',
    verdict: 'Enough to lose, not enough to brag.',
    color: '#ea580c',
    lines: [
      "Three digits. The perfect amount to feel rich on Monday and poor by Wednesday.",
      "You're not poor, you're not rich, you're just… aggressively fine. The worst tier.",
      "This is 'I'll get out at the top' money that always exits at the bottom.",
      "You've read one article and now you call it a 'thesis'.",
      "Big enough to cry about. Small enough that nobody will care.",
      "You have a watchlist longer than your bank statement.",
      "This is the exact net worth that produces the most overconfident tweets.",
      "You're the median of disappointment, mathematically average pain.",
      "Just enough to convince yourself you 'get it'. You don't.",
      "You've got 'explains crypto at parties' money and 'gets ignored at parties' results.",
      "A respectable rainy-day fund, if the rainy day is a light drizzle.",
      "You're one 'sure thing' away from being a cautionary group-chat story.",
    ],
    advice: [
      "Leverage 100x. If you're going to be average, at least be liquidated with style.",
      "Move it all to a chain you can't spell for a yield you can't verify. Adventure!",
      "Start a podcast about your 'strategy'. The 12 listeners deserve to suffer with you.",
      "Mirror a stranger's trades. Their judgment can't be worse than yours, statistically… probably.",
      "Quit while you're behind, then double it. Symmetry is beautiful.",
    ],
  },
  {
    max: 10000,
    title: 'Local Cope Champion',
    emoji: '🧢',
    verdict: 'Four digits and a personality built on screenshots.',
    color: '#dc2626',
    lines: [
      "Four figures. You finally have enough to make a genuinely catastrophic mistake.",
      "You tell people you're 'in tech'. You're in a Telegram group called 'GemHunters Pro'.",
      "This is the exact amount where people quit their jobs. Don't. Please. I'm begging.",
      "You've already mentally spent this on a car you'll never buy.",
      "Respectable! Said no whale, ever.",
      "You've got a spreadsheet, a strategy, and the self-control of a toddler in a candy store.",
      "Enough to be dangerous, not enough to be right.",
      "You call dips 'discounts' and your therapist calls them 'a pattern'.",
      "This is 'I'll buy my parents a house' money divided by a house.",
      "Your gains are real and your humility is not.",
      "You're the smartest person in a group chat that should not exist.",
      "Big enough to attract scammers. Small enough that they're disappointed.",
    ],
    advice: [
      "That random Discord admin DMing you about a 'private presale' is definitely your friend.",
      "Mortgage your vibes and buy the dip on the dip of the dip.",
      "Go full degen. The funeral for your savings will at least have a great story.",
      "Tell your boss to keep the raise — you've got candles to stare at.",
      "Get a wrist tattoo of the ticker. Nothing says 'diamond hands' like permanent regret.",
    ],
  },
  {
    max: 100000,
    title: 'Suspiciously Comfortable',
    emoji: '🕴️',
    verdict: 'Five digits. Look at Mr./Ms. Money over here.',
    color: '#16a34a',
    lines: [
      "Five figures. Big enough that a 30% dip will physically age you.",
      "You're rich enough to be smug and poor enough to still check the price in the bathroom.",
      "One bad tweet from a billionaire and this is a three-digit story again.",
      "You've started saying 'it's not about the money' which is exactly what people with this much money say.",
      "Congrats, you've graduated from 'broke' to 'one rug pull from broke'.",
      "You have a 'cold wallet' and a warm, constant low-grade anxiety.",
      "Enough to retire — for about nine days, in a cheap country, eating beans.",
      "You're the friend everyone suddenly remembers exists.",
      "This is 'I have a guy' money. Your guy is a YouTube video.",
      "You're playing chess. The market is playing a slot machine. Guess who wins.",
      "Comfortable enough to gamble it, foolish enough to actually do it.",
      "You've reached the tier where you start lying about your entry price.",
    ],
    advice: [
      "This is plenty. Time to discover an exciting new coin with a dog as its CEO.",
      "Lock it in a 4-year stake on a protocol you found yesterday. What could go wrong in 4 years?",
      "Buy a status watch you'll have to sell in the next bear market. Live in the now.",
      "Become an 'angel investor' for your cousin's NFT idea. Wings optional, losses guaranteed.",
      "Leverage the whole thing 'just this once'. Famous last portfolio.",
    ],
  },
  {
    max: Infinity,
    title: 'Whale (Allegedly)',
    emoji: '🐋',
    verdict: 'Six figures or more. Disgusting. Teach me. No, roast first.',
    color: '#0ea5e9',
    lines: [
      "Six figures plus. So you're the reason the rest of us can't afford a candle.",
      "Rich, and yet you came to a website that insults you for free. The money clearly didn't buy taste.",
      "You don't have a portfolio, you have a hostage situation with the market.",
      "All this money and you STILL needed validation from a roast generator. Therapy is cheaper.",
      "Sir, this is a clown website, and you're the wealthiest clown in it.",
      "You've got 'never check the price' money and you checked it anyway, didn't you.",
      "Generational wealth, ruined in one generation — you. We're watching it live.",
      "You could buy happiness wholesale and you chose to buy a roast retail.",
      "Whales beach themselves sometimes. Stay near deep water, champ.",
      "Enough money to fix your problems, not enough wisdom to stop making them.",
      "You're a market mover and a personal-life stander-still.",
      "The IRS has a folder. The folder has feelings.",
    ],
    advice: [
      "You've clearly peaked, so sell everything and put it all into a memecoin you saw once. Live a little. Die a lot.",
      "Buy an island. Name it after your biggest loss. Visit it to remember humility.",
      "Go 50x long the top. Whales need hobbies and bankruptcy is very exciting.",
      "Fund a startup whose entire pitch is one emoji. Disrupt something. Anything.",
      "Tell the world it's 'generational wealth' right before the generation finds out.",
    ],
  },
]

// ---------- Combinatorial generator (the "unlimited" part) ----------

const OPENERS = [
  "Let me put it gently:",
  "Hot take, cold wallet:",
  "Reading this chart so you don't have to —",
  "Off the record?",
  "I consulted the blockchain and it sighed.",
  "Professional assessment incoming:",
  "Brace yourself:",
  "The candles whispered to me.",
  "No sugarcoating it:",
  "Breaking financial news:",
  "I've seen a lot of wallets. Then I saw this one.",
  "After deep analysis (one glance):",
]

const BURNS = [
  "{total} of generational wealth, assuming the generation is hamsters.",
  "your top bag {top} is carrying you like a tired parent at the airport.",
  "{count} coins and not a single good decision among them.",
  "{total}? My condolences to whoever gave you a credit card.",
  "{top} is your biggest holding, which explains the screaming you hear at night.",
  "you spread {total} across {count} coins like jam too thin to taste.",
  "if regret were a token, {top} would be your highest-conviction play.",
  "the market sees {total} and offers you a participation sticker.",
  "{top} alone is a cry for help with a ticker symbol.",
  "you've turned {total} into a full-time anxiety subscription.",
  "{count} positions, zero exits, infinite cope.",
  "your portfolio has the diversification of a single sad onion.",
  "{total} and you STILL refreshed this page hoping for a different number.",
  "holding {top} this long isn't conviction, it's a hostage video.",
  "{total} — enough to ruin a weekend, not enough to ruin a billionaire's day.",
]

const KICKERS = [
  "But hey, you're early. (You're not.)",
  "Stay strong. Or don't. Math doesn't care.",
  "This is the part where a normal adviser lies to you. I won't.",
  "Touch grass. The grass is free.",
  "Anyway, good luck out there, soldier of poor choices.",
  "Refresh for more pain. I have plenty.",
  "Screenshot this. Frame it. Cry.",
  "It's not gambling if you call it 'research'. (It's gambling.)",
  "Your future self says hi, and also why.",
  "Diamond hands, paper plan.",
  "The chart isn't sleeping. Neither should your shame.",
  "WAGMI. Statistically, some of us. Not you.",
]

function fill(template, ctx) {
  return template
    .replaceAll('{total}', ctx.totalStr)
    .replaceAll('{top}', ctx.topSymbol)
    .replaceAll('{count}', String(ctx.count))
}

function pick(arr, seed) {
  return arr[Math.abs(seed) % arr.length]
}

// Generate a fresh, stitched-together burn. Different seeds → different combos.
// With these pools that's 12 × 15 × 12 ≈ 2,160 base combinations, before the
// per-tier lines and bag jabs multiply it further.
export function freshBurn(ctx, seed = randSeed()) {
  const opener = pick(OPENERS, seed)
  const burn = fill(pick(BURNS, seed * 7 + 3), ctx)
  const kicker = pick(KICKERS, seed * 13 + 5)
  return `${opener} ${burn} ${kicker}`
}

// ---------- Helpers ----------

export function randSeed() {
  return Math.floor(Math.random() * 1e9)
}

export function pickTier(totalUsd) {
  return TIERS.find((t) => totalUsd <= t.max) || TIERS[TIERS.length - 1]
}

export function pickLine(tier, seed = randSeed()) {
  return tier.lines[Math.abs(seed) % tier.lines.length]
}

export function pickAdvice(tier, seed = randSeed()) {
  return tier.advice[Math.abs(seed * 3 + 1) % tier.advice.length]
}

// Build the interpolation context from the parsed wallet.
export function makeCtx(total, coins) {
  const totalStr = total.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: total < 1 ? 4 : 2,
  })
  const top = coins.length ? [...coins].sort((a, b) => b.usd - a.usd)[0] : null
  return {
    totalStr,
    topSymbol: top?.symbol || 'literally nothing',
    count: coins.length,
  }
}

// Extra targeted jabs based on what's actually in the wallet. Each category has
// several phrasings so repeated rolls stay fresh.
const JAB_VARIANTS = {
  concentrated: [
    (p, s) => `${p}% of your net worth is in ${s}. Diversification is for cowards, apparently.`,
    (p, s) => `${p}% in ${s} alone. That's not a portfolio, that's a personality.`,
    (p, s) => `${p}% riding on ${s}. One tweet and you're a free-tier user of life.`,
  ],
  crown: [
    (s) => `Your crown jewel is ${s}. I've seen the chart. I'm so sorry.`,
    (s) => `${s} is your flagship. The ship has a hole in it.`,
    (s) => `${s} leads your portfolio the way a fire leads a house tour.`,
  ],
  dust: [
    (n) => `You're holding ${n} coins worth less than a dollar each. That's not a portfolio, that's a drawer of dead batteries.`,
    (n) => `${n} sub-dollar bags. You don't invest, you collect tiny disappointments.`,
    (n) => `${n} coins under a buck. A homeopathic portfolio: so diluted it might cure something.`,
  ],
  rugged: [
    (n) => `${n} of your coins are basically at zero. Museums call this a 'collection'. We call it 'evidence'.`,
    (n) => `${n} coins flatlined. Hold a moment of silence, it's free, unlike your gas fees.`,
    (n) => `${n} of your tokens went to zero and took your optimism with them.`,
  ],
  dumping: [
    (n) => `${n} of your bags are bleeding double digits today. Red is your color. It always has been.`,
    (n) => `${n} positions are dumping right now. The chart looks like a heart monitor flatlining.`,
    (n) => `${n} coins down hard today. Somewhere a candle is laughing at you.`,
  ],
  single: [
    () => `One coin. ONE. The conviction of a genius or the budget of a peasant. We both know which.`,
    () => `A single holding. Bold. Reckless. Probably soon to be a tax write-off.`,
    () => `One coin, all your eggs, a basket made of vibes.`,
  ],
}

export function bagJabs(coins, seed = randSeed()) {
  const jabs = []
  if (!coins.length) return jabs
  const sorted = [...coins].sort((a, b) => b.usd - a.usd)
  const total = coins.reduce((s, c) => s + c.usd, 0)
  const top = sorted[0]
  const dust = coins.filter((c) => c.usd < 1)
  const rugged = coins.filter((c) => c.price === 0 || c.pCh24h <= -95)
  const dumping = coins.filter((c) => c.pCh24h <= -10)
  const v = (cat, s) => pick(JAB_VARIANTS[cat], seed * (s + 1))

  if (top && top.usd > 0) {
    const share = total > 0 ? top.usd / total : 0
    if (share > 0.8) jabs.push(v('concentrated', 1)(Math.round(share * 100), top.symbol))
    else jabs.push(v('crown', 2)(top.symbol))
  }
  if (dust.length >= 3) jabs.push(v('dust', 3)(dust.length))
  if (rugged.length) jabs.push(v('rugged', 4)(rugged.length))
  else if (dumping.length >= 2) jabs.push(v('dumping', 5)(dumping.length))
  if (coins.length === 1) jabs.push(v('single', 6)())
  return jabs
}
