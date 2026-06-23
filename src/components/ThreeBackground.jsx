"use client"
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeBackground() {
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
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100)
    camera.position.z = 5

    // Star field
    const count = 3000
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20
    }
    const starsGeo = new THREE.BufferGeometry()
    starsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const starsMat = new THREE.PointsMaterial({ color: 0x00ff99, size: 0.03, transparent: true, opacity: 0.6 })
    const stars = new THREE.Points(starsGeo, starsMat)
    scene.add(stars)

    // Floating orbs
    const orbs = []
    for (let i = 0; i < 6; i++) {
      const geo = new THREE.IcosahedronGeometry(0.1 + Math.random() * 0.15, 1)
      const mat = new THREE.MeshBasicMaterial({ color: 0x00ff99, wireframe: true, transparent: true, opacity: 0.3 })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4
      )
      mesh.userData = { speed: 0.3 + Math.random() * 0.5, offset: Math.random() * Math.PI * 2, baseY: mesh.position.y, baseX: mesh.position.x }
      scene.add(mesh)
      orbs.push(mesh)
    }

    let animId
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      stars.rotation.x = t * 0.03
      stars.rotation.y = t * 0.05
      orbs.forEach(orb => {
        const { speed, offset, baseY, baseX } = orb.userData
        orb.position.y = baseY + Math.sin(t * speed + offset) * 0.4
        orb.position.x = baseX + Math.cos(t * speed * 0.7 + offset) * 0.2
        orb.rotation.x = t * 0.5
        orb.rotation.y = t * 0.3
      })
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
      mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} className="fixed inset-0 -z-10 pointer-events-none" />
}
