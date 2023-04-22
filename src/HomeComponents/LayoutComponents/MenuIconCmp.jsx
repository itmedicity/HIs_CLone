import { Box } from '@mui/material'
import React from 'react'
import { imageIcon } from '../../assets/ImageExport'

const MenuIconCmp = ({ iconName }) => {
    return (
        <Box sx={{
            height: '30px',
            backgroundColor: '#6d6962',
            borderBottom: '1px solid #90898994',
            display: 'block',
            padding: '2px 5px'
        }}>
            <Box sx={{
                backgroundPosition: 'center top',
                backgroundRepeat: 'no-repeat',
                width: '27px',
                height: '27px',
                display: 'inline-block',
                backgroundSize: '22px',
                border: '1px solid rgba(140,140,140,0.86)',
                marginRight: '4px',
                backgroundPositionY: '1px',
                backgroundColor: '#2d2c2c',
                borderRadius: '4px',
                verticalAlign: 'middle',
                backgroundImage: `url(${iconName})`
            }}
            ></Box>
        </Box>
    )
}

export default MenuIconCmp