import { TableCell, TableRow } from '@mui/material'
import React, { memo } from 'react'

const LightBlueRow = ({ data }) => {
    const { groupList } = data;
    const grossAmount = groupList?.reduce((accumulator, currentValue) => accumulator + currentValue.groupGross, 0)?.toFixed(2);
    return (
        <TableRow sx={{
            backgroundColor: '#BBD8FF',
            height: '30px',
            display: grossAmount == 0 ? 'none' : ''
        }} key={data.groupDesc} >
            <TableCell align="right" sx={{ width: '2%', fontWeight: 'bolder', fontSize: '12px' }} ></TableCell>
            <TableCell align="left" colSpan={6} sx={{ fontWeight: 'bolder', fontSize: '12px', textTransform: 'capitalize' }} >{data?.groupDesc?.toLowerCase()}</TableCell>
        </TableRow>
    )
}

export default memo(LightBlueRow)