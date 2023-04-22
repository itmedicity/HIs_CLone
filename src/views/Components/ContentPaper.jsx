import { Box, Grid, Paper, Typography } from '@mui/material'
import React, { memo, useState } from 'react'
import './Style.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ContentPaper = (prop) => {
    const [display, setDisplay] = useState('none')
    const windowToggle = (display) => {
        display === 'none' ? setDisplay('block') : setDisplay('none')
    }
    return (
        <Paper
            square
            variant='outlined'
            sx={{ mb: 0.8 }}
        >
            <Paper
                square
                component={Typography}
                onClick={() => windowToggle(display)}
                variant='outlined'
                sx={{
                    cursor: 'pointer',
                    display: 'flex',
                    fontFamily: 'Arial,Tahoma,Verdana,sans-serif',
                    textTransform: 'capitalize',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#525252',
                    minHeight: '28px',
                    alignItems: 'center',
                    paddingLeft: 0.5
                }}
            >
                <MoreVertIcon sx={{ fontSize: '18px' }} /> {prop.name}
            </Paper>
            <Paper
                square
                variant='outlined'
                sx={{
                    display: display,
                    color: '#525252',
                    borderBottomRightRadius: '5px',
                    borderBottomLeftRadius: '5px',
                    transition: '0.3s ease-in-out',
                    padding: 0.5
                }} >
                <Box component={Grid} container >
                    {prop.children}
                </Box>
            </Paper>
        </Paper>
    )
}

export default memo(ContentPaper)