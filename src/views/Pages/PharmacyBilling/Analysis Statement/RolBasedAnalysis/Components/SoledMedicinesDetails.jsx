import React, { Fragment } from 'react'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
const SoledMedicinesDetails = ({ value, setcount, monthwise }) => {
    console.log(monthwise);
    return (
        <Fragment>
            <Box sx={{ display: "flex", flexDirection: 'column', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, } }}>
                <Box sx={{
                    display: "flex",
                    borderRadius: '1px',
                    border: '1px solid grey',
                    width: '100%',
                    flexDirection: 'row'
                }}
                    variant='elevation' overflow='hidden'>
                    <TableContainer sx={{ maxHeight: 350, width: '100%' }}>
                        <Table size='small' stickyHeader aria-label="a dense able" padding={"none"}>
                            <TableHead sx={{ height: '40px' }} >
                                <TableRow size='small' >
                                    <TableCell align="center" sx={{ backgroundColor: 'lightgrey', fontWeight: 700, fontSize: 12, borderRight: '1px solid lightgrey' }}>Item</TableCell>
                                    <TableCell align="center" sx={{ backgroundColor: 'lightgrey', fontWeight: 700, fontSize: 12, borderRight: '1px solid lightgrey' }}>{setcount} month sales</TableCell>
                                    <TableCell align="center" sx={{ backgroundColor: 'lightgrey', fontWeight: 700, fontSize: 12, borderRight: '1px solid lightgrey' }}>Per day Average</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {value && value.map((val) => {
                                    return <TableRow key={val.IT_CODE}>
                                        <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.IT_CODE}</TableCell>
                                        <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.QNTY_TOT}</TableCell>
                                        <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.AVRG}</TableCell>
                                    </TableRow>
                                })}

                            </TableBody>

                            <TableHead>
                                <TableRow >
                                    {monthwise && monthwise.map((val, index) => (
                                        <TableCell key={index} align="center"
                                            sx={{
                                                fontWeight: 700,
                                                fontSize: 12,
                                                // borderBottom: '1px solid grey',
                                                borderRight: '1px solid lightgrey'


                                            }}>{val.month}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>

                </Box>
            </Box >
        </Fragment >)
}

export default SoledMedicinesDetails