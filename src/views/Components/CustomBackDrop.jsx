// @ts-nocheck
import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import LinearProgress from '@mui/joy/LinearProgress';
import { Box } from '@mui/joy';

const CustomBackDrop = ({ open, handleClose }) => {
    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <Box sx={{ width: '80vw' }} >
                    <LinearProgress thickness={5} />
                </Box>
            </Backdrop>
        </div>
    )
}

export default CustomBackDrop