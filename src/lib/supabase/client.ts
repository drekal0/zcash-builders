import { createBrowserClient } from '@supabase/ssr'

// Safe client — returns null during build/SSR when env vars aren't available
// Always check for null before using: const sb = getClient(); if (!sb) return;
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key || url === 'placeholder' || !url.startsWith('http')) {
    return null
  }

  return createBrowserClient(url, key)
}
