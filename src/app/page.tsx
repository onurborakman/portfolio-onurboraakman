'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Box, Button, Card, CardContent, Chip, Container, Stack, Typography } from '@mui/material'

const GlbViewer = dynamic(() => import('@/components/GLBViewer'), { ssr: false })
const StarCrawl = dynamic(() => import('@/components/StarCrawl'), { ssr: false })

export default function Page() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <Box sx={{ bgcolor: 'black', color: 'text.primary', width: '100%' }}>
      {mounted && <GlbViewer height="100vh" />}
      {mounted && <StarCrawl />}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 }, backgroundColor: 'transparent' }}>
        <SectionTitle title="Core Skills" subtitle="My primary stack for building production-ready frontends." />
        <Card sx={{ p: { xs: 1, sm: 2 } }}>
          <CardContent>
            <ChipWall items={[
              'Next.js', 'React', 'TypeScript', 'MUI', 'Three.js', 'Redux', 'Node.js', 'Astro.js'
            ]} />
          </CardContent>
        </Card>

        <SectionTitle sx={{ mt: 6 }} title="Other Skills" subtitle="Platforms, content systems, build tooling, and delivery." />
        <Box sx={{
          mt: 2,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(3, 1fr)' },
          gap: 2,
        }}>
          {[
            { title: 'Content Systems', items: ['Prismic', 'WordPress'] },
            { title: 'Commerce', items: ['Shopify'] },
            { title: 'Data', items: ['REST', 'GraphQL'] },
            { title: 'Tooling & Quality', items: ['ESLint', 'Prettier', 'Jest', 'CI/CD'] },
            { title: 'Platforms & Infra', items: ['Vercel', 'Docker'] },
            { title: 'UI Practice', items: ['Responsive UX', 'Component Architecture', 'Reusable Design'] },
          ].map(cat => (
            <Card key={cat.title} variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>{cat.title}</Typography>
                <ChipWall items={cat.items} small />
              </CardContent>
            </Card>
          ))}
        </Box>

        <SectionTitle sx={{ mt: 8 }} title="Education" />
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>Grand Canyon University</Typography>
            <Stack spacing={1}>
              <BadgeLine badge="M.S. Computer Science" detail="Master of Science in Computer Science" />
              <BadgeLine badge="B.S. Software Development" detail="Bachelor of Science in Software Development" />
            </Stack>
          </CardContent>
        </Card>

        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>Let’s build something elite.</Typography>
          <Typography sx={{ opacity: 0.85, mb: 2 }}>Open to frontend engineering contracts and collaboration.</Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="contained" href="mailto:onurboraakman@hotmail.com">Contact Me</Button>
          </Stack>
        </Box>
      </Container>

    </Box>
  )
}

/* ---------- helpers ---------- */
function SectionTitle({ title, subtitle, sx = {} as any }: { title: string; subtitle?: string; sx?: any }) {
  return (
    <Stack spacing={0.5} sx={sx}>
      <Typography variant="h3" sx={{ fontSize: { xs: 28, sm: 36, md: 44 }, fontWeight: 800, textAlign: 'center' }}>
        {title}
      </Typography>
      {subtitle && <Typography sx={{ opacity: 0.8, textAlign: 'center' }}>{subtitle}</Typography>}
    </Stack>
  )
}
function ChipWall({ items, small = false }: { items: string[]; small?: boolean }) {
  return (
    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" justifyContent="center">
      {items.map((i) => <Chip key={i} label={i} size={small ? 'small' : 'medium'} sx={{ fontWeight: 700 }} />)}
    </Stack>
  )
}
function BadgeLine({ badge, detail }: { badge: string; detail: string }) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems="center">
      <Chip color="primary" label={badge} />
      <Typography variant="body2" sx={{ opacity: 0.85 }}>{detail}</Typography>
    </Stack>
  )
}
