import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { data, error } = await supabase.storage.from('portfolio').list('profile', { limit: 1, sortBy: { column: 'created_at', order: 'desc' } })
    if (error || !data || data.length === 0) return NextResponse.json({ url: null })
    const { data: urlData } = supabase.storage.from('portfolio').getPublicUrl(`profile/${data[0].name}`)
    return NextResponse.json({ url: urlData.publicUrl })
  } catch {
    return NextResponse.json({ url: null })
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData()
    const file = formData.get('file')
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

    // ensure bucket exists
    const { data: buckets } = await supabase.storage.listBuckets()
    const exists = buckets?.some(b => b.name === 'portfolio')
    if (!exists) {
      await supabase.storage.createBucket('portfolio', { public: true })
    }

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
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
