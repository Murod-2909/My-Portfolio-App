import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

const FALLBACK_SERVICES = [
  { id: '1', num: '01', title: 'Web Development', description: 'I craft fast, responsive, and production-ready web applications using React.js and Next.js with clean architecture and optimized performance.', href: '/work', sort_order: 1 },
  { id: '2', num: '02', title: 'UI/UX Implementation', description: 'I transform Figma designs into pixel-perfect interfaces with smooth animations, accessibility in mind, and cross-browser compatibility.', href: '/work', sort_order: 2 },
  { id: '3', num: '03', title: 'Frontend Architecture', description: 'I design scalable component libraries, state management solutions, and maintainable codebases for growing teams and products.', href: '/work', sort_order: 3 },
  { id: '4', num: '04', title: 'Performance Optimization', description: 'I analyze and improve Core Web Vitals, reduce bundle sizes, implement lazy loading and caching strategies for lightning-fast apps.', href: '/work', sort_order: 4 },
]

export async function GET() {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error || !data || data.length === 0) return NextResponse.json(FALLBACK_SERVICES)
  return NextResponse.json(data)
}

export async function POST(req) {
  const body = await req.json()
  const { data, error } = await supabase.from('services').insert([body]).select()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data[0])
}

export async function PUT(req) {
  const body = await req.json()
  const { id, ...rest } = body
  const { data, error } = await supabase.from('services').update(rest).eq('id', id).select()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data[0])
}

export async function DELETE(req) {
  const { id } = await req.json()
  const { error } = await supabase.from('services').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
