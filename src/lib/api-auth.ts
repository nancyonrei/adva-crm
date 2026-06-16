import { NextRequest, NextResponse } from 'next/server'

export function checkApiKey(req: NextRequest): NextResponse | null {
  const secret = process.env.API_SECRET_KEY
  if (!secret) return null // no key configured — allow (local dev)
  const provided = req.headers.get('x-api-key')
  if (provided !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return null
}
