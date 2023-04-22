import { Box, IconButton } from '@mui/material'
import React from 'react'
import { imageIcon } from '../../assets/ImageExport'
import MenuLabelCmp from './MenuLabelCmp'
import { menuIconName } from '../../Menu/Menu'

const DrawerLabelMenu = ({ setfun }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', verticalAlign: "middle" }} >
            <Box sx={{ display: 'flex', height: '30px', backgroundColor: '#313030', alignItems: 'center', justifyContent: 'space-between' }} >
                <Box sx={{ color: '#d0d0d0', fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '14px' }} >Menu</Box>
                <Box>
                    <IconButton
                        onClick={() => setfun('none')}
                    >
                        <img
                            alt='Pin Menu'
                            style={{ height: '15px', color: 'white', padding: "4px", opacity: '0.8' }}
                            src={imageIcon.pin} />
                    </IconButton>
                </Box>
            </Box>
            {
                menuIconName.map((val, idx) => {
                    return <MenuLabelCmp name={val.name} key={idx} route={val.route} />
                })
            }
        </Box>
    )
}

export default DrawerLabelMenu