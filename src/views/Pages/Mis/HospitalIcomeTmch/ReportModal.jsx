// @ts-nocheck
import React, { memo } from 'react'
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import ReportHeader from '../../../Components/ReportHeader';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const ReportModal = ({ layout, setLayout, selectedDate }) => {
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
                    <ReportHeader data={selectedDate} />
                    <Box sx={{
                        overflow: 'auto',
                        paddingBottom: '15px'
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
                                        <TableCell align="left" colSpan={3} sx={{ fontWeight: 'bolder', fontSize: '12px', textTransform: 'capitalize' }} >Bed</TableCell>
                                    </TableRow>
                                    <TableRow >
                                        <TableCell align="right" sx={{ width: '2%', textAlign: 'center', alignItems: 'center' }} >1</TableCell>
                                        <TableCell align="left" sx={{ width: '25%', fontSize: '12px', textTransform: 'capitalize' }} >dsd</TableCell>
                                        <TableCell align="right" sx={{ width: '20%', fontSize: '12px' }} >d</TableCell>
                                        <TableCell align="right" sx={{ width: '20%', fontSize: '12px', pr: 2 }} >dddd</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Paper>
            </ModalDialog>
        </Modal>
    )
}

export default memo(ReportModal)