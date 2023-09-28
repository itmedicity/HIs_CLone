import React from 'react'
import {
    Box, TableContainer, Table, TableBody, TableHead, TableCell, TableRow
} from '@mui/material'
import { Fragment } from 'react'

const PharmacyReportTable = ({ reportData }) => {
    // console.log(reportData);
    return (
        <Fragment>
            <Box sx={{ display: "flex" }} variant='elevation' overflow='hidden'>
                <TableContainer sx={{ maxHeight: 620, maxWidth: "100%" }}>
                    <Table size='small' stickyHeader aria-label="a dense table" padding={"none"}
                        style={{
                            border: "0.5px solid lightgrey", fontFamily: "Arial",
                            BorderAllRounded: '1px', opacity: 0.9

                        }}>
                        <TableHead sx={{ height: '40px' }}>
                            <TableRow size='small' sx={{
                                borderWidth: 1,
                                borderColor: 'grey',
                                borderStyle: 'solid',

                            }}>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', minWidth: 150 }}>Pharmacy Code</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', minWidth: 150 }}>Pharmacy</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', minWidth: 100 }}>Item Code</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', minWidth: 150 }}>Item</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', minWidth: 100 }}>Bill No</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', minWidth: 150 }}>Bill Date</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', minWidth: 100 }}>CACR</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', minWidth: 150 }}>Quantity</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', minWidth: 150 }}>Loose</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', minWidth: 150 }}>Purcahse Rate</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', minWidth: 150 }}>MRP</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', minWidth: 150 }}>Actual MRP</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', minWidth: 150 }}>Discount</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', minWidth: 150 }}>Tax Code</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', minWidth: 80 }}>Tax %"</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', minWidth: 150 }}>Tax Description</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', minWidth: 150 }}>Tax Amount</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', minWidth: 150 }}>Amount</TableCell>

                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {reportData?.map((val, index) => {
                                return <TableRow key={index}>
                                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.OUCODE}</TableCell>
                                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.OUC_DESC}</TableCell>
                                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.CODE}</TableCell>
                                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.ITC_DESC}</TableCell>
                                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.BILL}</TableCell>
                                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.BILLDATE}</TableCell>
                                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.CACR}</TableCell>
                                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.QTY}</TableCell>
                                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.LOOSE}</TableCell>
                                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.PRATE}</TableCell>
                                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.MRP}</TableCell>
                                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.ACTMRP}</TableCell>
                                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.DIS}</TableCell>
                                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.TAXCODE}</TableCell>
                                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.TAXPER}</TableCell>
                                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.TXC_DESC}</TableCell>
                                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.TAXAMT}</TableCell>
                                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.AMT}</TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Box>
        </Fragment>
    )
}

export default PharmacyReportTable