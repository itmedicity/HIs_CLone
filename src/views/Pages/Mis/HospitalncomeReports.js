import { Paper, Box, Divider } from '@mui/material'
import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Style.css'
import ButtonCmp from '../../Components/ButtonCmp';
import { imageIcon } from '../../../assets/ImageExport';
import { useNavigate } from 'react-router-dom'

const HospitalncomeReports = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());

    const handleClick = () => {
        window.open('http://localhost:3000/TestCmp', '_blank');
    };

    const handleClose = () => {
        navigate("/Menu")
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
                                            selected={startDate}
                                            dateFormat="dd/MM/yyyy"
                                            // @ts-ignore
                                            onChange={(date) => setStartDate(date)}
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
                                    <td>Travancore Medical College & Hospital</td>
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

export default HospitalncomeReports