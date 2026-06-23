"use client"
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const TABS = ['Messages', 'Projects', 'Services', 'Experience', 'Education', 'Photo']

function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={onClose}>
      <div className="bg-[#1c1c22] border border-white/10 rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-accent">{title}</h3>
          <button onClick={onClose} className="text-white/40 hover:text-white text-2xl leading-none">&times;</button>
        </div>
        {children}
      </div>
    </div>
  )
}

function Field({ label, value, onChange, type = 'text', multiline }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-white/60 text-sm">{label}</label>
      {multiline
        ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={3}
            className="bg-primary border border-white/20 rounded px-3 py-2 text-white outline-none focus:border-accent resize-none text-sm" />
        : <input type={type} value={value} onChange={e => onChange(e.target.value)}
            className="bg-primary border border-white/20 rounded px-3 py-2 text-white outline-none focus:border-accent text-sm" />
      }
    </div>
  )
}

export default function AdminPage() {
  const [auth, setAuth] = useState(false)
  const [password, setPassword] = useState('')
  const [tab, setTab] = useState('Messages')
  const [messages, setMessages] = useState([])
  const [projects, setProjects] = useState([])
  const [services, setServices] = useState([])
  const [experiences, setExperiences] = useState([])
  const [education, setEducation] = useState([])
  const [cvCount, setCvCount] = useState(0)
  const [modal, setModal] = useState(null) // { type, data }
  const [currentPhoto, setCurrentPhoto] = useState(null)
  const [photoFile, setPhotoFile] = useState(null)
  const [photoUploading, setPhotoUploading] = useState(false)

  const login = (e) => {
    e.preventDefault()
    if (password === 'murod_admin_2024') setAuth(true)
    else alert('Wrong password')
  }

  const loadAll = () => {
    fetch('/api/contact').then(r => r.json()).then(d => setMessages(Array.isArray(d) ? d : []))
    fetch('/api/projects').then(r => r.json()).then(d => setProjects(Array.isArray(d) ? d : []))
    fetch('/api/services').then(r => r.json()).then(d => setServices(Array.isArray(d) ? d : []))
    fetch('/api/resume').then(r => r.json()).then(d => {
      setExperiences(Array.isArray(d.experiences) ? d.experiences : [])
      setEducation(Array.isArray(d.education) ? d.education : [])
    })
    fetch('/api/cv-download').then(r => r.json()).then(d => setCvCount(d.total || 0))
    fetch('/api/profile-photo').then(r => r.json()).then(d => setCurrentPhoto(d.url || null))
  }

  useEffect(() => { if (auth) loadAll() }, [auth])

  const apiCall = async (url, method, body) => {
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    return res.json()
  }

  const closeModal = () => setModal(null)

  const handleSave = async () => {
    const { type, data, isEdit } = modal
    const urls = { project: '/api/projects', service: '/api/services', experience: '/api/resume/experiences', education: '/api/resume/education' }
    const url = urls[type]
    await apiCall(url, isEdit ? 'PUT' : 'POST', data)
    loadAll()
    closeModal()
  }

  const handleDelete = async (type, id) => {
    if (!confirm('Delete?')) return
    const urls = { project: '/api/projects', service: '/api/services', experience: '/api/resume/experiences', education: '/api/resume/education' }
    await apiCall(urls[type], 'DELETE', { id })
    loadAll()
  }

  const markRead = async (id) => {
    await apiCall('/api/contact', 'PUT', { id, is_read: true })
    setMessages(m => m.map(msg => msg.id === id ? { ...msg, is_read: true } : msg))
  }

  const openAdd = (type, defaults) => setModal({ type, data: defaults, isEdit: false })
  const openEdit = (type, item) => setModal({ type, data: { ...item }, isEdit: true })
  const updateField = (key, val) => setModal(m => ({ ...m, data: { ...m.data, [key]: val } }))

  if (!auth) return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={login} className="bg-[#27272c] p-10 rounded-xl flex flex-col gap-4 w-[320px]">
        <h2 className="text-2xl font-bold text-accent">Admin Panel</h2>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}
          placeholder="Password" className="bg-primary border border-white/20 rounded px-4 py-2 text-white outline-none focus:border-accent" />
        <button type="submit" className="bg-accent text-primary font-bold py-2 rounded hover:bg-accent-hover transition">Login</button>
      </form>
    </div>
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen py-12">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold text-accent">Admin Panel</h1>
          <div className="bg-[#27272c] px-4 py-2 rounded-lg text-sm">
            CV Downloads: <span className="text-accent font-bold">{cvCount}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
          {[
            { label: 'Messages', count: messages.length, unread: messages.filter(m => !m.is_read).length },
            { label: 'Projects', count: projects.length },
            { label: 'Services', count: services.length },
            { label: 'Experience', count: experiences.length },
            { label: 'Education', count: education.length },
          ].map(s => (
            <div key={s.label} className="bg-[#27272c] rounded-xl p-4 text-center cursor-pointer hover:border-accent border border-transparent transition" onClick={() => setTab(s.label)}>
              <div className="text-2xl font-bold text-accent">{s.count}</div>
              <div className="text-white/60 text-sm mt-1">{s.label}</div>
              {s.unread > 0 && <div className="text-xs text-yellow-400">{s.unread} new</div>}
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg font-semibold transition text-sm ${tab === t ? 'bg-accent text-primary' : 'bg-[#27272c] text-white hover:bg-accent/20'}`}>
              {t}
            </button>
          ))}
        </div>

        {/* MESSAGES */}
        {tab === 'Messages' && (
          <div className="flex flex-col gap-4">
            {messages.length === 0 && <p className="text-white/40">No messages yet.</p>}
            {messages.map(msg => (
              <div key={msg.id} className={`bg-[#27272c] rounded-xl p-6 border ${msg.is_read ? 'border-white/10' : 'border-accent'}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold">{msg.firstname} {msg.lastname}</span>
                      {!msg.is_read && <span className="text-xs bg-accent text-primary px-2 py-0.5 rounded">New</span>}
                    </div>
                    <div className="text-white/50 text-sm mb-1">{msg.email}{msg.phone && ` · ${msg.phone}`}</div>
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

        {/* PROJECTS */}
        {tab === 'Projects' && (
          <div>
            <button onClick={() => openAdd('project', { num: '', category: 'Frontend', title: '', description: '', stack: '[]', image: '', live: '', github: '', sort_order: projects.length + 1 })}
              className="mb-4 bg-accent text-primary px-5 py-2 rounded-lg font-bold hover:bg-accent-hover transition text-sm">
              + Add Project
            </button>
            <div className="flex flex-col gap-3">
              {projects.map(p => (
                <div key={p.id} className="bg-[#27272c] rounded-xl p-4 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <span className="text-accent font-bold mr-2">{p.num}</span>
                    <span className="font-semibold">{p.title}</span>
                    <span className="text-white/40 text-sm ml-2">{p.category}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit('project', { ...p, stack: typeof p.stack === 'string' ? p.stack : JSON.stringify(p.stack) })}
                      className="text-sm text-accent border border-accent/30 px-3 py-1 rounded hover:bg-accent/10 transition">Edit</button>
                    <button onClick={() => handleDelete('project', p.id)}
                      className="text-sm text-red-400 border border-red-400/30 px-3 py-1 rounded hover:bg-red-400/10 transition">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SERVICES */}
        {tab === 'Services' && (
          <div>
            <button onClick={() => openAdd('service', { num: '', title: '', description: '', href: '', sort_order: services.length + 1 })}
              className="mb-4 bg-accent text-primary px-5 py-2 rounded-lg font-bold hover:bg-accent-hover transition text-sm">
              + Add Service
            </button>
            <div className="flex flex-col gap-3">
              {services.map(s => (
                <div key={s.id} className="bg-[#27272c] rounded-xl p-4 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <span className="text-accent font-bold mr-2">{s.num}</span>
                    <span className="font-semibold">{s.title}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit('service', s)} className="text-sm text-accent border border-accent/30 px-3 py-1 rounded hover:bg-accent/10 transition">Edit</button>
                    <button onClick={() => handleDelete('service', s.id)} className="text-sm text-red-400 border border-red-400/30 px-3 py-1 rounded hover:bg-red-400/10 transition">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EXPERIENCE */}
        {tab === 'Experience' && (
          <div>
            <button onClick={() => openAdd('experience', { company: '', position: '', duration: '', sort_order: experiences.length + 1 })}
              className="mb-4 bg-accent text-primary px-5 py-2 rounded-lg font-bold hover:bg-accent-hover transition text-sm">
              + Add Experience
            </button>
            <div className="flex flex-col gap-3">
              {experiences.map(e => (
                <div key={e.id} className="bg-[#27272c] rounded-xl p-4 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold">{e.position}</span>
                    <span className="text-white/40 text-sm ml-2">@ {e.company}</span>
                    <span className="text-accent text-sm ml-2">{e.duration}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit('experience', e)} className="text-sm text-accent border border-accent/30 px-3 py-1 rounded hover:bg-accent/10 transition">Edit</button>
                    <button onClick={() => handleDelete('experience', e.id)} className="text-sm text-red-400 border border-red-400/30 px-3 py-1 rounded hover:bg-red-400/10 transition">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PHOTO */}
        {tab === 'Photo' && (
          <div className="max-w-md">
            <h3 className="text-xl font-bold mb-4">Profile Photo</h3>
            <div className="bg-[#27272c] rounded-xl p-6 flex flex-col gap-6">
              <div className="flex flex-col items-center gap-3">
                <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-accent/40 bg-primary flex items-center justify-center">
                  {(photoFile ? URL.createObjectURL(photoFile) : currentPhoto) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={photoFile ? URL.createObjectURL(photoFile) : currentPhoto}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white/30 text-sm">No photo</span>
                  )}
                </div>
                {photoFile && <span className="text-accent text-sm">{photoFile.name}</span>}
              </div>
              <label className="cursor-pointer bg-primary border border-white/20 rounded-lg px-4 py-3 text-center hover:border-accent transition text-sm text-white/70 hover:text-white">
                Choose new photo (PNG, JPG, WebP)
                <input type="file" accept="image/*" className="hidden" onChange={e => setPhotoFile(e.target.files[0] || null)} />
              </label>
              <button
                disabled={!photoFile || photoUploading}
                onClick={async () => {
                  if (!photoFile) return
                  setPhotoUploading(true)
                  const fd = new FormData()
                  fd.append('file', photoFile)
                  const res = await fetch('/api/profile-photo', { method: 'POST', body: fd })
                  const d = await res.json()
                  if (d.url) { setCurrentPhoto(d.url); setPhotoFile(null); alert('Photo updated!') }
                  else alert('Upload failed: ' + (d.error || 'unknown'))
                  setPhotoUploading(false)
                }}
                className="bg-accent text-primary font-bold py-2 rounded-lg hover:bg-accent-hover transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {photoUploading ? 'Uploading...' : 'Upload Photo'}
              </button>
            </div>
          </div>
        )}

        {/* EDUCATION */}
        {tab === 'Education' && (
          <div>
            <button onClick={() => openAdd('education', { institution: '', degree: '', duration: '', sort_order: education.length + 1 })}
              className="mb-4 bg-accent text-primary px-5 py-2 rounded-lg font-bold hover:bg-accent-hover transition text-sm">
              + Add Education
            </button>
            <div className="flex flex-col gap-3">
              {education.map(e => (
                <div key={e.id} className="bg-[#27272c] rounded-xl p-4 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold">{e.degree}</span>
                    <span className="text-white/40 text-sm ml-2">@ {e.institution}</span>
                    <span className="text-accent text-sm ml-2">{e.duration}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit('education', e)} className="text-sm text-accent border border-accent/30 px-3 py-1 rounded hover:bg-accent/10 transition">Edit</button>
                    <button onClick={() => handleDelete('education', e.id)} className="text-sm text-red-400 border border-red-400/30 px-3 py-1 rounded hover:bg-red-400/10 transition">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MODAL */}
      {modal && (
        <Modal title={`${modal.isEdit ? 'Edit' : 'Add'} ${modal.type}`} onClose={closeModal}>
          <div className="flex flex-col gap-3">
            {modal.type === 'project' && <>
              <Field label="Number (e.g. 01)" value={modal.data.num || ''} onChange={v => updateField('num', v)} />
              <Field label="Category" value={modal.data.category || ''} onChange={v => updateField('category', v)} />
              <Field label="Title" value={modal.data.title || ''} onChange={v => updateField('title', v)} />
              <Field label="Description" value={modal.data.description || ''} onChange={v => updateField('description', v)} multiline />
              <Field label='Stack (JSON e.g. [{"name":"React"}])' value={typeof modal.data.stack === 'string' ? modal.data.stack : JSON.stringify(modal.data.stack)} onChange={v => updateField('stack', v)} />
              <Field label="Image path (e.g. /assets/work/img.png)" value={modal.data.image || ''} onChange={v => updateField('image', v)} />
              <Field label="Live URL" value={modal.data.live || ''} onChange={v => updateField('live', v)} />
              <Field label="GitHub URL" value={modal.data.github || ''} onChange={v => updateField('github', v)} />
              <Field label="Sort order" value={modal.data.sort_order || ''} onChange={v => updateField('sort_order', Number(v))} type="number" />
            </>}
            {modal.type === 'service' && <>
              <Field label="Number (e.g. 01)" value={modal.data.num || ''} onChange={v => updateField('num', v)} />
              <Field label="Title" value={modal.data.title || ''} onChange={v => updateField('title', v)} />
              <Field label="Description" value={modal.data.description || ''} onChange={v => updateField('description', v)} multiline />
              <Field label="Link (href)" value={modal.data.href || ''} onChange={v => updateField('href', v)} />
              <Field label="Sort order" value={modal.data.sort_order || ''} onChange={v => updateField('sort_order', Number(v))} type="number" />
            </>}
            {modal.type === 'experience' && <>
              <Field label="Company" value={modal.data.company || ''} onChange={v => updateField('company', v)} />
              <Field label="Position" value={modal.data.position || ''} onChange={v => updateField('position', v)} />
              <Field label="Duration (e.g. 2022 – 2023)" value={modal.data.duration || ''} onChange={v => updateField('duration', v)} />
              <Field label="Sort order" value={modal.data.sort_order || ''} onChange={v => updateField('sort_order', Number(v))} type="number" />
            </>}
            {modal.type === 'education' && <>
              <Field label="Institution" value={modal.data.institution || ''} onChange={v => updateField('institution', v)} />
              <Field label="Degree" value={modal.data.degree || ''} onChange={v => updateField('degree', v)} />
              <Field label="Duration (e.g. 2021 – Present)" value={modal.data.duration || ''} onChange={v => updateField('duration', v)} />
              <Field label="Sort order" value={modal.data.sort_order || ''} onChange={v => updateField('sort_order', Number(v))} type="number" />
            </>}
            <div className="flex gap-3 mt-2">
              <button onClick={handleSave} className="flex-1 bg-accent text-primary font-bold py-2 rounded hover:bg-accent-hover transition">
                {modal.isEdit ? 'Save changes' : 'Add'}
              </button>
              <button onClick={closeModal} className="flex-1 bg-white/10 text-white py-2 rounded hover:bg-white/20 transition">
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </motion.div>
  )
}
