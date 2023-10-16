// @ts-nocheck
import React, { memo } from 'react'
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import ReportHeader from '../../../Components/ReportHeader';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';

const ReportModal = ({ layout, setLayout, state, data }) => {
    const { status, reportName, reportData } = data

    const dataArray = reportData?.map((e, idx) => {
        return {
            slno: idx + 1,
            name: e.PCC_DESC,
            tax: e.TAXAMT,
            amount: e.AMT
        }
    })

    const totalTax = dataArray.reduce((accumulator, currentValue) => accumulator + currentValue.tax, 0);
    const totalAmnt = dataArray.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);

    return (
        <Modal open={!!layout} onClose={() => setLayout(undefined)}>
            <ModalDialog
                aria-labelledby="layout-modal-title"
                aria-describedby="layout-modal-description"
                layout={layout}
                sx={{ backgroundColor: '#E1E1E1' }}
            >
                <ModalClose />
                <Typography id="layout-modal-description" textColor="text.tertiary">
                    This is a <code>{layout}</code> mode. Press <code>esc</code> to
                    close it.
                </Typography>
                <Paper
                    variant='outlined'
                    sx={{
                        border: 1,
                        borderRadius: 0,
                        borderColor: 'black',
                        boxShadow: 5
                    }}
                >
                    <ReportHeader data={state} name="Director Group Wise Sales" />
                    <Box sx={{
                        overflow: 'auto',
                        paddingBottom: '15px',
                        borderBottom: 1,
                        marginBottom: 8
                    }} >
                        <TableContainer component={Box}>
                            <Table padding='none' sx={{}} size="small" aria-label="a dense table" >
                                <TableHead sx={{
                                    backgroundColor: '#94C5F7'
                                }}
                                >
                                    <TableRow sx={{
                                        p: 0, m: 0,
                                        borderBottomColor: 'black',
                                        height: '30px',
                                    }} >
                                        <TableCell padding='none' variant='body' size='small' align="right" sx={{ width: '2%', fontWeight: 'bolder', fontSize: '12px' }} >#</TableCell>
                                        <TableCell padding='none' variant='body' size='small' align="left" sx={{ width: '25%', fontWeight: 'bolder', fontSize: '12px', pl: 2 }}>Procedure Category Name</TableCell>
                                        <TableCell padding='none' variant='body' size='small' align="right" sx={{ width: '20%', fontWeight: 'bolder', fontSize: '12px' }}>Tax</TableCell>
                                        <TableCell padding='none' variant='body' size='small' align="right" sx={{ width: '20%', fontWeight: 'bolder', fontSize: '12px', pr: 2 }}>Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow sx={{
                                        backgroundColor: '#BBD8FF',
                                        height: '30px',
                                    }} >
                                        <TableCell align="right" sx={{ width: '2%', fontWeight: 'bolder', fontSize: '12px' }} ></TableCell>
                                        <TableCell align="left" colSpan={3} sx={{ fontWeight: 'bolder', fontSize: '12px', textTransform: 'capitalize' }} >{reportName}</TableCell>
                                    </TableRow>
                                    {
                                        dataArray?.map((e, idx) => (
                                            <TableRow key={idx} >
                                                <TableCell align="right" sx={{ width: '2%', textAlign: 'center', alignItems: 'center' }} >{e.slno}</TableCell>
                                                <TableCell align="left" sx={{ width: '25%', fontSize: '12px', textTransform: 'capitalize' }} >
                                                    {e.name}
                                                </TableCell>
                                                <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} >
                                                    {e.tax?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                </TableCell>
                                                <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 2 }} >
                                                    {e.amount?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                                <TableFooter>
                                    <TableRow >
                                        <TableCell align="right" sx={{ width: '2%', textAlign: 'center', alignItems: 'center', fontWeight: 700 }} ></TableCell>
                                        <TableCell align="left" sx={{ width: '25%', fontSize: '12px', textTransform: 'capitalize', fontWeight: 700, color: 'black' }} >Total</TableCell>
                                        <TableCell align="right" sx={{ width: '20%', fontSize: '12px', fontWeight: 700, color: 'black' }} >
                                            {totalTax?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                        </TableCell>
                                        <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 2, fontWeight: 700, color: 'black' }} >
                                            {totalAmnt?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer>
                    </Box>
                </Paper>
            </ModalDialog>
        </Modal>
    )
}

export default memo(ReportModal)