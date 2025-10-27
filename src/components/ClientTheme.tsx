'use client'

import { useMemo, useState } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { getTheme } from '@/theme'
import ThemeToggle from '@/components/ThemeToggle'

export default function ClientTheme({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>('dark')
  const theme = useMemo(() => getTheme(mode), [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/*<ThemeToggle mode={mode} onToggle={() => setMode(m => (m === 'dark' ? 'light' : 'dark'))} />*/}
      {children}
    </ThemeProvider>
  )
}
