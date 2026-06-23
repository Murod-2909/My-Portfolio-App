import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  const { data } = await supabase.storage.from('portfolio').list('profile', { limit: 1, sortBy: { column: 'created_at', order: 'desc' } })
  if (!data || data.length === 0) return NextResponse.json({ url: null })
  const { data: urlData } = supabase.storage.from('portfolio').getPublicUrl(`profile/${data[0].name}`)
  return NextResponse.json({ url: urlData.publicUrl })
}

export async function POST(req) {
  const formData = await req.formData()
  const file = formData.get('file')
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const ext = file.name.split('.').pop()
  const fileName = `photo.${ext}`

  const { error } = await supabase.storage.from('portfolio').upload(`profile/${fileName}`, buffer, {
    contentType: file.type,
    upsert: true,
  })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const { data: urlData } = supabase.storage.from('portfolio').getPublicUrl(`profile/${fileName}`)
  return NextResponse.json({ url: urlData.publicUrl })
}
