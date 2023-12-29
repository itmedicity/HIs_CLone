// @ts-nocheck
import { TableCell, TableRow } from '@mui/material'
import React, { memo } from 'react'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const WhiteRow = ({ data }) => {
    const { groupName, net, tax, discount, gross } = data;
    return (
        <TableRow >
            <TableCell align="right" sx={{ width: '2%', textAlign: 'center', alignItems: 'center' }} ><ArrowRightIcon sx={{ display: 'flex', fontSize: 15 }} /></TableCell>
            <TableCell align="left" sx={{ width: '25%', fontSize: '12px', textTransform: 'capitalize' }} >{groupName}</TableCell>
            <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} ></TableCell>
            <TableCell align="right" sx={{ width: '20%', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline', color: '#0000EE' }}>
                {net?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </TableCell>
            <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} >{tax?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
            <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 2 }} >{discount?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
            <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 1 }} >{gross?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
        </TableRow>
    )
}

export default memo(WhiteRow)   