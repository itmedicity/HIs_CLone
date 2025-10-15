// @ts-nocheck
import { TableCell, TableRow } from '@mui/material'
import React, { memo } from 'react'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const WhiteRow = ({ data, onClick }) => {
    const description = data?.groupName?.toLowerCase()
    return (
        <TableRow key={data.groupName} >
            <TableCell align="right" sx={{ width: '2%', textAlign: 'center', alignItems: 'center' }} ><ArrowRightIcon sx={{ display: 'flex', fontSize: 15 }} /></TableCell>
            <TableCell align="left" sx={{ width: '25%', fontSize: '12px', textTransform: 'capitalize' }} >{description}</TableCell>
            <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} ></TableCell>
            <TableCell align="right" sx={{ width: '20%', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline', color: '#0000EE' }}
                onClick={() => onClick(data)}
            >{data?.groupNet?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </TableCell>
            <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} >{data?.groupTax?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
            <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 2 }} >{data?.groupDiscnt?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
            <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 1 }} >{data?.groupGross?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
        </TableRow>
    )
}

export default memo(WhiteRow)   