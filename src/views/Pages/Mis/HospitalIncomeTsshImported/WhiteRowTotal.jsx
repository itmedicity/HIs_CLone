// @ts-nocheck
import { TableCell, TableRow } from '@mui/material'
import React, { memo } from 'react'

const WhiteRowTotal = ({ data }) => {

    const netAmount = data?.reduce((accumulator, currentValue) => accumulator + currentValue.net, 0);
    const taxAmount = data?.reduce((accumulator, currentValue) => accumulator + currentValue.tax, 0);
    const discountAmt = data?.reduce((accumulator, currentValue) => accumulator + currentValue.discount, 0);
    const grossAmount = data?.reduce((accumulator, currentValue) => accumulator + currentValue.gross, 0);

    return (
        <TableRow >
            <TableCell align="right" sx={{ width: '2%', textAlign: 'center' }} ></TableCell>
            <TableCell align="left" sx={{ width: '25%', fontSize: '12px' }} ></TableCell>
            <TableCell align="right" sx={{ width: '20%', fontSize: '12px', fontWeight: 'bolder' }} >0.00</TableCell>
            <TableCell align="right" sx={{ width: '20%', fontSize: '12px', fontWeight: 'bolder' }} >{netAmount?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
            <TableCell align="right" sx={{ width: '20%', fontSize: '12px', fontWeight: 'bolder' }} >{taxAmount?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
            <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 2, fontWeight: 'bolder' }} >{discountAmt?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
            <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 1, fontWeight: 'bolder' }} >{grossAmount?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
        </TableRow>
    )
}

export default memo(WhiteRowTotal)