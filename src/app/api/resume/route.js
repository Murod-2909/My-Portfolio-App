import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

const FALLBACK_EXPERIENCES = [
  { id: '1', company: 'Ministry of Innovation', position: 'Frontend Engineer (React)', duration: 'Dec 2021 – Feb 2022', sort_order: 1 },
  { id: '2', company: 'OKS Technologies', position: 'Frontend Engineer (React, Redux Toolkit)', duration: 'Feb 2022 – Jun 2022', sort_order: 2 },
  { id: '3', company: 'NAPA Automotive', position: 'Frontend Engineer', duration: '2022 – 2023', sort_order: 3 },
  { id: '4', company: 'Tashkent City Prosecutor\'s Academy', position: 'Frontend Engineer (Angular)', duration: 'Jun 2023 – Oct 2023', sort_order: 4 },
  { id: '5', company: 'Online Media Platform', position: 'Frontend Engineer (Next.js)', duration: 'Jan 2024 – Jun 2024', sort_order: 5 },
  { id: '6', company: 'E-commerce Startup (Poland)', position: 'Senior Frontend Engineer — Remote', duration: '2024 – Present', sort_order: 6 },
  { id: '7', company: 'CarPlus', position: 'Senior Frontend Engineer (React, Next.js)', duration: 'Mar 2025 – July', sort_order: 7 },
  { id: '8', company: 'Registon School', position: 'Frontend Instructor & Mentor', duration: '2025 – Present', sort_order: 8 },
]

const FALLBACK_EDUCATION = [
  { id: '1', institution: 'University of Science and Technologies', degree: 'Bachelor\'s Degree — Logistics (In Progress)', duration: '2023 – 2028', sort_order: 1 },
  { id: '2', institution: 'PDP Academy', degree: 'Frontend Development Program', duration: '2021 (6 months)', sort_order: 2 },
  { id: '3', institution: 'Online Learning Platforms', degree: 'Advanced Frontend Development (React, Next.js)', duration: '2021 – Present', sort_order: 3 },
]

export async function GET() {
  const [expRes, eduRes] = await Promise.all([
    supabase.from('experiences').select('*').order('sort_order', { ascending: true }),
    supabase.from('education').select('*').order('sort_order', { ascending: true }),
  ])

  const experiences = (expRes.error || !expRes.data?.length) ? FALLBACK_EXPERIENCES : expRes.data
  const education = (eduRes.error || !eduRes.data?.length) ? FALLBACK_EDUCATION : eduRes.data

  return NextResponse.json({ experiences, education })
}
