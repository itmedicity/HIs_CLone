import { Box, Paper } from '@mui/material'
import React, { memo } from 'react'
import './Style.css'

const ContentSecondary = (prop) => {
    return (
        <Paper
            variant='outlined'
            square
            sx={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                border: '1px solid #525252'
            }}  >
            <Paper
                variant='outlined'
                square
                sx={{
                    display: 'flex',
                    height: 30,
                    border: '1px solid #525252',
                    backgroundColor: '#525252',
                    alignItems: 'center'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        fontSize: '16px',
                        color: '#FFFFFF',
                        fontWeight: 'bold',
                        paddingLeft: '4px',
                        fontFamily: 'Arial,Tahoma,Verdana,sans-serif',

                    }}
                >
                    {prop.name}
                </Box>
            </Paper>
            <Box sx={{ display: 'flex', flex: 1, flexFlow: 'column', m: 0.5, }} >
                {prop.children}
            </Box>
        </Paper>
    )
}

export default memo(ContentSecondary) 