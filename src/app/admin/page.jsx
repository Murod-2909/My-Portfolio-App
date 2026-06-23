"use client"
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const TABS = ['Messages', 'Projects', 'Services']

export default function AdminPage() {
  const [auth, setAuth] = useState(false)
  const [password, setPassword] = useState('')
  const [tab, setTab] = useState('Messages')
  const [messages, setMessages] = useState([])
  const [projects, setProjects] = useState([])
  const [services, setServices] = useState([])
  const [cvCount, setCvCount] = useState(0)

  const login = (e) => {
    e.preventDefault()
    if (password === 'murod_admin_2024') setAuth(true)
    else alert('Wrong password')
  }

  useEffect(() => {
    if (!auth) return
    fetch('/api/contact').then(r => r.json()).then(d => setMessages(Array.isArray(d) ? d : []))
    fetch('/api/projects').then(r => r.json()).then(d => setProjects(Array.isArray(d) ? d : []))
    fetch('/api/services').then(r => r.json()).then(d => setServices(Array.isArray(d) ? d : []))
    fetch('/api/cv-download').then(r => r.json()).then(d => setCvCount(d.total || 0))
  }, [auth])

  const markRead = async (id) => {
    await fetch('/api/contact', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, is_read: true }) })
    setMessages(m => m.map(msg => msg.id === id ? { ...msg, is_read: true } : msg))
  }

  const deleteProject = async (id) => {
    if (!confirm('Delete this project?')) return
    await fetch('/api/projects', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setProjects(p => p.filter(pr => pr.id !== id))
  }

  const deleteService = async (id) => {
    if (!confirm('Delete this service?')) return
    await fetch('/api/services', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setServices(s => s.filter(sv => sv.id !== id))
  }

  if (!auth) return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={login} className="bg-[#27272c] p-10 rounded-xl flex flex-col gap-4 w-[320px]">
        <h2 className="text-2xl font-bold text-accent">Admin Panel</h2>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className="bg-primary border border-white/20 rounded px-4 py-2 text-white outline-none focus:border-accent"
        />
        <button type="submit" className="bg-accent text-primary font-bold py-2 rounded hover:bg-accent-hover transition">Login</button>
      </form>
    </div>
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen py-12">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-accent">Admin Panel</h1>
          <div className="bg-[#27272c] px-4 py-2 rounded-lg text-sm">
            CV Downloads: <span className="text-accent font-bold">{cvCount}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Messages', count: messages.length, unread: messages.filter(m => !m.is_read).length },
            { label: 'Projects', count: projects.length },
            { label: 'Services', count: services.length },
          ].map(s => (
            <div key={s.label} className="bg-[#27272c] rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-accent">{s.count}</div>
              <div className="text-white/60 mt-1">{s.label}</div>
              {s.unread > 0 && <div className="text-xs text-yellow-400 mt-1">{s.unread} unread</div>}
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${tab === t ? 'bg-accent text-primary' : 'bg-[#27272c] text-white hover:bg-accent/20'}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Messages */}
        {tab === 'Messages' && (
          <div className="flex flex-col gap-4">
            {messages.length === 0 && <p className="text-white/40">No messages yet.</p>}
            {messages.map(msg => (
              <div key={msg.id} className={`bg-[#27272c] rounded-xl p-6 border ${msg.is_read ? 'border-white/10' : 'border-accent'}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold">{msg.firstname} {msg.lastname}</span>
                      {!msg.is_read && <span className="text-xs bg-accent text-primary px-2 py-0.5 rounded">New</span>}
                    </div>
                    <div className="text-white/50 text-sm mb-1">{msg.email} {msg.phone && `· ${msg.phone}`}</div>
                    {msg.service && <div className="text-accent text-sm mb-2">{msg.service}</div>}
                    <p className="text-white/80">{msg.message}</p>
                    <div className="text-white/30 text-xs mt-2">{new Date(msg.created_at).toLocaleString()}</div>
                  </div>
                  {!msg.is_read && (
                    <button onClick={() => markRead(msg.id)} className="text-xs text-accent border border-accent px-3 py-1 rounded hover:bg-accent hover:text-primary transition whitespace-nowrap">
                      Mark read
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {tab === 'Projects' && (
          <div className="flex flex-col gap-3">
            {projects.map(p => (
              <div key={p.id} className="bg-[#27272c] rounded-xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-accent font-bold mr-3">{p.num}</span>
                  <span className="font-semibold">{p.title}</span>
                  <span className="text-white/40 text-sm ml-3">{p.category}</span>
                </div>
                <button onClick={() => deleteProject(p.id)} className="text-red-400 hover:text-red-300 text-sm border border-red-400/30 px-3 py-1 rounded hover:bg-red-400/10 transition">
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Services */}
        {tab === 'Services' && (
          <div className="flex flex-col gap-3">
            {services.map(s => (
              <div key={s.id} className="bg-[#27272c] rounded-xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-accent font-bold mr-3">{s.num}</span>
                  <span className="font-semibold">{s.title}</span>
                </div>
                <button onClick={() => deleteService(s.id)} className="text-red-400 hover:text-red-300 text-sm border border-red-400/30 px-3 py-1 rounded hover:bg-red-400/10 transition">
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
