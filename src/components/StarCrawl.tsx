'use client'

import React, { JSX, Suspense, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { Box, Typography } from '@mui/material'

const TILT_DEG = 30 as const
const Y_START_VH = 150 as const
const Y_END_VH = -400 as const
const SECTION_HEIGHT = '200vh' as const
const TOP_INSET_START = 10 as const
const TOP_INSET_END = 34 as const

export default function StarCrawl(): JSX.Element {
    const sectionRef = useRef<HTMLDivElement>(null)
    const crawlRef = useRef<HTMLDivElement>(null)
    const maskRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const host = sectionRef.current
        const crawl = crawlRef.current
        const mask = maskRef.current
        if (!host || !crawl || !mask) return

        let ticking = false
        const update = () => {
            const rect = host.getBoundingClientRect()
            const viewH = window.innerHeight
            const total = rect.height - viewH
            const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0

            const y = Y_START_VH + p * (Y_END_VH - Y_START_VH)
            crawl.style.transform =
                `perspective(1100px) rotateX(${TILT_DEG}deg) translate3d(0, ${y}vh, 0)`

            const inset = TOP_INSET_START + p * (TOP_INSET_END - TOP_INSET_START)
            mask.style.clipPath = `polygon(${inset}% 0%, ${100 - inset}% 0%, 100% 100%, 0% 100%)`

            ticking = false
        }

        const onScroll = () => {
            if (!ticking) {
                ticking = true
                requestAnimationFrame(update)
            }
        }

        update()
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', update)
        return () => {
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', update)
        }
    }, [])

    return (
        <Box ref={sectionRef} sx={{ position: 'relative', width: '100%', height: SECTION_HEIGHT, bgcolor: '#05060a' }}>
            <Box sx={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden' }}>
                <Canvas camera={{ position: [0, 0, 6], fov: 42 }} dpr={[1, 2]}>
                    <color attach="background" args={['#05060a']} />
                    <fog attach="fog" args={['#05060a', 6, 18]} />
                    <Suspense fallback={null}>
                        <Stars radius={95} depth={80} count={9000} factor={4} fade speed={0.35} />
                    </Suspense>
                </Canvas>

                <Box sx={{
                    pointerEvents: 'none',
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, rgba(5,6,10,1) 0%, rgba(5,6,10,0) 18%, rgba(5,6,10,0) 82%, rgba(5,6,10,1) 100%)'
                }} />

                <div
                    ref={maskRef}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        pointerEvents: 'none',
                        display: 'grid',
                        placeItems: 'start center',
                    }}
                >
                    <div
                        ref={crawlRef}
                        style={{
                            position: 'relative',
                            marginInline: 'auto',
                            width: 'min(92vw, 880px)',
                            textAlign: 'center',
                            padding: '0 8px',
                            transformOrigin: 'bottom center',
                            willChange: 'transform',
                            pointerEvents: 'none',
                            fontStyle: 'normal',
                            WebkitFontSmoothing: 'antialiased',
                            MozOsxFontSmoothing: 'grayscale',
                        }}
                    >
                        <Typography sx={{ color: '#4bd5ff', fontSize: { xs: 14, sm: 16 }, mb: 3, fontWeight: 700, letterSpacing: 1 }}>
                            A long time ago in a portfolio far, far away…
                        </Typography>

                        <Typography
                            sx={{
                                color: '#FFE81F', fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase',
                                lineHeight: 1.05, fontSize: { xs: 42, sm: 60, md: 78 }, mb: 2,
                                textShadow:
                                    '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 0 0 10px rgba(0,0,0,0.6)',
                            }}
                        >
                            Onur Bora Akman
                        </Typography>
                        <Typography
                            sx={{
                                color: '#FFE81F', fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase',
                                mb: 4, fontSize: { xs: 16, sm: 18, md: 20 },
                                textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                            }}
                        >
                            Frontend Engineer
                        </Typography>

                        <CrawlP>
                            Fueled by <b>Next.js</b>, <b>React</b>, and <b>TypeScript</b>, I build digital experiences engineered for precision
                            and performance. I craft interfaces that feel alive using <b>MUI</b> for scalable design systems and <b>Three.js</b>
                            for interactive 3D depth — blending creativity with technical execution without compromise.
                        </CrawlP>

                        <CrawlP>
                            I build fast, flexible content architectures powered by <b>Prismic</b> and <b>WordPress</b>, and I move between
                            modern frameworks like <b>Astro.js</b> when projects demand speed at scale. My data flows are clean and predictable,
                            whether I’m working with REST or <b>GraphQL</b> APIs, or managing state with <b>Redux</b>.
                        </CrawlP>

                        <CrawlP>
                            My development discipline is grounded in reliability and clean engineering. My codebases stay scalable with
                            <b>ESLint</b> and <b>Prettier</b>, tested with <b>Jest</b>, and deployed confidently using automated <b>CI/CD</b>
                            pipelines. I containerize environments using <b>Docker</b> and ship fast, secure deployments on <b>Vercel</b>.
                        </CrawlP>

                        <CrawlP>
                            I hold a <b>Master of Science in Computer Science</b> and a <b>Bachelor of Science in Software Development</b> from
                            Grand Canyon University. I communicate clearly, think in systems, and I build like a problem solver — fast, focused,
                            and accountable from start to ship.
                        </CrawlP>

                        <CrawlP>
                            I partner with teams and founders worldwide as a frontend engineer and open to contract work of any timeline.
                            <b>Contact:</b> onurboraakman@hotmail.com — if you’re building something that deserves excellence, I’m ready.
                        </CrawlP>

                    </div>
                </div>
            </Box>
        </Box>
    )
}

function CrawlP({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <Typography
            component="p"
            sx={{
                color: '#FFE81F',
                fontWeight: 600,
                lineHeight: 1.6,
                letterSpacing: 0.4,
                fontSize: { xs: 16, sm: 18, md: 20 },
                mb: 3,
                textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                fontStyle: 'normal',
            }}
        >
            {children}
        </Typography>
    )
}
