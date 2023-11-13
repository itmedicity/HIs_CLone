// @ts-nocheck
import React, { memo, useEffect, useState } from 'react'
import { TableCell, TableRow } from '@mui/material'
import { Box, Checkbox, Chip, Typography } from '@mui/joy'

const TableRows = ({ data, onClick }) => {

    const [checked, setChecked] = useState(false)

    useEffect(() => {
        setChecked(data.isTssh)
    }, [data.isTssh])

    const onChange = (event) => {
        setChecked(event.target.checked)
        let checkedObj = {
            check: event.target.checked,
            value: data
        }
        onClick(checkedObj)
    }

    return (
        <TableRow sx={{ backgroundColor: checked && '#ECEEF1' }} >
            <TableCell padding='checkbox'  >
                <Box sx={{ display: 'flex', justifyContent: 'center' }} >
                    <Checkbox
                        checked={checked}
                        onChange={onChange}
                        disabled={data.tmch === "1" ? true : false}
                        value={JSON.stringify(data)}
                    />
                </Box>
            </TableCell>
            <TableCell padding='checkbox' >{data.IPD_DATE}</TableCell>
            <TableCell padding='checkbox' >{data.IP_NO}</TableCell>
            <TableCell padding='checkbox' >{data.PT_NO}</TableCell>
            <TableCell padding='checkbox' >{data.PTC_PTNAME}</TableCell>
            <TableCell padding='checkbox' align='center' >
                {
                    data?.tmch === "1" ?
                        <Typography level="body-xs" variant="outlined" color='danger' >Grouped</Typography>
                        : (data?.tmch === "0" && data.isTssh === false) ?
                            <Typography level="body-xs" variant="outlined" color='warning' >Tmch</Typography>
                            : (data?.tmch === "0" && data.isTssh === true) ?
                                <Typography level="body-xs" variant="outlined" color='success' >Tssh</Typography>
                                :
                                <Typography level="body-xs" variant="outlined" color='neutral' >Check</Typography>
                }
            </TableCell>
        </TableRow>
    )
}

export default memo(TableRows)
