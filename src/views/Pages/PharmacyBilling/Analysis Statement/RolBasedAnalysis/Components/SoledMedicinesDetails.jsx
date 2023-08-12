import React, { Fragment, useState } from 'react'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
const SoledMedicinesDetails = ({ value, setcount, monthwise }) => {
    // console.log(value);
    // console.log(monthwise);
    return (
        <Fragment>
            <Box sx={{ display: "flex", flexDirection: 'column', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, } }}>
                <Box sx={{
                    display: "flex",
                    borderRadius: '1px',
                    border: '1px solid grey',
                    width: '100%',
                    flexDirection: 'row',
                }}
                    variant='elevation' overflow='hidden'>

                    <Box>
                        <TableContainer sx={{ maxHeight: 600 }} >
                            <Table size='small' stickyHeader aria-label="spanning table">
                                <TableHead>
                                    <TableRow >
                                        <TableCell rowSpan={2} sx={{ maxWidth: 100 }} >Item</TableCell>
                                        <TableCell colSpan={2} align="center">Total</TableCell>

                                        {monthwise && monthwise.map((val, index) => (
                                            <TableCell key={index} align="center" colSpan={2}>{val.month}</TableCell>
                                        ))}
                                    </TableRow>
                                    <TableRow>

                                        <TableCell align="center">{setcount} Month Sales</TableCell>
                                        <TableCell align="center">Avg/Day</TableCell>

                                        {
                                            monthwise?.map((val) => {
                                                return <TableCell colSpan={2} key={val.month}>
                                                    <Box >
                                                        <TableCell align="center">{val.Sale}</TableCell>
                                                        <TableCell align="center">{val.Average}</TableCell>
                                                    </Box>
                                                </TableCell>
                                            })
                                        }

                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {value && value.map((val) => {

                                        return <TableRow key={val.IT_CODE}>
                                            <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.ITC_DESC}</TableCell>
                                            <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.QNTY_TOT}</TableCell>
                                            <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.AVRG}</TableCell>
                                        </TableRow>
                                    })}
                                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>

                                        {

                                            monthwise && monthwise.map((val) => {

                                                return <TableRow key={val.month}>
                                                    {
                                                        val.data?.map((value) => {
                                                            return <TableRow colSpan={2} key={value.IT_CODE}>
                                                                <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey' }}>{value.QNTY_TOT}</TableCell>
                                                                <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey' }}>{value.AVRG}</TableCell>
                                                            </TableRow>
                                                        })
                                                    }
                                                </TableRow>
                                            })
                                        }

                                    </Box>
                                </TableBody>
                            </Table>

                        </TableContainer>

                    </Box>
                    {/* <Box>
                        <TableContainer sx={{ maxHeight: 600 }} >
                            <Table size='small' stickyHeader aria-label="spanning table">
                                <TableHead>
                                    <TableRow>
                                        {monthwise && monthwise.map((val, index) => (
                                            <TableCell key={index} align="center" colSpan={2}>{val.month}</TableCell>
                                        ))}
                                    </TableRow>
                                    <TableRow>
                                        {
                                            monthwise?.map((val, ind) => {
                                                return <TableCell key={ind}>
                                                    <Box >
                                                        <TableCell align="center">{val.Sale}</TableCell>
                                                        <TableCell align="center">{val.Average}</TableCell>
                                                    </Box>
                                                </TableCell>
                                            })
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {monthwise && monthwise.map((val) => {
                                        // console.log(val);
                                        return <TableRow key={val.month}>
                                            {
                                                val.data?.map((value) => {
                                                    //  console.log(val.data);
                                                    return <TableRow>

                                                        <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey' }}>{value.QNTY_TOT}</TableCell>
                                                        <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey' }}>{value.AVRG}</TableCell>
                                                    </TableRow>
                                                })
                                            }
                                        </TableRow>
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box> */}

                </Box>
            </Box >
        </Fragment >)
}

export default SoledMedicinesDetails