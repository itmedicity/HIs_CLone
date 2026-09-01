import { Box } from '@mui/material'
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { isSharedPlaceholderRoute } from '../../Menu/Menu'
import { isSectionActive } from '../../Menu/menuSectionRoutes'

const MenuIconCmp = ({ iconName, route, name, slno, hoveredSlno, setHoveredSlno }) => {
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
            title={name}
            onMouseEnter={() => setHoveredSlno?.(slno)}
            onMouseLeave={() => setHoveredSlno?.(null)}
        >
            <Box sx={{
                height: '30px',
                backgroundColor: isActive || isHovered ? '#525252' : '#6d6962',
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
        </NavLink>
    )
}

export default MenuIconCmp