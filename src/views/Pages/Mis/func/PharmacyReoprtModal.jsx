// @ts-nocheck
import React, { memo, useCallback, useEffect } from 'react'
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import ReportHeader from '../../../Components/ReportHeader';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { format } from 'date-fns';

const PharmacyReoprtModal = ({ layout, setLayout, state, data, name }) => {
    const { pharma1, pharma2, pharma3, pharma4 } = data

    const totalAmountOne = pharma1?.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0);
    const totalAmounTwo = pharma4?.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0);

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
                    <ReportHeader data={state} name="Director Group Wise Sales" hosName={name} disable={true} />
                    <Box sx={{
                        overflow: 'auto',
                        paddingBottom: '15px',
                        borderBottom: 1,
                        marginBottom: 8,
                        height: 600
                    }} >
                        <TableContainer component={Box}  >
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
                                        <TableCell padding='none' variant='body' size='small' align="left" sx={{ width: '10%', fontWeight: 'bolder', fontSize: '12px', pl: 2 }}>BillNo#</TableCell>
                                        <TableCell padding='none' variant='body' size='small' align="left" sx={{ width: '10%', fontWeight: 'bolder', fontSize: '12px' }}>Bill Date</TableCell>
                                        <TableCell padding='none' variant='body' size='small' align="left" sx={{ width: '10%', fontWeight: 'bolder', fontSize: '12px', pr: 2 }}>PtNo#</TableCell>
                                        <TableCell padding='none' variant='body' size='small' align="left" sx={{ width: '25%', fontWeight: 'bolder', fontSize: '12px', pr: 2 }}>Patient Name</TableCell>
                                        <TableCell padding='none' variant='body' size='small' align="right" sx={{ width: '15%', fontWeight: 'bolder', fontSize: '12px', pr: 2 }}>Amount</TableCell>
                                        <TableCell padding='none' variant='body' size='small' align="right" sx={{ width: '15%', fontWeight: 'bolder', fontSize: '12px', pr: 2 }}>Tax</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow sx={{
                                        // backgroundColor: '#BBD8FF',
                                        height: '20px',
                                    }} >
                                        <TableCell align="right" sx={{ width: '2%', fontWeight: 'bolder', fontSize: '12px' }} ></TableCell>
                                        <TableCell align="left" colSpan={6} sx={{ fontWeight: 'bolder', fontSize: '12px', textTransform: 'capitalize' }} >
                                            Pharmacy Sale
                                        </TableCell>
                                    </TableRow>
                                    <TableRow sx={{
                                        backgroundColor: '#BBD8FF',
                                        height: '30px',
                                    }} >
                                        <TableCell align="right" sx={{ width: '2%', fontWeight: 'bolder', fontSize: '12px' }} ></TableCell>
                                        <TableCell align="left" colSpan={6} sx={{ fontWeight: 'bolder', fontSize: '12px', textTransform: 'capitalize' }} >
                                            Ip Consolidate
                                        </TableCell>
                                    </TableRow>
                                    {
                                        pharma4?.map((e, idx) => (
                                            <TableRow key={idx} >
                                                <TableCell align="right" sx={{ width: '2%', textAlign: 'center', alignItems: 'center' }} >{idx + 1}</TableCell>
                                                <TableCell align="left" sx={{ width: '10%', fontSize: '12px', textTransform: 'capitalize' }} >{e.DM_NO}</TableCell>
                                                <TableCell align="left" sx={{ width: '10%', fontSize: '12px' }} >{format(new Date(e.DMD_DATE), 'dd/MMM/yyyy')}</TableCell>
                                                <TableCell align="left" sx={{ width: '10%', fontSize: '12px', pr: 2 }} >{e.PT_NO}</TableCell>
                                                <TableCell align="left" sx={{ width: '25%', fontSize: '12px', pr: 2 }} >{e.PTC_PTNAME}</TableCell>
                                                <TableCell align="right" sx={{ width: '15%', fontSize: '12px', pr: 2 }} >{e.AMT?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                                                <TableCell align="right" sx={{ width: '15%', fontSize: '12px', pr: 2 }} >{e.TAX?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                    <TableRow sx={{
                                        backgroundColor: '#BBD8FF',
                                        height: '30px',
                                    }} >
                                        <TableCell align="right" sx={{ width: '2%', fontWeight: 'bolder', fontSize: '12px' }} ></TableCell>
                                        <TableCell align="left" colSpan={6} sx={{ fontWeight: 'bolder', fontSize: '12px', textTransform: 'capitalize' }} >
                                            Direct Billing
                                        </TableCell>
                                    </TableRow>
                                    {
                                        pharma1?.map((e, idx) => (
                                            <TableRow key={idx} >
                                                <TableCell align="right" sx={{ width: '2%', textAlign: 'center', alignItems: 'center' }} >{idx + 1}</TableCell>
                                                <TableCell align="left" sx={{ width: '10%', fontSize: '12px', textTransform: 'capitalize' }} >{e.BM_NO}</TableCell>
                                                <TableCell align="left" sx={{ width: '10%', fontSize: '12px' }} >{format(new Date(e.BMD_DATE), 'dd/MMM/yyyy')}</TableCell>
                                                <TableCell align="left" sx={{ width: '10%', fontSize: '12px', pr: 2 }} >{e.PT_NO}</TableCell>
                                                <TableCell align="left" sx={{ width: '25%', fontSize: '12px', pr: 2 }} >{e.PTC_PTNAME}</TableCell>
                                                <TableCell align="right" sx={{ width: '15%', fontSize: '12px', pr: 2 }} >{e.AMT?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                                                <TableCell align="right" sx={{ width: '15%', fontSize: '12px', pr: 2 }} >{e.TAX?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                                <TableFooter>
                                    <TableRow >
                                        <TableCell align="right" sx={{ width: '2%', textAlign: 'center', alignItems: 'center' }} ></TableCell>
                                        <TableCell align="left" sx={{ width: '10%', fontSize: '12px', textTransform: 'capitalize', color: 'black' }} >Total</TableCell>
                                        <TableCell align="left" sx={{ width: '10%', fontSize: '12px' }} ></TableCell>
                                        <TableCell align="left" sx={{ width: '10%', fontSize: '12px', pr: 2 }} ></TableCell>
                                        <TableCell align="left" sx={{ width: '25%', fontSize: '12px', pr: 2 }} ></TableCell>
                                        <TableCell align="right" sx={{ width: '15%', fontSize: '12px', pr: 2 }} >{(totalAmountOne + totalAmounTwo)?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                                        <TableCell align="right" sx={{ width: '15%', fontSize: '12px', pr: 2 }} ></TableCell>
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

export default memo(PharmacyReoprtModal)