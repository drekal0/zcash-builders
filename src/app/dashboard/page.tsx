export default function DashboardPage() {
  return (
    <main style={{ fontFamily: 'var(--sans)', color: 'var(--ink)', padding: '60px 40px' }}>
      <div style={{ fontFamily: 'var(--serif)', fontSize: '36px', marginBottom: '16px' }}>
        Learning <em style={{ color: '#f4b728' }}>Dashboard</em>
      </div>
      <p style={{ color: 'var(--ink-4)', fontSize: '13px' }}>Student dashboard coming next. Auth protected.</p>
      <a href="/" style={{ display: 'inline-block', marginTop: '24px', color: 'var(--ink-4)', fontSize: '13px' }}>← Back</a>
    </main>
  )
}
