"use client"
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float } from '@react-three/drei'

function AnimatedBlob() {
  const meshRef = useRef()

  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={2.2}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#00ff99"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.15}
          wireframe={false}
        />
      </mesh>
      {/* Inner wireframe */}
      <mesh scale={2.0}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color="#00ff99"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
    </Float>
  )
}

function Ring({ radius, speed, tilt }) {
  const ref = useRef()

  useFrame((state) => {
    ref.current.rotation.z = state.clock.elapsedTime * speed
    ref.current.rotation.x = tilt
  })

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.015, 8, 80]} />
      <meshStandardMaterial
        color="#00ff99"
        transparent
        opacity={0.3}
        emissive="#00ff99"
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

export default function Hero3DModel() {
  return (
    <div className="w-full h-[400px] xl:h-[500px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[3, 3, 3]} intensity={2} color="#00ff99" />
        <pointLight position={[-3, -3, -3]} intensity={0.5} color="#ffffff" />
        <AnimatedBlob />
        <Ring radius={3} speed={0.3} tilt={0.5} />
        <Ring radius={3.5} speed={-0.2} tilt={1.2} />
        <Ring radius={2.5} speed={0.5} tilt={-0.3} />
      </Canvas>
    </div>
  )
}
