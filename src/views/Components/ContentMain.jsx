import { Box, Checkbox, FormControlLabel, Paper } from '@mui/material'
import React, { memo, } from 'react'
import './Style.css'
import SearchIcon from '@mui/icons-material/Search';
import { Input } from '@mui/joy';

const ContentMain = (prop) => {

    return (
        <Box flex={1} sx={{ padding: '10px 20px 10px 20px', }} >
            <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', }} >
                <Paper
                    elevation={0}
                    variant='outlined'
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                    }}
                    square
                    className='divSearchMenu'
                >
                    <Box sx={{ display: 'flex' }}>
                        <FormControlLabel
                            label="All Modules"
                            control={<Checkbox
                                defaultChecked
                                sx={{ padding: 0, color: '#C4C4C4', }}
                                disabled
                            />}
                            sx={{ fontSize: '12px' }}
                        />

                        <Input
                            size="sm"
                            sx={{ borderRadius: 3 }}
                            color="warning"
                            placeholder='Search Menu'
                            endDecorator={<SearchIcon />}
                        />
                    </Box>
                </Paper>
            </Box>
            <Box flex={1} >
                {prop.children}
            </Box>
        </Box>
    )
}

export default memo(ContentMain) 