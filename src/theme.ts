'use client'
import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
    interface Palette {
        elevation: {
            1: string; 2: string; 3: string;
        }
    }
    interface PaletteOptions {
        elevation?: { 1: string; 2: string; 3: string }
    }
}

export const getTheme = (mode: 'light' | 'dark' = 'dark') => createTheme({
    cssVariables: true,
    colorSchemes: { light: true, dark: true },
    palette: {
        mode,
        primary: { main: '#6EE7F9' },
        secondary: { main: '#A78BFA' },
        background: { default: mode === 'dark' ? '#0A0B0F' : '#fafafa', paper: mode === 'dark' ? '#0F1117' : '#fff' },
        elevation: { 1: '#11131a', 2: '#0c0e14', 3: '#07080c' },
    },
    shape: { borderRadius: 16 },
    typography: {
        fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
        h1: { fontWeight: 800, letterSpacing: -1.2 },
        h2: { fontWeight: 700, letterSpacing: -0.8 },
        h3: { fontWeight: 700 },
    },
    components: {
        MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
        MuiCard: { styleOverrides: { root: { backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.06)' } } },
        MuiButton: { defaultProps: { size: 'large' } },
        MuiChip: { styleOverrides: { root: { fontWeight: 600 } } },
    },
})
