// @ts-nocheck
import { Paper, Box, Divider } from '@mui/material'
import React, { memo, useCallback, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Style.css'
import ButtonCmp from '../../../Components/ButtonCmp';
import { imageIcon } from '../../../../assets/ImageExport';
import { useNavigate } from 'react-router-dom'
import moment from 'moment';
import { axiosinstance } from '../../../../controllers/AxiosConfig';

const HospitalncomeReports = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleClick = useCallback(async () => {
        const postDate = {
            from: moment(startDate).format('DD/MM/YYYY 00:00:00'),
            to: moment(endDate).format('DD/MM/YYYY 23:59:59')
        }

        const postDataForMysql = {
            fromDate: moment(startDate).format('YYYY-MM-DD'),
            toDate: moment(endDate).format('YYYY-MM-DD')
        }

        const postData2 = {
            from: moment(startDate).format('YYYY-MM-DD 00:00:00'),
            to: moment(endDate).format('YYYY-MM-DD 23:59:59')
        }

        // await axiosinstance.post('/admission/getIpNumberTssh', postData2).then((result) => {
        //     const { success, data } = result.data;
        //     if (success === 1) {
        //         const ipNumber = data?.map((e) => e.ip_no)
        //         navigate('/Menu/income-reports-tssh', {
        //             state: {
        //                 from: postDate.from,
        //                 to: postDate.to,
        //                 ptno: ipNumber
        //             }
        //         })
        //     } else {
        //         navigate('/Menu/income-reports-tssh', {
        //             state: {
        //                 from: postDate.from,
        //                 to: postDate.to,
        //                 ptno: []
        //             }
        //         })
        //     }
        // })

        await axiosinstance.post('/admission/getIpNumberTmchGrouped', postData2).then((result) => {
            const { success, data } = result.data;
            if (success === 1) {
                const ipNumber = data?.map((e) => e.ip_no)
                const rmIpNumber = data?.filter((e) => e.tmch_status === '0').map(e => e.ip_no)

                console.log(data)

                //GET THE ORACLE RECEIPT     
                axiosinstance.post('/admission/getIpReceiptInfo', postDate).then((result2) => {
                    const { success, data } = result2.data;
                    if (success === 1) {
                        const ipReceiptData = data;
                        if (Object.values(ipReceiptData).length > 0) {

                            //FIND THE MINIMUM DATE (ADMISSION DATE TO THE CORRESPODING IP NUMBER)
                            let minDate = ipReceiptData.reduce((min, obj) => {
                                const currentDate = new Date(obj.ADMISSION);
                                return currentDate < min ? currentDate : min;
                            }, new Date(ipReceiptData[0].ADMISSION));

                            //GET THE IP NUMBER BASED ON RECEIPT
                            const post_data0 = {
                                from: moment(minDate).format('YYYY-MM-DD 00:00:00'),
                                to: moment(endDate).format('YYYY-MM-DD 23:59:59')
                            }
                            //GET THE DISCHARGED IP NUMBER LIST FROM MYSQL BASED ON MINIMUM DATE ( ADMISSION DATE)
                            axiosinstance.post('/admission/getIpDischargedPatientInfoGrouped', post_data0).then((result3) => {
                                const { success, data } = result3.data;
                                if (success === 1) {
                                    const newIpReceiptBased = data;
                                    if (Object.values(newIpReceiptBased).length > 0) {
                                        const array1 = newIpReceiptBased?.map(e => e.ip_no);
                                        const array2 = ipReceiptData?.map(e => e.IP_NO)

                                        const filtedArray = array1.filter(item => array2.includes(item))

                                        navigate('/Menu/income-reports-grouped', {
                                            state: {
                                                from: postDate.from,
                                                to: postDate.to,
                                                ptno: ipNumber,
                                                phar: rmIpNumber,
                                                ipNoColl: ipNumber?.concat(filtedArray),
                                                group: 0,
                                                groupIdForPrevious: 1
                                            }
                                        })
                                    } else {
                                        navigate('/Menu/income-reports-grouped', {
                                            state: {
                                                from: postDate.from,
                                                to: postDate.to,
                                                ptno: ipNumber,
                                                phar: rmIpNumber,
                                                ipNoColl: ipNumber,
                                                group: 0,
                                                groupIdForPrevious: 1
                                            }
                                        })
                                    }
                                } else {
                                    navigate('/Menu/income-reports-grouped', {
                                        state: {
                                            from: postDate.from,
                                            to: postDate.to,
                                            ptno: ipNumber,
                                            phar: rmIpNumber,
                                            ipNoColl: ipNumber,
                                            group: 0,
                                            groupIdForPrevious: 1
                                        }
                                    })
                                }

                            }).catch(() => {
                                navigate('/Menu/income-reports-grouped', {
                                    state: {
                                        from: postDate.from,
                                        to: postDate.to,
                                        ptno: ipNumber,
                                        phar: rmIpNumber,
                                        ipNoColl: ipNumber,
                                        group: 0,
                                        groupIdForPrevious: 1
                                    }
                                })
                            })

                        } else {
                            navigate('/Menu/income-reports-grouped', {
                                state: {
                                    from: postDate.from,
                                    to: postDate.to,
                                    ptno: ipNumber,
                                    phar: rmIpNumber,
                                    ipNoColl: ipNumber,
                                    group: 0,
                                    groupIdForPrevious: 1
                                }
                            })
                        }
                    } else {
                        navigate('/Menu/income-reports-grouped', {
                            state: {
                                from: postDate.from,
                                to: postDate.to,
                                ptno: ipNumber,
                                phar: rmIpNumber,
                                ipNoColl: ipNumber,
                                group: 0,
                                groupIdForPrevious: 1
                            }
                        })
                    }
                }).catch((e) => {
                    navigate('/Menu/income-reports-grouped', {
                        state: {
                            from: postDate.from,
                            to: postDate.to,
                            ptno: ipNumber,
                            phar: rmIpNumber,
                            ipNoColl: ipNumber,
                            group: 0,
                            groupIdForPrevious: 1
                        }
                    })
                })

                navigate('/Menu/income-reports-grouped', {
                    state: {
                        from: postDate.from,
                        to: postDate.to,
                        ptno: ipNumber,
                        phar: rmIpNumber,
                        ipNoColl: ipNumber,
                        group: 0,
                        groupIdForPrevious: 1
                    }
                })
            } else {
                navigate('/Menu/income-reports-grouped', {
                    state: {
                        from: postDate.from,
                        to: postDate.to,
                        ptno: [],
                        phar: [],
                        group: 0,
                        groupIdForPrevious: 1
                    }
                })
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
                >Income Report-Grouped</Box>
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
                                    <td>Travancore Super Speciality Hospital- (TSSH)</td>
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