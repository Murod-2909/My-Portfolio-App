"use client"
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Hero3DModel() {
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
    camera.position.z = 5

    scene.add(new THREE.AmbientLight(0xffffff, 0.4))
    const light = new THREE.PointLight(0x00ff99, 2)
    light.position.set(3, 3, 3)
    scene.add(light)

    // Blob
    const blobGeo = new THREE.IcosahedronGeometry(1, 2)
    const blobMat = new THREE.MeshBasicMaterial({ color: 0x00ff99, wireframe: true, transparent: true, opacity: 0.2 })
    const blob = new THREE.Mesh(blobGeo, blobMat)
    blob.scale.setScalar(2.0)
    scene.add(blob)

    // Rings
    const rings = [
      { radius: 3, speed: 0.3, tilt: 0.5 },
      { radius: 3.5, speed: -0.2, tilt: 1.2 },
      { radius: 2.5, speed: 0.5, tilt: -0.3 },
    ].map(({ radius, speed, tilt }) => {
      const geo = new THREE.TorusGeometry(radius, 0.015, 8, 80)
      const mat = new THREE.MeshBasicMaterial({ color: 0x00ff99, transparent: true, opacity: 0.3 })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.rotation.x = tilt
      mesh.userData = { speed }
      scene.add(mesh)
      return mesh
    })

    let animId
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      blob.rotation.x = t * 0.15
      blob.rotation.y = t * 0.2
      blob.position.y = Math.sin(t * 0.8) * 0.2
      rings.forEach(ring => { ring.rotation.z = t * ring.userData.speed })
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

  return <div ref={mountRef} className="w-full h-[400px] xl:h-[500px]" />
}
