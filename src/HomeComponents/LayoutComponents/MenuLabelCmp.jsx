import { Box } from '@mui/material'
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { isSharedPlaceholderRoute } from '../../Menu/Menu'
import { isSectionActive } from '../../Menu/menuSectionRoutes'

const MenuLabelCmp = ({ name, route, slno, hoveredSlno, setHoveredSlno }) => {
    const location = useLocation()

    const isActive = isSharedPlaceholderRoute(route)
        ? location.state?.menuSlno === slno
        : isSectionActive(route, location.pathname)
    const isHovered = hoveredSlno === slno

    return (
        <NavLink
            to={route}
            state={{ menuSlno: slno }}
            style={{ textDecoration: 'none' }}
            onMouseEnter={() => setHoveredSlno?.(slno)}
            onMouseLeave={() => setHoveredSlno?.(null)}
        >
            <Box
                sx={{
                    height: '34px',
                    backgroundColor: isActive || isHovered ? '#525252' : '#6d6962',
                    borderBottom: '1px solid #90898994',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '13px',
                    fontWeight: isActive ? '600' : '',
                    color: 'white',
                    marginLeft: isHovered ? -0.8 : 0,
                    opacity: isHovered ? 0.5 : 1,
                    paddingLeft: isHovered ? 0.8 : 0,
                }}>
                {name}
            </Box>
        </NavLink>
    )
}

export default MenuLabelCmp