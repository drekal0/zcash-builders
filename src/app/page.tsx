// Public landing page — / 
// This will be built out with the full homepage content
// For now: a working placeholder that confirms the scaffold runs

export default function HomePage() {
  return (
    <main style={{ fontFamily: 'var(--sans)', color: 'var(--ink)', padding: '60px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px' }}>
        <svg width="36" height="36" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
          <path d="m270,540c0-148.9,121.1-270,270-270s270,121.1,270,270-121.1,270-270,270-270-121.1-270-270Zm366.31-125.3v41.09l-114.28,155h114.28v54.5h-73.67v45.16h-45.28v-45.16h-73.67v-41.09l114.16-155h-114.16v-54.5h73.67v-45.28h45.28v45.28h73.67Z" fill="#f4b728" fillRule="evenodd"/>
        </svg>
        <span style={{ fontFamily: 'var(--serif)', fontSize: '24px' }}>
          Zcash <em>Builders</em>
        </span>
      </div>

      <h1 style={{ fontFamily: 'var(--serif)', fontSize: '52px', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '20px' }}>
        Learn privacy<br/>
        <em style={{ color: '#f4b728' }}>engineering.</em>
      </h1>

      <p style={{ color: 'var(--ink-3)', fontSize: '16px', lineHeight: 1.7, maxWidth: '480px', marginBottom: '32px' }}>
        An 8-week developer program for Zcash. Build real applications,
        run your own node, merge a PR into the codebase.
      </p>

      <div style={{ display: 'flex', gap: '10px' }}>
        <a href="/apply" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 22px', background: '#f4b728', color: '#000', fontWeight: 600, fontSize: '14px', borderRadius: '8px', textDecoration: 'none' }}>
          Apply to Cohort 01
        </a>
        <a href="/learn" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 22px', background: 'transparent', color: 'var(--ink-2)', border: '1px solid var(--line-2)', fontSize: '14px', borderRadius: '8px', textDecoration: 'none' }}>
          View curriculum
        </a>
      </div>

      <div style={{ marginTop: '80px', fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--ink-5)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        Scaffold ready · Next.js 14 · Supabase · Vercel
      </div>
    </main>
  )
}
