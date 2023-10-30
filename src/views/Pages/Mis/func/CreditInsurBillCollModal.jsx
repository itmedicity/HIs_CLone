// @ts-nocheck
import React, { memo, useCallback, useEffect } from 'react'
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import ReportHeader from '../../../Components/ReportHeader';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import { axiosinstance } from '../../../../controllers/AxiosConfig';
import { format } from 'date-fns';

const CreditInsurBillCollModal = ({ layout, setLayout, state, data }) => {
    const { data0, data1 } = data
    let newArray = data0?.concat(data1);
    const CASH = newArray?.reduce((accumulator, currentValue) => accumulator + currentValue.CASH, 0);
    const CHEQUE = newArray?.reduce((accumulator, currentValue) => accumulator + currentValue.CHEQUE, 0);
    const DD = newArray?.reduce((accumulator, currentValue) => accumulator + currentValue.DD, 0);
    const CARD = newArray?.reduce((accumulator, currentValue) => accumulator + currentValue.CARD, 0);
    const BANKAMT = newArray?.reduce((accumulator, currentValue) => accumulator + currentValue.BANKAMT, 0);
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
                    <ReportHeader data={state} name="Credit Collection" />
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
                                        <TableCell padding='none' variant='body' size='small' align="left" sx={{ width: '10%', fontWeight: 'bolder', fontSize: '12px', pl: 2 }}>Receipt No</TableCell>
                                        <TableCell padding='none' variant='body' size='small' align="left" sx={{ width: '10%', fontWeight: 'bolder', fontSize: '12px' }}>Cash</TableCell>
                                        <TableCell padding='none' variant='body' size='small' align="left" sx={{ width: '10%', fontWeight: 'bolder', fontSize: '12px', pr: 2 }}>Cheque</TableCell>
                                        <TableCell padding='none' variant='body' size='small' align="right" sx={{ width: '10%', fontWeight: 'bolder', fontSize: '12px', pr: 2 }}>DD</TableCell>
                                        <TableCell padding='none' variant='body' size='small' align="right" sx={{ width: '10%', fontWeight: 'bolder', fontSize: '12px', pr: 2 }}>Card</TableCell>
                                        <TableCell padding='none' variant='body' size='small' align="right" sx={{ width: '10%', fontWeight: 'bolder', fontSize: '12px', pr: 2 }}>Bank</TableCell>
                                        <TableCell padding='none' variant='body' size='small' align="right" sx={{ width: '15%', fontWeight: 'bolder', fontSize: '12px', pr: 2 }}>Bank Name</TableCell>
                                        <TableCell padding='none' variant='body' size='small' align="right" sx={{ width: '15%', fontWeight: 'bolder', fontSize: '12px', pr: 2 }}>Customer</TableCell>
                                        <TableCell padding='none' variant='body' size='small' align="right" sx={{ width: '15%', fontWeight: 'bolder', fontSize: '12px', pr: 2 }}>User</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        newArray?.map((e, idx) => (
                                            <TableRow key={idx} >
                                                <TableCell align="right" sx={{ width: '2%', textAlign: 'center', alignItems: 'center' }} >{idx + 1}</TableCell>
                                                <TableCell align="left" sx={{ width: '10%', fontSize: '12px', textTransform: 'capitalize' }} >{e.BILLNO}</TableCell>
                                                <TableCell align="left" sx={{ width: '10%', fontSize: '12px' }} >{e.CASH?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                                                <TableCell align="left" sx={{ width: '10%', fontSize: '12px', pr: 2 }} >{e.CHEQUE?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                                                <TableCell align="right" sx={{ width: '10%', fontSize: '12px', pr: 2 }} >{e.DD?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                                                <TableCell align="right" sx={{ width: '10%', fontSize: '12px', pr: 2 }} >{e.CARD?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                                                <TableCell align="right" sx={{ width: '10%', fontSize: '12px', pr: 2 }} >{e.BANKAMT?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                                                <TableCell align="right" sx={{ width: '15%', fontSize: '12px', pr: 2 }} >{e.BANK}</TableCell>
                                                <TableCell align="right" sx={{ width: '15%', fontSize: '12px', pr: 2 }} >{e.CUSTOMER}</TableCell>
                                                <TableCell align="right" sx={{ width: '15%', fontSize: '12px', pr: 2 }} >{e.USERNAME}</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                                <TableFooter>
                                    <TableRow >
                                        <TableCell align="right" sx={{ width: '2%', textAlign: 'center', alignItems: 'center', fontWeight: 700 }} ></TableCell>
                                        <TableCell align="left" sx={{ width: '10%', fontSize: '12px', textTransform: 'capitalize', fontWeight: 700, color: 'black' }} >Total</TableCell>
                                        <TableCell align="left" sx={{ width: '10%', fontSize: '12px', fontWeight: 700, color: 'black' }} >{CASH?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                                        <TableCell align="left" sx={{ width: '10%', fontSize: '12px', pr: 2, fontWeight: 700, color: 'black' }} >{CHEQUE?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                                        <TableCell align="right" sx={{ width: '10%', fontSize: '12px', pr: 2, fontWeight: 700, color: 'black' }} >{DD?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                                        <TableCell align="right" sx={{ width: '10%', fontSize: '12px', pr: 2, fontWeight: 700, color: 'black' }} >{CARD?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
                                        <TableCell align="right" sx={{ width: '10%', fontSize: '12px', pr: 2, fontWeight: 700, color: 'black' }} >{BANKAMT?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</TableCell>
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

export default memo(CreditInsurBillCollModal) 