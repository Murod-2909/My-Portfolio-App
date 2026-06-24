import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

const FALLBACK_PROJECTS = [
  { id: '1', num: '01', category: 'Frontend', title: 'MGA Reklama', description: 'Corporate website for Turkish advertising company.', stack: [{"name":"React.js"},{"name":"Redux Toolkit"},{"name":"SCSS"}], image: '/assets/work/mgareklama.png', live: 'http://www.mgareklama.com/', github: '', sort_order: 1 },
  { id: '2', num: '02', category: 'Frontend', title: 'Vatandoshlar Fondi', description: 'Site for compatriots abroad with videos, news, webinars.', stack: [{"name":"React.js"},{"name":"Redux"},{"name":"Websocket"}], image: '/assets/work/vatandosh.jpg', live: 'https://vatandoshlarfondi.uz/', github: '', sort_order: 2 },
  { id: '3', num: '03', category: 'Frontend', title: 'Clear Path', description: 'State motor vehicle roads information platform.', stack: [{"name":"React.js"},{"name":"Leaflet"}], image: '/assets/work/shaffof.jpg', live: '', github: '', sort_order: 3 },
  { id: '4', num: '04', category: 'Frontend', title: 'Sport Platform', description: 'Sports platform with live scores and news.', stack: [{"name":"React.js"},{"name":"Redux"}], image: '/assets/work/sport.jpg', live: '', github: '', sort_order: 4 },
  { id: '5', num: '05', category: 'Frontend', title: 'Mirobod District', description: 'Official website for Mirobod district.', stack: [{"name":"React.js"},{"name":"Redux"}], image: '/assets/work/mirobod.png', live: '', github: '', sort_order: 5 },
  { id: '6', num: '06', category: 'Frontend', title: 'Texnika Platform', description: 'Technical equipment management platform.', stack: [{"name":"React.js"}], image: '/assets/work/texnika.png', live: '', github: '', sort_order: 6 },
  { id: '7', num: '07', category: 'Frontend', title: 'Easy Przeprowadzki', description: 'Moving company website for Polish market.', stack: [{"name":"Next.js"},{"name":"TypeScript"},{"name":"Tailwind"}], image: '/assets/work/easy.png', live: 'https://easyprzeprowadzki.pl', github: '', sort_order: 7 },
  { id: '8', num: '08', category: 'Frontend', title: 'CarPlus', description: 'Automotive platform with vehicle listings.', stack: [{"name":"React.js"},{"name":"Next.js"},{"name":"TypeScript"}], image: '/assets/work/carplus.png', live: '', github: '', sort_order: 8 },
]

export async function GET() {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error || !data || data.length === 0) return NextResponse.json(FALLBACK_PROJECTS)
  return NextResponse.json(data)
}

export async function POST(req) {
  const body = await req.json()
  const { data, error } = await supabase.from('projects').insert([body]).select()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data[0])
}

export async function PUT(req) {
  const body = await req.json()
  const { id, ...rest } = body
  const { data, error } = await supabase.from('projects').update(rest).eq('id', id).select()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data[0])
}

export async function DELETE(req) {
  const { id } = await req.json()
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
