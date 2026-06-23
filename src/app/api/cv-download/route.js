import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
  const userAgent = req.headers.get('user-agent') || ''

  await supabase.from('cv_downloads').insert([{ ip, user_agent: userAgent }])
  return NextResponse.json({ success: true })
}

export async function GET() {
  const { count } = await supabase
    .from('cv_downloads')
    .select('*', { count: 'exact', head: true })

  return NextResponse.json({ total: count || 0 })
}
