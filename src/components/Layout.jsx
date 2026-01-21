import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import NavBar from './NavBar'
import Footer from './Footer'

export const Layout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar />
      <Box component="main" sx={{ flexGrow: 1, pb: 10 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}

