// Design tokens — single source of truth
// These mirror the CSS variables in globals.css
// Use in Tailwind arbitrary values: text-[var(--gold)]
// Or import these for JS-driven styling

export const colors = {
  gold:        '#f4b728',
  goldSoft:    '#ffc846',
  goldDim:     '#b8862a',
  goldGlow:    'rgba(244,183,40,0.12)',
  goldFaint:   'rgba(244,183,40,0.04)',

  bg:    '#0a0a0a',
  bg1:   '#0d0d0d',
  bg2:   '#121212',
  bg3:   '#161616',
  bg4:   '#1c1c1c',

  line:  '#1e1e1e',
  line2: '#252525',
  line3: '#333333',

  ink:  '#f5f5f5',
  ink2: '#c8c8c8',
  ink3: '#8a8a8a',
  ink4: '#5a5a5a',
  ink5: '#3a3a3a',

  success:      '#4ade80',
  successGlow:  'rgba(74,222,128,0.15)',
  red:          '#f87171',
  blue:         '#63b4ff',
  purple:       '#c084fc',
}

export const stage = {
  '00': { color: colors.ink3,   border: colors.line2,  bg: colors.bg2  },
  '01': { color: colors.gold,   border: colors.goldDim, bg: colors.bg2 },
  '02': { color: colors.blue,   border: 'rgba(99,180,255,0.25)',  bg: 'rgba(99,180,255,0.04)'  },
  '03': { color: colors.purple, border: 'rgba(192,132,252,0.25)', bg: 'rgba(192,132,252,0.04)' },
}

export const fonts = {
  serif: '"Instrument Serif", "Times New Roman", serif',
  sans:  '"Inter", -apple-system, sans-serif',
  mono:  '"JetBrains Mono", ui-monospace, monospace',
}

export const achievements = [
  { id: 'genesis-block',          emoji: '🌱', label: 'Genesis Block',           desc: 'Completed your first lesson.'                        },
  { id: 'first-transaction',      emoji: '⚡', label: 'First Transaction',        desc: 'Sent your first shielded transaction on testnet.'    },
  { id: 'privacy-advocate',       emoji: '🔐', label: 'Privacy Advocate',         desc: 'Completed Stage 01 — you understand Halo2 and UAs.' },
  { id: 'builder',                emoji: '🛠',  label: 'Builder',                  desc: 'Built a wallet dashboard with Zingolib and Zaino.'  },
  { id: 'merchant',               emoji: '💸', label: 'Merchant',                 desc: 'Built a ZEC payment gateway with ZIP-321.'           },
  { id: 'zebra-runner',           emoji: '🦓', label: 'Zebra Runner',             desc: 'Deployed a Zebra node in production.'                },
  { id: 'first-commit',           emoji: '💻', label: 'First Commit',             desc: 'Submitted your first PR to a Zcash repository.'     },
  { id: 'open-source-contributor',emoji: '⭐', label: 'Open Source Contributor',  desc: 'Your PR was merged into a Zcash repository.'        },
  { id: 'shipped',                emoji: '🚀', label: 'Shipped',                  desc: 'Deployed a real app on Zcash mainnet.'               },
  { id: 'writer',                 emoji: '✍️',  label: 'Writer',                   desc: 'Published a technical blog post.'                    },
  { id: 'zcash-builder',          emoji: '🎓', label: 'Zcash Builder',            desc: 'Completed all 8 labs and Demo Day.'                  },
  { id: 'cohort-champion',        emoji: '🌟', label: 'Cohort Champion',          desc: 'Voted most impactful project by your cohort.'        },
]
