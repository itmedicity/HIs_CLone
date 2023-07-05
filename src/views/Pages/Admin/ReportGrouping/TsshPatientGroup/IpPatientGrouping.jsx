// @ts-nocheck
import { Box, Button, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'
import { getAdmissionList } from '../../../../../Redux-Slice/ipAdmissionInfo/AdmissionInfoSlice'
import TableRows from './TableRows'
import { axiosinstance } from '../../../../../controllers/AxiosConfig'
import { ToastContainer } from 'react-toastify'

const IpPatientGrouping = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(new Date());
    const [ipList, setIplist] = useState([]);
    const [ipListMysql, setIpListMysql] = useState([]);
    const [apiStatus, setApiStatus] = useState(false);

    const [cont, setCount] = useState(0);

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
            })
        }
        updateMysqlPatientList(getPostData)

    }, [value, cont])



    useEffect(() => {
        if (admissionList.status === true) {
            const oraAdmissionList = admissionList.data;

            // console.log(ipListMysql)
            // console.log(admissionList.data)
            const newPatientLst = oraAdmissionList?.map((e) => {
                const ipNoIsExcist = ipListMysql?.find(vl => vl.ip_no === e.IP_NO);
                if (ipNoIsExcist !== undefined) {
                    return { ...e, isTssh: 1 }
                } else {
                    return { ...e, isTssh: 0 }
                }
            })
            // console.log(newPatientLst)
            setIplist(newPatientLst)
            setApiStatus(false)
        } else {
            setApiStatus(false)
        }


    }, [admissionList, ipListMysql])

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
                    Patient Grouping
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
                        Admission Date :
                    </Box>
                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                        <DatePicker
                            // label="Controlled picker"
                            value={value}
                            onChange={(newValue) => setValue(newValue)}
                            disableFuture
                            disableHighlightToday={true}
                            slotProps={{ textField: { size: 'small' } }}
                        />
                    </LocalizationProvider>
                    <Button
                        variant='outlined'
                        sx={{ mx: 2 }}
                        onClick={getAdmissionListFun}
                    >Process</Button>
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