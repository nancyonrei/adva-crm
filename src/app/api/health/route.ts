import { NextResponse } from 'next/server'
import { serverSupabase } from '@/lib/supabase-server'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const hasAnon = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const hasService = !!process.env.SUPABASE_SERVICE_ROLE_KEY
  const hasApiKey = !!process.env.API_SECRET_KEY

  try {
    const { error } = await serverSupabase().from('properties').select('id').limit(1)
    return NextResponse.json({
      supabase_url: url || 'NOT SET',
      has_anon_key: hasAnon,
      has_service_key: hasService,
      has_api_secret: hasApiKey,
      db_connection: error ? 'FAILED: ' + error.message : 'OK',
    })
  } catch (e) {
    return NextResponse.json({
      supabase_url: url || 'NOT SET',
      has_anon_key: hasAnon,
      has_service_key: hasService,
      has_api_secret: hasApiKey,
      db_connection: 'FAILED: ' + String(e),
    })
  }
}
