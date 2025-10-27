'use client'
import { IconButton, Tooltip } from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'


export default function ThemeToggle({ mode, onToggle }: { mode: 'light' | 'dark', onToggle: () => void }) {
    return (
        <Tooltip title={mode === 'dark' ? 'Light mode' : 'Dark mode'}>
            <IconButton onClick={onToggle} sx={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}>
                {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
        </Tooltip>
    )
}
