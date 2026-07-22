import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Zcash Builders — Learn to build on Zcash',
    template: '%s | Zcash Builders',
  },
  description:
    'A practical, hands-on developer program for Zcash. Ship real apps on mainnet, contribute to open source, become a Zcash developer.',
  keywords: ['Zcash', 'developer', 'blockchain', 'privacy', 'ZEC', 'Zebra', 'Zaino', 'Zingolib'],
  openGraph: {
    title: 'Zcash Builders',
    description: 'Learn privacy engineering by building real Zcash applications.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
