import React, { memo, useMemo } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import {
    getAdvanceCollection,
    getAdvanceRefund,
    getAdvanceSettled,
    getcollectionagainSaleTotal,
    getcollectionagainSaleDeduction,
    getcomplimentory,
    getcreditInsuranceBillCollection,
    getIpconsolidatedDiscount,
    getipPreviousDayDiscount,
    getunsettledAmount
} from '../../../Redux-Slice/incomeCollectionSlice/collectionSlice';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ReportHeader from '../../Components/ReportHeader';
import './Style.css'

const IncomeReports = () => {
    const dispatch = useDispatch();
    const { state } = useLocation();
    const componentState = useMemo(state => state, [state]);

    const data = useSelector((state) => state)

    // console.log(data)

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];

    useEffect(() => {
        console.log(state)
        if (state === null) {
            return
        } else {
            // @ts-ignore
            dispatch(getAdvanceCollection(state.date))
            // @ts-ignore
            dispatch(getAdvanceRefund(state.date))
            // @ts-ignore
            dispatch(getAdvanceSettled(state.date))
            // @ts-ignore
            dispatch(getcollectionagainSaleTotal(state.date))
            // @ts-ignore
            dispatch(getcollectionagainSaleDeduction(state.date))
            // @ts-ignore
            dispatch(getcomplimentory(state.date))
            // @ts-ignore
            dispatch(getcreditInsuranceBillCollection(state.date))
            // @ts-ignore
            dispatch(getIpconsolidatedDiscount(state.date))
            // @ts-ignore
            dispatch(getipPreviousDayDiscount(state.date))
            // @ts-ignore
            dispatch(getunsettledAmount(state.date))
        }
    }, [state])

    // const { state } = locationData;

    // console.log(locationData)

    return (
        <Box flex={1} sx={{ backgroundColor: 'lightgray', p: '1%' }} >
            <Paper square sx={{ borderColor: 'black', border: 1 }}  >
                <ReportHeader name="Hospital Income" data={state} />
                <Box sx={{
                    overflow: 'auto',
                    padding: '15px'
                }} >
                    {/* <table
                        className='tableHead'
                        rules='all'
                        cellSpacing={0}
                        border={0}
                    >
                        <tbody>
                            <tr className='trHead' >
                                <td align='right' style={{ width: '2%' }} >Sl#</td>
                                <td align='left' style={{ width: '25%' }} >Income Group</td>
                                <td align='right' style={{ width: '20%' }} >Collection/Settlement(Rs)</td>
                                <td align='right' style={{ width: '20%' }} >Net Amount(Rs)</td>
                                <td align='right' style={{ width: '20%' }} >Tax</td>
                                <td align='right' style={{ width: '20%' }} >Discount(Rs)</td>
                                <td align='right' style={{ width: '20%' }} >Gross Amount(Rs)</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td  ></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table> */}
                    <TableContainer component={Box}>
                        <Table padding='none' sx={{}} size="small" aria-label="a dense table" >
                            <TableHead sx={{
                                backgroundColor: '#94C5F7',
                            }}
                            >
                                <TableRow sx={{
                                    p: 0, m: 0,
                                    borderBottomColor: 'black'
                                }} >
                                    <TableCell padding='none' variant='body' size='small' align="right" sx={{ width: '2%', fontWeight: 'bolder', fontSize: '12px' }} >Sl#</TableCell>
                                    <TableCell padding='none' variant='body' size='small' align="left" sx={{ width: '25%', fontWeight: 'bolder', fontSize: '12px' }}>Income Group</TableCell>
                                    <TableCell padding='none' variant='body' size='small' align="right" sx={{ width: '20%', fontWeight: 'bolder', fontSize: '12px' }}>Collection/Settlement(Rs)</TableCell>
                                    <TableCell padding='none' variant='body' size='small' align="right" sx={{ width: '20%', fontWeight: 'bolder', fontSize: '12px' }}>Net Amount(Rs)</TableCell>
                                    <TableCell padding='none' variant='body' size='small' align="right" sx={{ width: '20%', fontWeight: 'bolder', fontSize: '12px' }}>Tax</TableCell>
                                    <TableCell padding='none' variant='body' size='small' align="right" sx={{ width: '20%', fontWeight: 'bolder', fontSize: '12px' }}>Discount(Rs)</TableCell>
                                    <TableCell padding='none' variant='body' size='small' align="right" sx={{ width: '20%', fontWeight: 'bolder', fontSize: '12px' }}>Gross Amount(Rs)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow sx={{
                                    backgroundColor: '#BBD8FF'
                                }} >
                                    <TableCell align="right" sx={{ width: '2%' }} ></TableCell>
                                    <TableCell align="left" colSpan={6} >Bed</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="right" sx={{ width: '2%' }} ></TableCell>
                                    <TableCell align="left" >Bed</TableCell>
                                    <TableCell align="left" >Bed</TableCell>
                                    <TableCell align="left" >Bed</TableCell>
                                    <TableCell align="left" >Bed</TableCell>
                                    <TableCell align="left" >Bed</TableCell>
                                    <TableCell align="left" >Bed</TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="right" sx={{ width: '2%' }} ></TableCell>
                                    <TableCell align="left" >Bed</TableCell>
                                    <TableCell align="left" >Bed</TableCell>
                                    <TableCell align="left" >Bed</TableCell>
                                    <TableCell align="left" >Bed</TableCell>
                                    <TableCell align="left" >Bed</TableCell>
                                    <TableCell align="left" >Bed</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

            </Paper>
        </Box>
    )
}

export default memo(IncomeReports) 