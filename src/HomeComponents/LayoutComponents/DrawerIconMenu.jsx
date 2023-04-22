import { Box, Divider, IconButton } from '@mui/material'
import React from 'react'
import { imageIcon } from '../../assets/ImageExport'
import MenuIconCmp from './MenuIconCmp'
import { menuIconName } from '../../Menu/Menu'

const DrawerIconMenu = ({ display, setfun }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', verticalAlign: "middle" }} >
            <Box sx={{ height: '30px', backgroundColor: '#313030' }} >
                {
                    display === 'none' ?
                        <IconButton
                            onClick={() => setfun('inline')}
                        >
                            <img
                                alt='Pin Menu'
                                style={{ height: '16px', color: 'white', opacity: '0.8', paddingLeft: "5px" }}
                                src={imageIcon.pinned} />
                        </IconButton> :
                        <img
                            alt='Ellider Logo'
                            style={{ height: '20px', color: 'white', padding: "5px", opacity: '0.8' }}
                            src={imageIcon.commonMenuSelector} />
                }
            </Box>
            {
                menuIconName.map((val, idx) => {
                    return <MenuIconCmp iconName={val.iconName} key={idx} />
                })
            }
        </Box>
    )
}

export default DrawerIconMenu