// @ts-nocheck
import { Box, Button, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { DatePicker, LocalizationProvider, clockClasses } from '@mui/x-date-pickers'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'
import { getAdmissionList } from '../../../../../Redux-Slice/ipAdmissionInfo/AdmissionInfoSlice'
import TableRows from './TableRows'
import { axiosinstance } from '../../../../../controllers/AxiosConfig'
import { ToastContainer } from 'react-toastify'
import moment from 'moment/moment'
import { errorNofity, infoNofity, succesNofity, warningNofity } from '../../../../../Constant/Constants'
import { useNavigate } from 'react-router-dom'

const IpPatientGrouping = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [value, setValue] = useState(new Date());
    const [ipList, setIplist] = useState([]);
    const [ipListMysql, setIpListMysql] = useState([]);
    const [apiStatus, setApiStatus] = useState(false);
    const [minDate, setMinDate] = useState(new Date());

    const [cont, setCount] = useState(0);
    const [lastDisUpdateDate, setLastDisUpdateDate] = useState('')

    // GET THE LAST UPDATED DATE AND SET THE DATE FEILD MIN DATE AS THE LAST DISCHAREGE UPDATED DATES
    useEffect(() => {
        const getLastDisUpdatedDate = async () => {
            await axiosinstance.get('/admission/getLastDischargeUpdatedDate').then((result) => {
                const { success, data } = result.data;
                if (success === 1) {
                    const lastDisUpdateDate = data[0]?.Last_dis_updateDate;
                    const date = new Date(lastDisUpdateDate);
                    setLastDisUpdateDate(lastDisUpdateDate)
                    setMinDate(date)
                }
            }).catch((e) => {
                errorNofity(e)
            })
        }
        getLastDisUpdatedDate()
    }, [])


    const getAdmissionListFun = useCallback(async () => {
        setApiStatus(true)
        const selectedDate = format(value, 'dd/MM/yyyy')
        const fromDate = `${selectedDate} 00:00:00`;
        const toDate = `${selectedDate} 23:59:59`;

        const postData = {
            from: fromDate,
            to: toDate
        }

        dispatch(getAdmissionList(postData))

        const dateForMysql = format(value, 'yyyy-MM-dd');
        const getPostData = {
            date: dateForMysql
        }

        await axiosinstance.post('/admission/getTsshPatientList', getPostData).then((result) => {
            // console.log(ele)
            const { success, data } = result.data;
            if (success === 1) {
                setIpListMysql(data)
            }
        }).catch((e) => {
            errorNofity(e)
        })

    }, [value])

    const state = useSelector((state) => state.admissionList)
    const admissionList = useMemo(() => state, [state])

    useEffect(() => {

        const dateForMysql = format(value, 'yyyy-MM-dd');
        const getPostData = {
            date: dateForMysql
        }
        const updateMysqlPatientList = async (getPostData) => {

            await axiosinstance.post('/admission/getTsshPatientList', getPostData).then((result) => {
                // console.log(ele)
                const { success, data } = result.data;
                if (success === 1) {
                    setIpListMysql(data)
                }
            }).catch((e) => {
                errorNofity(e)
            })
        }
        updateMysqlPatientList(getPostData)

    }, [value, cont])

    useEffect(() => {
        if (admissionList.status === true) {
            const oraAdmissionList = admissionList.data;

            const newPatientLst = oraAdmissionList?.map((e) => {
                const ipNoIsExcist = ipListMysql?.find(vl => vl.ip_no === e.IP_NO);
                if (ipNoIsExcist !== undefined) {
                    return { ...e, isTssh: ipNoIsExcist?.tmch_status === "0" ? 1 : 0 }
                } else {
                    return { ...e, isTssh: 2 }
                }

            }).filter(e => e.isTssh !== 1)
            // .filter((e) => (e.isTssh === 1 && e.tmch !== "0") || (e.isTssh === 0 && e.tmch !== "0"))
            setIplist(newPatientLst)
            setApiStatus(false)
        } else {
            setApiStatus(false)
        }


    }, [admissionList, ipListMysql])

    const dischargeProcess = useCallback(async () => {

        const selectedDate = format(value, 'dd/MM/yyyy')
        const fromDate = `${selectedDate} 00:00:00`;
        const toDate = `${selectedDate} 23:59:59`;
        /*****
         * GET THE LAST DICHARGE DATE
         * GET THE DISCHARGE DATE FROM ORACLE USING THE LAST DISCHARGE DATE
         * GET THE NOT DISCHARGED PATIENT FROM THE MYSQL DATABASE
         * FILTER THE DATE FROM ORALCE AND MYSQL DATA AND GE TSSH NOT DISCHARGED PATIENT ONLY
         * UPDATE THE DISCHARGED PATIENT LIST IN THE tssh_ipadmiss
         * UPDATE THE LAST UPDATED DATE
         */
        await axiosinstance.get('/admission/getLastDischargeUpdatedDate').then((result) => {
            const { success, data } = result.data;
            if (success === 1) {
                // console.log(data)
                // setIpListMysql(data)
                const lastDisUpdateDate = data[0]?.Last_dis_updateDate;
                const date = moment(lastDisUpdateDate).format('DD/MM/YYYY')
                const oracleFromDate = `${date} 00:00:00`;

                const postDateForGetDisPatient = {
                    from: oracleFromDate,
                    to: toDate
                }
                // GET THE DISCHARGED PATIENT FROM THE ORACLE
                axiosinstance.post('/admission/getDischargePtFromOracle', postDateForGetDisPatient).then((result) => {
                    const { success, data } = result.data;
                    if (success === 1) {
                        const dischargedPatientFromOra = data;
                        // GET THE NOT DISCHARGED PATIENT LIST FROM THE MYSQL 
                        axiosinstance.get('/admission/getAdmittedTsshPatient').then((result) => {
                            const { success, data } = result.data;
                            if (success === 1) {
                                const notDischargedPatient = data;
                                //  FILTER THE DATE FROM ORALCE AND MYSQL DATA AND GE TSSH NOT DISCHARGED PATIENT ONLY
                                const filterdPatientList = notDischargedPatient?.map((val) => dischargedPatientFromOra?.find((el) => el.IP_NO === val.ip_no))
                                    .filter((val) => val !== undefined)

                                if (filterdPatientList?.length === 0) {
                                    infoNofity("There Is No Patient For update Discharge")
                                } else {
                                    //UPDATE THE DISCHARGED PATIENT INTO THE MYSQL
                                    axiosinstance.post('/admission/updateDischargedPatient', filterdPatientList).then((result) => {
                                        const { success, message } = result.data;
                                        if (success === 1) {
                                            succesNofity(message)
                                            //UPDATE THE LAST UPDATED DATED
                                            /****
                                             * compare the selected date and the current date  
                                             * and update the lowest date in to the database
                                             * and set the selected date feild min date as the last updated date
                                             */
                                            const selectedFormDate = new Date(value);
                                            if (selectedFormDate <= new Date()) {
                                                const lastUpdatedDate = {
                                                    date: moment(selectedFormDate).format('YYYY-MM-DD h:m:')
                                                }
                                                axiosinstance.post('/admission/UpdateLastDischargeDates', lastUpdatedDate).then((result) => {
                                                    const { message, success } = result.data;
                                                    if (success === 1) {
                                                        succesNofity("Last Discharge Update Date Updated Successfully")
                                                    } else {
                                                        errorNofity("Error Updating the Last Update Date")
                                                    }
                                                }).catch((e) => {
                                                    errorNofity(e)
                                                })
                                            }
                                        } else {
                                            errorNofity(message)
                                        }
                                    }).catch((e) => {
                                        errorNofity(e)
                                    })
                                }
                            } else {
                                warningNofity("error Getting the Not Discahrged Patient OR Not Patient Data")
                            }
                        }).catch((e) => {
                            errorNofity(e)
                        })

                    } else {
                        errorNofity("Error Getting Patient Information From Ellider Software")
                    }
                }).catch((e) => {
                    errorNofity(e)
                })

            } else {
                warningNofity("Error Getting Discharge Updated Date")
            }
        }).catch((e) => {
            errorNofity(e)
        })

    }, [value])


    // console.log(ipList)

    return (
        <Paper
            variant="outlined"
            sx={{
                display: 'flex', flex: 1, flexDirection: 'column',
                mx: 10, my: 5,
                borderColor: '#525252'
            }}
        >
            <ToastContainer />
            <Box sx={{
                display: 'flex',
                backgroundColor: '#525252',
                height: 35,
                px: 2,
                fontSize: '12px',
                fontFamily: 'Arial',
                fontWeight: 'bold',
                borderTopRightRadius: '3px',
                borderTopLeftRadius: '3px',
                color: 'whitesmoke',
                // justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center'
            }} >
                <Box >
                    Patient Grouping -Tmch
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                    borderBottomLeftRadius: '3px',
                    borderBottomRightRadius: '3px'
                }}
            >
                <Paper
                    square
                    variant='outlined'
                    sx={{ display: 'flex', mx: 0, p: 0.5, justifyContent: 'center' }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            fontFamily: 'Arial',
                            fontSize: '13px',
                            fontWeight: 'bold',
                            color: '#525252',
                            pr: 2
                        }}
                    >
                        Date :
                    </Box>
                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                        <DatePicker
                            // label="Controlled picker"
                            value={value}
                            onChange={(newValue) => setValue(newValue)}
                            disableFuture
                            disableHighlightToday={true}
                            slotProps={{ textField: { size: 'small' } }}
                            // minDate={minDate}
                        />
                    </LocalizationProvider>
                    <Button
                        variant='outlined'
                        sx={{ mx: 2 }}
                        onClick={getAdmissionListFun}
                    >Get Admission</Button>
                    {/* <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            fontFamily: 'Arial',
                            fontSize: '13px',
                            fontWeight: 'bold',
                            color: '#525252',
                            px: 2
                        }}
                    >
                        Last Discharge update Time :
                    </Box> */}
                    {/* <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            fontFamily: 'Arial',
                            fontSize: '13px',
                            fontWeight: 'bold',
                            color: '#525252',
                            pr: 2
                        }}
                    >
                        {lastDisUpdateDate}
                    </Box> */}
                    {/* <Button
                        variant='outlined'
                        sx={{ mx: 2 }}
                        onClick={dischargeProcess}
                    >Discharge Process</Button> */}

                    <Button
                        variant='outlined'
                        sx={{ mx: 2 }}
                        onClick={() => navigate('/Menu/Admin')}
                    >Close</Button>
                </Paper>
                <Paper
                    square
                    variant='outlined'
                    sx={{
                        display: 'flex', flex: 1, mx: 0, borderBottomLeftRadius: '3px',
                        borderBottomRightRadius: '3px'
                    }}
                >
                    <TableContainer component={Paper} sx={{ maxHeight: 700 }}  >
                        {apiStatus && <LinearProgress />}
                        <Table size='small' stickyHeader >
                            <TableHead >
                                <TableRow>
                                    <TableCell variant='head' padding='checkbox' >slno</TableCell>
                                    <TableCell variant='head' padding='checkbox' >Date</TableCell>
                                    <TableCell variant='head' padding='checkbox' >Inpatient #</TableCell>
                                    <TableCell variant='head' padding='checkbox' >Outpatient #</TableCell>
                                    <TableCell variant='head' padding='checkbox' >Patient Name</TableCell>
                                    <TableCell variant='head' padding='checkbox' align='center' >action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ipList?.map((val, idx) => <TableRows key={idx} data={val} n={idx} setCount={setCount} />)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </Paper>
    )
}

export default memo(IpPatientGrouping) 