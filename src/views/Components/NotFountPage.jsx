import { Box } from '@mui/material'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const NotFountPage = () => {
    return (
        <Box sx={{
            display: 'flex',
            flex: 1,
            backgroundColor: 'lightblue',
            minHeight: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <Box>404</Box>
            <Box>Page Not Found</Box>
            <Box>
                <NavLink to="/" > To Home</NavLink>
            </Box>
        </Box>
    )
}

export default NotFountPage