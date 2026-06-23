import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  const [expRes, eduRes] = await Promise.all([
    supabase.from('experiences').select('*').order('sort_order', { ascending: true }),
    supabase.from('education').select('*').order('sort_order', { ascending: true }),
  ])

  if (expRes.error) return NextResponse.json({ error: expRes.error.message }, { status: 500 })
  if (eduRes.error) return NextResponse.json({ error: eduRes.error.message }, { status: 500 })

  return NextResponse.json({ experiences: expRes.data, education: eduRes.data })
}
