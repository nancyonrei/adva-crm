import { NextRequest, NextResponse } from 'next/server'
import { serverSupabase } from '@/lib/supabase-server'
import { checkApiKey } from '@/lib/api-auth'

export async function GET(req: NextRequest) {
  const deny = checkApiKey(req)
  if (deny) return deny
  const { data, error } = await serverSupabase().from('partners').select('*').order('name')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const deny = checkApiKey(req)
  if (deny) return deny
  const body = await req.json()
  if (!body.name?.trim()) return NextResponse.json({ error: 'name is required' }, { status: 422 })
  const { data, error } = await serverSupabase().from('partners').insert(body).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
