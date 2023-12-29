// @ts-nocheck
import { TableCell, TableRow } from '@mui/material'
import React, { memo } from 'react'

const LightBlueRow = ({ name }) => {
    return (
        <TableRow sx={{
            backgroundColor: '#BBD8FF',
            height: '30px',
        }} >
            <TableCell align="right" sx={{ width: '2%', fontWeight: 'bolder', fontSize: '12px' }} ></TableCell>
            <TableCell align="left" colSpan={6} sx={{ fontWeight: 'bolder', fontSize: '12px', textTransform: 'capitalize' }} >{name}</TableCell>
        </TableRow>
    )
}

export default memo(LightBlueRow)