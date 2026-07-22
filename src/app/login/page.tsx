export default function LoginPage() {
  return (
    <main style={{ fontFamily: 'var(--sans)', color: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
      <div style={{ width: 'min(420px, 100%)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ fontFamily: 'var(--serif)', fontSize: '28px' }}>
          Sign in to <em style={{ color: '#f4b728' }}>Zcash Builders</em>
        </div>
        <p style={{ color: 'var(--ink-4)', fontSize: '13px' }}>Auth coming next.</p>
        <a href="/" style={{ color: 'var(--ink-4)', fontSize: '13px' }}>← Back to home</a>
      </div>
    </main>
  )
}
