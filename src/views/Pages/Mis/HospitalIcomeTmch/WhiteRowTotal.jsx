import { TableCell, TableRow } from '@mui/material'
import React, { memo } from 'react'

const WhiteRowTotal = ({ data }) => {
    const { groupList } = data;

    const netAmount = groupList?.reduce((accumulator, currentValue) => accumulator + currentValue.groupNet, 0);
    const taxAmount = groupList?.reduce((accumulator, currentValue) => accumulator + currentValue.groupTax, 0);
    const discountAmt = groupList?.reduce((accumulator, currentValue) => accumulator + currentValue.groupDiscnt, 0);
    const grossAmount = groupList?.reduce((accumulator, currentValue) => accumulator + currentValue.groupGross, 0);

    return (
        <TableRow sx={{ display: grossAmount == 0 ? 'none' : '' }} >
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