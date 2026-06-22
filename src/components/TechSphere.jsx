"use client"
import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const techs = [
  'React', 'Next.js', 'TypeScript', 'JavaScript',
  'Tailwind', 'Redux', 'Node.js', 'GraphQL',
  'CSS3', 'HTML5', 'Git', 'Docker'
]

function TechTag({ text, position, index }) {
  const ref = useRef()
  const [hovered, setHovered] = useState(false)
  const offset = index * 0.5

  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.4 + offset
    ref.current.rotation.y = Math.sin(t * 0.3) * 0.2
  })

  return (
    <group ref={ref} position={position}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1.4, 0.4, 0.05]} />
        <meshStandardMaterial
          color={hovered ? '#00ff99' : '#1c1c22'}
          transparent
          opacity={hovered ? 0.9 : 0.7}
          emissive={hovered ? '#00ff99' : '#003322'}
          emissiveIntensity={hovered ? 0.5 : 0.1}
        />
      </mesh>
      <Text
        position={[0, 0, 0.04]}
        fontSize={0.14}
        color={hovered ? '#000000' : '#00ff99'}
        anchorX="center"
        anchorY="middle"
        font="/fonts/jetbrains.woff"
      >
        {text}
      </Text>
    </group>
  )
}

function SphereTags() {
  const groupRef = useRef()

  const positions = techs.map((_, i) => {
    const phi = Math.acos(-1 + (2 * i) / techs.length)
    const theta = Math.sqrt(techs.length * Math.PI) * phi
    const r = 2.4
    return [
      r * Math.cos(theta) * Math.sin(phi),
      r * Math.sin(theta) * Math.sin(phi),
      r * Math.cos(phi),
    ]
  })

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.2
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
  })

  return (
    <group ref={groupRef}>
      {/* Center wireframe sphere */}
      <mesh>
        <sphereGeometry args={[1.8, 16, 16]} />
        <meshStandardMaterial
          color="#00ff99"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>
      {techs.map((tech, i) => (
        <TechTag key={tech} text={tech} position={positions[i]} index={i} />
      ))}
    </group>
  )
}

export default function TechSphere() {
  return (
    <div className="w-full h-[500px] cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#00ff99" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ffffff" />
        <SphereTags />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI * 3 / 4}
        />
      </Canvas>
    </div>
  )
}
