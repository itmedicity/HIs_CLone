import { Box } from '@mui/material'
import React, { memo } from 'react'
import CopyrightIcon from '@mui/icons-material/Copyright';

const NameDis = () => {
    return (
        <Box>
            Test
            {/* <Box
                sx={{
                    fontFamily: 'Tahoma',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#3e3d3c',
                    bottom: '0px'
                }}
            >Ellider Hospital Information System</Box>
            <Box
                sx={{
                    fontFamily: 'Tahoma',
                    fontSize: '12px',
                    // fontWeight: 'bold',
                    color: '#3e3d3c',
                    bottom: '0px'
                }}
            >Copyright <CopyrightIcon sx={{ fontSize: 14, p: 0 }} /> Datamate Infosolutions (P) Ltd.All Rights Reserved. </Box> */}
        </Box>
    )
}

export default memo(NameDis) 