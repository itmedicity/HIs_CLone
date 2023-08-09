import React, { Fragment } from 'react'

import { Box, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';

export const MonthSelect = ({ value }) => {

    return (
        <Fragment>
            <Box sx={{ display: "flex", flexDirection: 'column', height: '102px' }}>
                <Box sx={{
                    display: "flex",
                    borderRadius: '1px',
                    border: '1px solid lightgrey',
                    width: '100%',
                    flexDirection: 'row'
                }}
                    variant='elevation' overflow='hidden'>
                    <TableContainer
                        sx={{
                            maxHeight: 105,
                            width: '100%'
                        }}>
                        <Table size="small" padding={"none"}>
                            <TableHead>
                                <TableRow >
                                    <TableCell size='small' align="center"
                                        sx={{
                                            fontWeight: 'bold',
                                            fontSize: 12,
                                            borderRight: '1px solid lightgrey',
                                            // borderBottom: '1px solid grey',
                                        }}>
                                        Month
                                    </TableCell>
                                    {value && value.map((val, index) => (
                                        <TableCell key={index} align="center"
                                            sx={{
                                                fontWeight: 700,
                                                fontSize: 12,
                                                // borderBottom: '1px solid grey',
                                                borderRight: '1px solid lightgrey'


                                            }}>{val.month}</TableCell>
                                    ))}
                                </TableRow>
                                <TableRow >
                                    <TableCell size='small' align="center"
                                        sx={{
                                            fontWeight: 'bold',
                                            fontSize: 12,
                                            // borderBottom: '1px solid grey',
                                            borderRight: '1px solid lightgrey',

                                        }} >
                                        OP
                                    </TableCell>
                                    {value && value.map((val, index) => (
                                        <TableCell key={index} align="center"
                                            size='small'
                                            sx={{
                                                textAlign: 'center',
                                                fontSize: 12,
                                                fontWeight: 700,
                                                // borderBottom: '1px solid grey',
                                                borderRight: '1px solid lightgrey'
                                            }}>
                                            <Box display='flex' alignItems='center' justifyContent='center' >
                                                <Box display='flex' alignItems='center' paddingX={0.5}> {val.OPCount}</Box>
                                                <Box display='flex' alignItems='center' paddingX={0.5} >
                                                    {val.InDcOp === 0 ?
                                                        <ArrowDownward align="left" sx={{ display: 'flex', color: 'red', padding: 0, fontSize: 18 }} /> :
                                                        <ArrowUpward align="left" sx={{ display: 'flex', color: 'green', pt: 1, padding: 0, fontSize: 18 }} />
                                                    }
                                                </Box>
                                            </Box>
                                        </TableCell>
                                    ))}

                                </TableRow>

                                <TableRow>
                                    <TableCell size='small' align="center"
                                        sx={{
                                            fontWeight: 'bold',
                                            fontSize: 12,
                                            borderRight: '1px solid lightgrey',
                                            // borderBottom: '1px solid grey',
                                        }} >
                                        IP
                                    </TableCell>
                                    {value && value.map((val, index) => (
                                        <TableCell key={index} align="center"

                                            size='small'
                                            sx={{
                                                textAlign: 'center',
                                                fontSize: 12,
                                                fontWeight: 700,
                                                // borderBottom: '1px solid grey',
                                                borderRight: '1px solid lightgrey'
                                            }}>
                                            <Box display='flex' alignItems='center' justifyContent='center' >
                                                <Box display='flex' alignItems='center' paddingX={0.5}> {val.IPCount}</Box>
                                                <Box display='flex' alignItems='center' paddingX={0.5} >
                                                    {val.InDcIp === 0 ?
                                                        <ArrowDownward align="left" sx={{ display: 'flex', color: 'red', padding: 0, fontSize: 18 }} /> :
                                                        <ArrowUpward align="left" sx={{ display: 'flex', color: 'green', pt: 1, padding: 0, fontSize: 18 }} />
                                                    }
                                                </Box>
                                            </Box>

                                        </TableCell>
                                    ))}
                                </TableRow>

                                <TableRow>
                                    <TableCell size='small' align="center"
                                        sx={{
                                            fontWeight: 'bold',
                                            fontSize: 12,
                                            borderRight: '1px solid lightgrey',

                                        }} >
                                        Total
                                    </TableCell>
                                    {value && value.map((val, index) => (
                                        <TableCell key={index} align="center"
                                            size='small'
                                            sx={{
                                                textAlign: 'center',
                                                fontSize: 12,
                                                fontWeight: 700,
                                                borderRight: '1px solid lightgrey'
                                            }}>
                                            <Box display='flex' alignItems='center' justifyContent='center' >
                                                <Box display='flex' alignItems='center' paddingX={0.5}> {val.Total}</Box>
                                                <Box display='flex' alignItems='center' paddingX={0.5} >
                                                    {val.InDcTotal === 0 ?
                                                        <ArrowDownward align="left" sx={{ display: 'flex', color: 'red', padding: 0, fontSize: 18 }} /> :
                                                        <ArrowUpward align="left" sx={{ display: 'flex', color: 'green', pt: 1, padding: 0, fontSize: 18 }} />
                                                    }
                                                </Box>
                                            </Box>

                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Fragment>
    )
}
