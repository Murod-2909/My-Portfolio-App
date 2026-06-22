"use client"
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function StarField() {
  const ref = useRef()
  const count = 3000

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return arr
  }, [])

  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * 0.03
    ref.current.rotation.y = state.clock.elapsedTime * 0.05
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00ff99"
        size={0.03}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

function FloatingOrbs() {
  const orbs = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4,
      ],
      speed: 0.3 + Math.random() * 0.5,
      radius: 0.1 + Math.random() * 0.15,
    }))
  }, [])

  return (
    <>
      {orbs.map((orb) => (
        <FloatingOrb key={orb.id} {...orb} />
      ))}
    </>
  )
}

function FloatingOrb({ position, speed, radius }) {
  const ref = useRef()
  const offset = useRef(Math.random() * Math.PI * 2)

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset.current
    ref.current.position.y = position[1] + Math.sin(t) * 0.4
    ref.current.position.x = position[0] + Math.cos(t * 0.7) * 0.2
    ref.current.rotation.x = t * 0.5
    ref.current.rotation.y = t * 0.3
  })

  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[radius, 1]} />
      <meshStandardMaterial
        color="#00ff99"
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  )
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ff99" />
        <StarField />
        <FloatingOrbs />
      </Canvas>
    </div>
  )
}
