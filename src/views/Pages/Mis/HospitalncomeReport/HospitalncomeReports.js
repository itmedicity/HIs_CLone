import { Paper, Box, Divider } from '@mui/material'
import React, { memo, useCallback, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Style.css'
import ButtonCmp from '../../../Components/ButtonCmp';
import { imageIcon } from '../../../../assets/ImageExport';
import { useNavigate } from 'react-router-dom'
import moment from 'moment';

const HospitalncomeReports = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleClick = useCallback(() => {
        const postDate = {
            from: moment(startDate).format('DD/MM/YYYY 00:00:00'),
            to: moment(endDate).format('DD/MM/YYYY 23:59:59')
        }
        // @ts-ignore
        navigate('/Menu/income-reports', {
            state: {
                from: postDate.from,
                to: postDate.to,
            }
        })
    }, [startDate, endDate]);

    const handleClose = () => {
        navigate("/Menu/Mis")
    }

    return (
        <Paper sx={{ display: 'flex', flex: 1, justifyContent: 'center' }} square variant='outlined' >
            <Paper square
                sx={{
                    display: 'flex',
                    width: "650px",
                    marginTop: 3,
                    height: '247px',
                    flexDirection: 'column'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        fontSize: '13px',
                        backgroundColor: '#525252',
                        color: '#FFFFFF',
                        fontWeight: 'bold',
                        padding: '0px 10px 0px 10px',
                        height: '30px',
                        alignItems: 'center',
                        fontFamily: 'Arial,Tahoma,Verdana,sans-serif'
                    }}
                >Income Report</Box>
                <Box sx={{
                    display: 'flex',
                    flex: 1,
                    // backgroundColor: 'lightblue'
                }} >
                    <Box flex={1} sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // backgroundColor: 'lightcyan'
                    }} >
                        <table style={{ display: 'flex' }} >
                            <tbody>
                                <tr>
                                    <td className='tableTextfeild' >From Date</td>
                                    <td>:</td>
                                    <td>
                                        <DatePicker
                                            selected={startDate}
                                            dateFormat="dd/MM/yyyy"
                                            // @ts-ignore
                                            onChange={(date) => setStartDate(date)}
                                            className='datePicker'
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className='tableTextfeild'>To Date</td>
                                    <td>:</td>
                                    <td>
                                        <DatePicker
                                            selected={endDate}
                                            dateFormat="dd/MM/yyyy"
                                            // @ts-ignore
                                            onChange={(date) => setEndDate(date)}
                                            className='datePicker'
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td style={{
                                        display: 'flex',
                                        paddingTop: 10
                                    }} >
                                        <ButtonCmp name="Preview" style={{ mr: 1 }} onClick={handleClick} />
                                        <ButtonCmp name="Close" style={{}} onClick={handleClose} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Box>
                    <Box flex={1} sx={{ mt: 4 }} >
                        <table className='grdDetails' cellSpacing={0}  >
                            <tbody>
                                <tr className='grdHeader' >
                                    <td style={{ width: '3%', }}>
                                        <img src={imageIcon.checkBoxImage} alt='Check' />
                                    </td>
                                    <td>Clinic</td>
                                </tr>
                                <tr className='grdItemStyle' >
                                    <td>
                                        <img src={imageIcon.checkBoxImage} alt='Check' />
                                    </td>
                                    <td>Quilon Medical Trust (QMT)</td>
                                </tr>
                            </tbody>
                        </table>
                    </Box>
                </Box>
                <Divider />
                <Box sx={{ height: '30px' }} ></Box>
            </Paper>
        </Paper>
    )
}

export default memo(HospitalncomeReports) 