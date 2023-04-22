import { Box, Grid } from '@mui/material'
import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { imageIcon } from '../../assets/ImageExport'

const ContentNavLink = ({ name, route }) => {
    return (
        <Box
            component={Grid}
            xs={4} md={4} lg={4} sm={4} item
            sx={{
                // backgroundColor: 'lightgreen',
                '& :hover': {
                    backgroundColor: '#f2f2f2',
                }
            }}
        >
            <NavLink to={route}
                style={{
                    textDecoration: 'none',
                    display: 'block',
                    padding: '3px 6px',
                    textAlign: 'left',
                    fontSize: '12px',
                    border: '1px solid #ffffff',
                    color: '#000000',
                    fontFamily: 'Arial,Tahoma,Verdana,sans-serif',
                }}
            >
                <img alt='Link Image' style={{ verticalAlign: 'middle', border: 0, paddingRight: '4px' }} src={imageIcon.linkImage} />
                {name}
            </NavLink>
        </Box>
    )
}

export default memo(ContentNavLink)