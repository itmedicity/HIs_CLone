import { Box, CircularProgress, Paper } from '@mui/material'
import React, { Suspense } from 'react'
import HeaderBar from './HeaderBar'
import DrawerLarge from './DrawerLarge'
import { Routes, Route } from 'react-router-dom'

import routes from '../../Routes/routes'

const DefaultLayout = () => {
    return (
        <Paper sx={{ display: 'flex', flexDirection: "column", minHeight: '100vh', backgroundColor: 'white', overflow: 'hidden' }} >
            {/* Header Bar */}
            <Box>
                <HeaderBar />
            </Box>
            {/* Side Drawer */}
            <Box sx={{ display: 'flex', minHeight: '100vh', }} >
                <DrawerLarge />
                <Paper sx={{ flex: 1, display: 'flex' }} square >
                    <Suspense fallback={<CircularProgress />} >
                        <Routes>
                            {
                                routes.map((route, idx) => <Route path={route.path} Component={route.element} key={idx} />)
                            }
                        </Routes>
                    </Suspense>
                </Paper>
            </Box>
        </Paper>
    )
}

export default DefaultLayout