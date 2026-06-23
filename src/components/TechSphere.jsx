"use client"
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const techs = [
  'React', 'Next.js', 'TypeScript', 'JavaScript',
  'Tailwind', 'Redux', 'Node.js', 'GraphQL',
  'CSS3', 'HTML5', 'Git', 'Docker'
]

function makeTextTexture(text) {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = 'rgba(28,28,34,0.85)'
  ctx.roundRect(4, 4, 248, 56, 10)
  ctx.fill()
  ctx.strokeStyle = '#00ff99'
  ctx.lineWidth = 2
  ctx.roundRect(4, 4, 248, 56, 10)
  ctx.stroke()
  ctx.fillStyle = '#00ff99'
  ctx.font = 'bold 28px monospace'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, 128, 32)
  return new THREE.CanvasTexture(canvas)
}

export default function TechSphere() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    const w = mount.clientWidth
    const h = mount.clientHeight

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(window.devicePixelRatio)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100)
    camera.position.z = 6

    scene.add(new THREE.AmbientLight(0xffffff, 0.6))
    const light = new THREE.PointLight(0x00ff99, 1.5)
    light.position.set(5, 5, 5)
    scene.add(light)

    // Wireframe sphere center
    const sphereGeo = new THREE.SphereGeometry(1.8, 16, 16)
    const sphereMat = new THREE.MeshBasicMaterial({ color: 0x00ff99, wireframe: true, transparent: true, opacity: 0.08 })
    const sphere = new THREE.Mesh(sphereGeo, sphereMat)
    scene.add(sphere)

    // Tech tags as sprites
    const group = new THREE.Group()
    scene.add(group)

    techs.forEach((tech, i) => {
      const phi = Math.acos(-1 + (2 * i) / techs.length)
      const theta = Math.sqrt(techs.length * Math.PI) * phi
      const r = 2.4
      const x = r * Math.cos(theta) * Math.sin(phi)
      const y = r * Math.sin(theta) * Math.sin(phi)
      const z = r * Math.cos(phi)

      const texture = makeTextTexture(tech)
      const mat = new THREE.SpriteMaterial({ map: texture, transparent: true })
      const sprite = new THREE.Sprite(mat)
      sprite.position.set(x, y, z)
      sprite.scale.set(1.4, 0.35, 1)
      group.add(sprite)
    })

    // Mouse drag rotation
    let isDragging = false
    let prevMouse = { x: 0, y: 0 }
    const onMouseDown = (e) => { isDragging = true; prevMouse = { x: e.clientX, y: e.clientY } }
    const onMouseUp = () => { isDragging = false }
    const onMouseMove = (e) => {
      if (!isDragging) return
      const dx = e.clientX - prevMouse.x
      const dy = e.clientY - prevMouse.y
      group.rotation.y += dx * 0.005
      group.rotation.x += dy * 0.005
      prevMouse = { x: e.clientX, y: e.clientY }
    }
    mount.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('mousemove', onMouseMove)

    let animId
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      if (!isDragging) {
        group.rotation.y = t * 0.2
        group.rotation.x = Math.sin(t * 0.1) * 0.1
      }
      sphere.rotation.y = t * 0.05
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      const w2 = mount.clientWidth
      const h2 = mount.clientHeight
      camera.aspect = w2 / h2
      camera.updateProjectionMatrix()
      renderer.setSize(w2, h2)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      mount.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('mousemove', onMouseMove)
      mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} className="w-full h-[500px] cursor-grab active:cursor-grabbing" />
}
