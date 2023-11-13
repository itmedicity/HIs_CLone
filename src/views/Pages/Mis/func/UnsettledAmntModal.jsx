// @ts-nocheck
import React, { memo, useCallback, useEffect } from 'react'
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import ReportHeader from '../../../Components/ReportHeader';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';

const UnsettledAmntModal = ({ layout, setLayout, state, data, name }) => {

    const totalAmounTwo = data?.reduce((accumulator, currentValue) => accumulator + currentValue.AMT, 0);

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
                    <ReportHeader data={state} name="Unsettled Amount" hosName={name} disable={true} />
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
                                        <TableCell padding='none' variant='body' size='small' align="left" sx={{ width: '15%', fontWeight: 'bolder', fontSize: '12px', pl: 2 }}>Patient Name</TableCell>
                                        <TableCell padding='none' variant='body' size='small' align="left" sx={{ width: '10%', fontWeight: 'bolder', fontSize: '12px' }}>Pt No</TableCell>
                                        <TableCell padding='none' variant='body' size='small' align="left" sx={{ width: '15%', fontWeight: 'bolder', fontSize: '12px', pr: 2 }}>Bill No</TableCell>
                                        <TableCell padding='none' variant='body' size='small' align="right" sx={{ width: '15%', fontWeight: 'bolder', fontSize: '12px', pr: 2 }}>Tax</TableCell>
                                        <TableCell padding='none' variant='body' size='small' align="right" sx={{ width: '15%', fontWeight: 'bolder', fontSize: '12px', pr: 2 }}>Amount</TableCell>
                                        <TableCell padding='none' variant='body' size='small' align="left" sx={{ width: '15%', fontWeight: 'bolder', fontSize: '12px', pr: 2 }}>Customer</TableCell>
                                        <TableCell padding='none' variant='body' size='small' align="left" sx={{ width: '15%', fontWeight: 'bolder', fontSize: '12px', pr: 2 }}>Doctor</TableCell>
                                        <TableCell padding='none' variant='body' size='small' align="left" sx={{ width: '15%', fontWeight: 'bolder', fontSize: '12px', pr: 2 }}>Module</TableCell>
                                        <TableCell padding='none' variant='body' size='small' align="left" sx={{ width: '15%', fontWeight: 'bolder', fontSize: '12px', pr: 2 }}>User</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow sx={{
                                        // backgroundColor: '#BBD8FF',
                                        height: '20px',
                                    }} >
                                        <TableCell align="right" sx={{ width: '2%', fontWeight: 'bolder', fontSize: '12px' }} ></TableCell>
                                        <TableCell align="left" colSpan={9} sx={{ fontWeight: 'bolder', fontSize: '12px', textTransform: 'capitalize' }} >
                                            Billing
                                        </TableCell>
                                    </TableRow>
                                    {
                                        data?.map((e, idx) => (
                                            <TableRow key={idx} >
                                                <TableCell align="right" sx={{ width: '2%', textAlign: 'center', alignItems: 'center' }} >{idx + 1}</TableCell>
                                                <TableCell align="left" sx={{ width: '15%', fontSize: '12px', textTransform: 'capitalize' }} >{e.PTNAME}</TableCell>
                                                <TableCell align="left" sx={{ width: '10%', fontSize: '12px' }} >{e.PTNO}</TableCell>
                                                <TableCell align="left" sx={{ width: '15%', fontSize: '12px', pr: 2 }} >{e.BILLNO}</TableCell>
                                                <TableCell align="right" sx={{ width: '15%', fontSize: '12px', pr: 2 }} >{e.TAXAMT?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                                                <TableCell align="right" sx={{ width: '15%', fontSize: '12px', pr: 2 }} >{e.AMT?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                                                <TableCell align="left" sx={{ width: '15%', fontSize: '12px', pr: 2 }} >{e.CUSTOMER}</TableCell>
                                                <TableCell align="left" sx={{ width: '15%', fontSize: '12px', pr: 2 }} >{e.DOCNAME}</TableCell>
                                                <TableCell align="left" sx={{ width: '15%', fontSize: '12px', pr: 2 }} >{e.TYPE}</TableCell>
                                                <TableCell align="left" sx={{ width: '15%', fontSize: '12px', pr: 2 }} >{e.USERNAME}</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                                <TableFooter>
                                    <TableRow >
                                        <TableCell align="right" sx={{ width: '2%', textAlign: 'center', alignItems: 'center', fontWeight: 700 }} ></TableCell>
                                        <TableCell align="left" sx={{ width: '15%', fontSize: '12px', textTransform: 'capitalize', fontWeight: 700, color: 'black' }} >Total</TableCell>
                                        <TableCell align="right" sx={{ width: '10%', fontSize: '12px', fontWeight: 700, color: 'black' }} >
                                        </TableCell>
                                        <TableCell align="right" sx={{ width: '15%', fontSize: '12px', pr: 2, fontWeight: 700, color: 'black' }} ></TableCell>
                                        <TableCell align="right" sx={{ width: '15%', fontSize: '12px', pr: 2, fontWeight: 700, color: 'black' }} ></TableCell>
                                        <TableCell align="right" sx={{ width: '15%', fontSize: '12px', pr: 2, fontWeight: 700, color: 'black' }} >{totalAmounTwo?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                                        <TableCell align="right" sx={{ width: '15%', fontSize: '12px', pr: 2, fontWeight: 700, color: 'black' }} ></TableCell>
                                        <TableCell align="right" sx={{ width: '15%', fontSize: '12px', pr: 2, fontWeight: 700, color: 'black' }} ></TableCell>
                                        <TableCell align="right" sx={{ width: '15%', fontSize: '12px', pr: 2, fontWeight: 700, color: 'black' }} ></TableCell>
                                        <TableCell align="right" sx={{ width: '15%', fontSize: '12px', pr: 2, fontWeight: 700, color: 'black' }} ></TableCell>
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

export default memo(UnsettledAmntModal)