import { Box, Paper } from '@mui/material'
import React, { useCallback, useState } from 'react'
import DrawerIconMenu from './DrawerIconMenu'
import DrawerLabelMenu from './DrawerLabelMenu'

const DrawerLarge = () => {
    const [display, setDisplay] = useState('inline')

    const setDisplayFun = useCallback((data) => {
        setDisplay(data)
    }, [display])

    return (
        <Paper sx={{
            display: 'flex',
            flexDirection: 'row',
        }} >
            <Box sx={{ backgroundColor: '#6d6962', width: '40px' }} >
                <DrawerIconMenu display={display} setfun={setDisplayFun} />
            </Box>
            <Box sx={{ backgroundColor: '#6d6962', width: '165px', display: display }} >
                <DrawerLabelMenu setfun={setDisplayFun} />
            </Box>
        </Paper>
    )
}

export default DrawerLarge