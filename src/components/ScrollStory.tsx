'use client'

import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Scroll, ScrollControls, useScroll } from '@react-three/drei'
import * as THREE from 'three'
import { Box, Chip, Container, Stack, Typography } from '@mui/material'

function DeathStar() {
  const sphereRef = useRef<THREE.Mesh>(null!)
  const dishRef = useRef<THREE.Mesh>(null!)

  const metal = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#7d8085',
        metalness: 0.85,
        roughness: 0.35,
      }),
    []
  )
  const dish = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#90939a',
        metalness: 0.9,
        roughness: 0.25,
        emissive: '#101216',
        emissiveIntensity: 0.05,
      }),
    []
  )

  useFrame((_, dt) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y += dt * 0.1
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[8, 6, 10]} intensity={1.2} />
      <directionalLight position={[-6, -4, -8]} intensity={0.5} />

      <mesh ref={sphereRef} material={metal}>
        <sphereGeometry args={[1.6, 64, 64]} />
      </mesh>

      <mesh
        ref={dishRef}
        material={dish}
        position={[0, 0.5, 1.4]}
        rotation={[Math.PI * 0.07, 0, 0]}
      >
        <circleGeometry args={[0.55, 64]} />
      </mesh>
    </>
  )
}

function CameraRig() {
  const scroll = useScroll()
  const group = useRef<THREE.Group>(null!)
  useFrame(({ camera }) => {
    const p = scroll.offset
    camera.position.z = THREE.MathUtils.lerp(6, 4.8, p)
    camera.position.y = THREE.MathUtils.lerp(0, 0.2, p)
    camera.lookAt(0, 0, 0)
    if (group.current) group.current.rotation.y = THREE.MathUtils.lerp(0, 0.4, p)
  })
  return <group ref={group} />
}

function Section({ top, children }: { top: string; children: React.ReactNode }) {
  return (
    <Container
      maxWidth="md"
      style={{ position: 'absolute', top, left: 0, right: 0 }}
    >
      <Stack
        spacing={1.25}
        sx={{
          mx: 'auto',
          textAlign: 'center',
          bgcolor: 'rgba(10,12,16,0.35)',
          border: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(6px)',
          borderRadius: 2,
          p: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {children}
      </Stack>
    </Container>
  )
}

function Crawl() {
  const scroll = useScroll()
  const wrap = useRef<HTMLDivElement>(null)
  useFrame(() => {
    const p = scroll.offset
    if (wrap.current) {
      const z = THREE.MathUtils.lerp(-200, 100, p)
      const ry = THREE.MathUtils.lerp(0, 8, p)
      wrap.current.style.transform =
        `perspective(900px) rotateX(28deg) translate3d(0, ${-p * 30}vh, ${z}px) rotateY(${ry}deg)`
    }
  })
  return (
    <Container maxWidth="sm" sx={{ position: 'absolute', top: '12vh', left: 0, right: 0 }}>
      <div ref={wrap} style={{ transformOrigin: 'bottom center', willChange: 'transform' }}>
        <Stack spacing={2} sx={{ textAlign: 'center' }}>
          <Chip label="Frontend Engineer" color="secondary" sx={{ fontWeight: 700, mx: 'auto' }} />
          <Typography variant="h1" sx={{ fontSize: { xs: 34, sm: 46, md: 62 }, fontWeight: 800, lineHeight: 1.05 }}>
            Onur Bora Akman
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Cinematic web experiences with <b>Next.js</b>, <b>React</b>, <b>Three.js</b>, and <b>MUI</b>.
          </Typography>
          <Typography sx={{ opacity: 0.85 }}>
            TypeScript across the stack. SSR/ISR, edge runtime, tasteful motion, and accessibility-first UI.
          </Typography>
        </Stack>
      </div>
    </Container>
  )
}

export default function ScrollStory() {
  return (
    <Box sx={{ position: 'relative', height: '100svh', borderRadius: 2, overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 42 }} dpr={[1, 2]}>
        <color attach="background" args={['#07080c']} />
        <fog attach="fog" args={['#07080c', 6, 16]} />
        <Suspense fallback={null}>
          <ScrollControls pages={3} damping={0.14}>
            <Scroll>
              <DeathStar />
              <CameraRig />
              <Environment preset="city" />
            </Scroll>

            <Scroll html>
              <Crawl />

              <Section top="120vh">
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>Core Stack</Typography>
                <Typography sx={{ opacity: 0.85 }}>
                  Next.js · React · Three.js · MUI · TypeScript · Node.js · Zustand/Redux · SSR/ISR · Edge
                </Typography>
              </Section>

              <Section top="220vh">
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>Education</Typography>
                <Typography sx={{ opacity: 0.9 }}>
                  Grand Canyon University — <b>M.S. Computer Science</b> & <b>B.S. Software Development</b>
                </Typography>
              </Section>
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>

      <Box sx={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 160px rgba(0,0,0,0.65)', pointerEvents: 'none' }} />
    </Box>
  )
}
