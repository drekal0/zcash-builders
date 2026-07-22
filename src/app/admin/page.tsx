export default function AdminPage() {
  return (
    <main style={{ fontFamily: 'var(--sans)', color: 'var(--ink)', padding: '60px 40px' }}>
      <div style={{ fontFamily: 'var(--serif)', fontSize: '36px', marginBottom: '16px' }}>
        Admin <em style={{ color: '#f4b728' }}>Panel</em>
      </div>
      <p style={{ color: 'var(--ink-4)', fontSize: '13px' }}>Admin panel coming next. Admin role required.</p>
      <a href="/" style={{ display: 'inline-block', marginTop: '24px', color: 'var(--ink-4)', fontSize: '13px' }}>← Back</a>
    </main>
  )
}
