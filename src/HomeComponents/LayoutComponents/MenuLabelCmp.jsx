import { Box, IconButton } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import './Style.css'

const MenuLabelCmp = ({ name, route }) => {
    return (
        <NavLink
            to={route}
            style={({ isActive, isPending }) => {
                return {
                    fontWeight: isActive ? '600' : "",
                    textDecoration: 'none',
                };
            }}
        >
            <Box
                sx={{
                    height: '34px',
                    backgroundColor: '#6d6962',
                    borderBottom: '1px solid #90898994',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '13px',
                    color: 'white',
                    paddingLeft: 0,
                    ':hover': {
                        backgroundColor: '#525252',
                        marginLeft: -0.8,
                        opacity: 0.5,
                        paddingLeft: 0.8
                    }

                }}>
                {name}
            </Box>
        </NavLink>
    )
}

export default MenuLabelCmp