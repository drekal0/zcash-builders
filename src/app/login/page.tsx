'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const ZcashLogo = () => (
  <svg width="32" height="32" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
    <path d="m270,540c0-148.9,121.1-270,270-270s270,121.1,270,270-121.1,270-270,270-270-121.1-270-270Zm366.31-125.3v41.09l-114.28,155h114.28v54.5h-73.67v45.16h-45.28v-45.16h-73.67v-41.09l114.16-155h-114.16v-54.5h73.67v-45.28h45.28v45.28h73.67Z" fill="#f4b728" fillRule="evenodd"/>
  </svg>
)

function LoginForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  // supabase client initialized lazily in handlers

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [mode, setMode]         = useState<'signin' | 'magic'>('signin')
  const [magicSent, setMagicSent] = useState(false)

  const next = searchParams.get('next') || '/portal'

  // If already logged in, redirect
  useEffect(() => {
    const client = createClient()
    if (!client) return
    client.auth.getSession().then(({ data: { session } }) => {
      if (session) router.push(next)
    })
  }, [])

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const client = createClient()
    if (!client) { setError('Service not available.'); setLoading(false); return; }
    const { error } = await client.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push(next)
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const client2 = createClient()
    if (!client2) { setError('Service not available.'); setLoading(false); return; }
    const { error } = await client2.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}${next}` },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setMagicSent(true)
    setLoading(false)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'var(--bg-3)',
    border: '1px solid var(--line-2)',
    color: 'var(--ink)',
    padding: '12px 14px',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: 'var(--sans)',
    outline: 'none',
    minHeight: '44px',
    transition: 'border-color 0.15s',
  }

  return (
    <div style={{ width: 'min(420px, 100%)', display: 'flex', flexDirection: 'column', gap: '28px' }}>

      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <ZcashLogo />
        <span style={{ fontFamily: 'var(--serif)', fontSize: '18px', color: 'var(--ink)' }}>
          Zcash <em style={{ fontStyle: 'italic' }}>Builders</em>
        </span>
      </Link>

      {/* Card */}
      <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line-2)', borderRadius: '12px', padding: 'clamp(24px,4vw,32px)', display: 'flex', flexDirection: 'column', gap: '22px' }}>

        {/* Header */}
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px' }}>
            Cohort 01 · 2026
          </div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px,3vw,28px)', marginBottom: '5px' }}>
            Welcome back
          </div>
          <div style={{ fontSize: '13px', color: 'var(--ink-3)' }}>
            Sign in to access your portal and learning dashboard.
          </div>
        </div>

        {/* Mode tabs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3px', background: 'var(--bg-4)', borderRadius: '8px', padding: '3px' }}>
          {(['signin', 'magic'] as const).map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(''); setMagicSent(false) }}
              style={{
                padding: '8px',
                borderRadius: '6px',
                border: 'none',
                background: mode === m ? 'var(--bg-2)' : 'transparent',
                color: mode === m ? 'var(--ink)' : 'var(--ink-4)',
                fontFamily: 'var(--mono)',
                fontSize: '10px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.15s',
                minHeight: '36px',
              }}
            >
              {m === 'signin' ? 'Password' : 'Magic Link'}
            </button>
          ))}
        </div>

        {/* Magic link sent state */}
        {magicSent ? (
          <div style={{ textAlign: 'center', padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '32px' }}>📬</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '20px' }}>Check your email</div>
            <div style={{ fontSize: '13px', color: 'var(--ink-3)', lineHeight: 1.6 }}>
              We sent a magic link to <strong style={{ color: 'var(--ink-2)' }}>{email}</strong>. Click it to sign in — no password needed.
            </div>
            <button
              onClick={() => { setMagicSent(false); setEmail('') }}
              style={{ color: 'var(--gold)', background: 'none', border: 'none', fontSize: '13px', cursor: 'pointer', fontFamily: 'var(--sans)' }}
            >
              Use a different email
            </button>
          </div>
        ) : (
          /* Form */
          <form onSubmit={mode === 'signin' ? handleSignIn : handleMagicLink} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-4)' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                onBlur={e => e.target.style.borderColor = 'var(--line-2)'}
              />
            </div>

            {mode === 'signin' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-4)' }}>
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setMode('magic')}
                    style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--ink-4)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.06em' }}
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                  onBlur={e => e.target.style.borderColor = 'var(--line-2)'}
                />
              </div>
            )}

            {/* Error */}
            {error && (
              <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--red)', background: 'var(--red-faint)', border: '1px solid var(--red-dim)', padding: '10px 12px', borderRadius: '6px' }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '13px',
                background: loading ? 'var(--gold-dim)' : 'var(--gold)',
                color: '#000',
                fontWeight: 700,
                fontSize: '14px',
                border: 'none',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontFamily: 'var(--sans)',
              }}
            >
              {loading ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ animation: 'spin 0.7s linear infinite' }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                  </svg>
                  {mode === 'signin' ? 'Signing in…' : 'Sending link…'}
                </>
              ) : (
                mode === 'signin' ? 'Sign in' : 'Send magic link'
              )}
            </button>
          </form>
        )}

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--line)' }} />
          <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--ink-5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>or</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--line)' }} />
        </div>

        {/* Apply link */}
        <Link
          href="/apply"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '11px',
            border: '1px solid var(--line-2)',
            borderRadius: '8px',
            color: 'var(--ink-3)',
            fontSize: '13px',
            fontWeight: 500,
            minHeight: '44px',
          }}
        >
          Not enrolled yet? Apply to Cohort 01 →
        </Link>
      </div>

      {/* Footer note */}
      <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--ink-4)', lineHeight: 1.6 }}>
        Access is invitation-only. Applications open at{' '}
        <Link href="/apply" style={{ color: 'var(--gold)' }}>zcashbuilders.dev/apply</Link>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(20px,4vw,40px)',
      background: 'var(--bg)',
    }}>
      <Suspense fallback={<div style={{ color: 'var(--ink-4)', fontFamily: 'var(--mono)', fontSize: '12px' }}>Loading…</div>}>
        <LoginForm />
      </Suspense>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input:focus { border-color: var(--gold) !important; }
        a:hover { opacity: 0.8; }
      `}</style>
    </main>
  )
}
