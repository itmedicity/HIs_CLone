// @ts-nocheck
import { Box, Button, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { DatePicker, LocalizationProvider, clockClasses } from '@mui/x-date-pickers'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'
import { getAdmissionList } from '../../../../../Redux-Slice/ipAdmissionInfo/AdmissionInfoSlice'
import { axiosinstance } from '../../../../../controllers/AxiosConfig'
import { ToastContainer } from 'react-toastify'
import moment from 'moment/moment'
import { errorNofity, infoNofity, succesNofity, warningNofity } from '../../../../../Constant/Constants'
import { useNavigate } from 'react-router-dom'
import { Checkbox } from '@mui/joy'

const GroupedPatientList = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState(new Date());
    const [checked, setChecked] = useState(false)
    const [data, setData] = useState([])


    const getPatientList = useCallback(async () => {
        const postData = {
            date: moment(value).format('YYYY-MM-DD'),
            status: checked === true ? 0 : 1
        }

        const patientList = await axiosinstance.post("/admission/getGroupedPatientList", postData);
        const { success, data } = await patientList.data;
        if (success === 1) {
            setData(data)
        } else {
            warningNofity("NO DATA")
        }
    })

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
                    Patient List
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
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingX: 2 }} >
                        <Checkbox
                            checked={checked}
                            onChange={(e) => setChecked(e.target.checked)}
                            label="TSSH"
                        />
                    </Box>
                    <Button
                        variant='outlined'
                        sx={{ mx: 2 }}
                        onClick={getPatientList}
                    >Search</Button>
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
                        <Table size='small' stickyHeader >
                            <TableHead >
                                <TableRow>
                                    <TableCell variant='head' padding='checkbox' >slno</TableCell>
                                    <TableCell variant='head' padding='checkbox' >Date</TableCell>
                                    <TableCell variant='head' padding='checkbox' >Inpatient #</TableCell>
                                    <TableCell variant='head' padding='checkbox' >Outpatient #</TableCell>
                                    <TableCell variant='head' padding='checkbox' >Patient Name</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    data?.map((e, idx) => (
                                        <TableRow>
                                            <TableCell padding='checkbox' key={idx} >{idx + 1}</TableCell>
                                            <TableCell padding='checkbox' >{e.date}</TableCell>
                                            <TableCell padding='checkbox' >{e.ip_no}</TableCell>
                                            <TableCell padding='checkbox' >{e.op_no}</TableCell>
                                            <TableCell padding='checkbox' >{e.dis_status === 'N' ? "Admitted" : "Discharged"}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </Paper>
    )
}

export default memo(GroupedPatientList) 