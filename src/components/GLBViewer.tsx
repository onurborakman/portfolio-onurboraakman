'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Center, Environment, OrbitControls, Stars, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { Box, useMediaQuery } from '@mui/material'

function Model() {
    const { scene } = useGLTF('/model.glb')
    scene.traverse((o: THREE.Object3D) => {
        const m = (o as any).material as THREE.Material | undefined
        if (m && 'metalness' in m && 'roughness' in m) {
            ; (m as any).metalness ??= 0.5
                ; (m as any).roughness ??= 0.6
        }
    })
    return <primitive object={scene} />
}
useGLTF.preload('/model.glb')

export default function GlbViewer({ height = '100vh' }: { height?: string | number }) {
    const isTouch = useMediaQuery('(pointer: coarse)') || useMediaQuery('(max-width:900px)')

    return (
        <Box sx={{ position: 'relative', width: '100%', height, overflow: 'hidden' }}>
            <Canvas
                camera={{ position: [0, 0, 6], fov: 42 }}
                dpr={[1, 2]}
                style={{ touchAction: isTouch ? 'pan-y' : 'none' }}
            >
                <color attach="background" args={['#05060a']} />
                <fog attach="fog" args={['#05060a', 6, 18]} />

                <Suspense fallback={null}>
                    <Stars radius={95} depth={80} count={9000} factor={4} fade speed={0.35} />
                    <hemisphereLight args={['#dbe3ff', '#0b0c10', 0.6]} />
                    <directionalLight position={[8, 6, 10]} intensity={1.1} />
                    <directionalLight position={[-6, -4, -8]} intensity={0.5} />
                    <Environment preset="city" />

                    <Center>
                        <Model />
                    </Center>

                    <OrbitControls
                        enableDamping
                        dampingFactor={0.08}
                        enableZoom={false}
                        enablePan={false}
                        enableRotate={!isTouch}
                        touches={isTouch ? { ONE: 0, TWO: 0 } : undefined}
                    />
                </Suspense>
            </Canvas>
        </Box>
    )
}
