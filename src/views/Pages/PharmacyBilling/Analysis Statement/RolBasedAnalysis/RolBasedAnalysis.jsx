
import { Box, Button, FormControl, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React, { Fragment, useState, useCallback, useRef, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import OutletSelect from '../../Stock/CommonComponents/OutletSelect'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addMonths, eachDayOfInterval, eachMonthOfInterval, endOfMonth, format, startOfMonth, subMonths, subYears } from 'date-fns'
import moment from 'moment';
import { getMonthlyIpVisitCount, getMonthlyOpVisitCount, getSoledMedicinesQnty } from '../../../../../Redux-Slice/pharmacyBilling/rolProcessSlice';
import { MonthSelect } from './Components/MonthSelect';
import CustomCircularProgress from '../../../../Components/CustomCircularProgress';
import { logDOM } from '@testing-library/react';
import SoledMedicinesDetails from './Components/SoledMedicinesDetails';
import { getLoggetInformation } from '../../../../../Redux-Slice/LoginSlice/LoginInfomration';
import { usergroupid } from '../../../../../HomeComponents/MenuRights/menuRights';



const RolBasedAnalysis = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [flag, setFlag] = useState(0)
    const [pharmacy, setpharmacy] = useState(0)
    const [fromdate, setFromdate] = useState(new Date())
    const [formonth, setFormonth] = useState(new Date())
    const [month, setMonth] = useState([])
    const [month1, setMonth1] = useState([])
    const [month2, setMonth2] = useState([])
    const [monthcount, setMonthcount] = useState(0)
    const [final, setFinal] = useState([])
    const [list, setList] = useState([])
    const [medlist, setMedlist] = useState([])
    const [loading, setLoading] = useState(false)
    const [monthwise, setMonthwise] = useState([])
    const [numberOfMonth] = useState([
        { no: 1 },
        { no: 2 },
        { no: 3 },
        { no: 4 },
        { no: 5 },
        { no: 6 },
        { no: 7 },
        { no: 8 },
        { no: 9 },
        { no: 10 },
        { no: 11 },
        { no: 12 },

    ]);

    const Closepage = useCallback(() => {
        navigate("/Menu/PharmacyBilling")
        setFlag(0)

    }, [flag])
    // const gridRef = useRef();

    // const ExportToExcel = useCallback(() => {
    //     gridRef.current.api.exportDataAsCsv();
    // }, [])


    const ChangeFromDate = (e) => {
        ClearDetails()
        setFromdate(e.target.value)
    }
    const ChangeForMonth = (e) => {
        setFormonth(e.target.value)

    }

    const ChangeMonthCount = (e) => {
        setMonthcount(e.target.value)

    }
    const ClearDetails = useCallback(() => {
        setFlag(0)
        setMonth([])
        setMonth1([])
        setMonth2([])
        setFinal([])
        setList([])
        setMedlist([])

    }, [])


    // const rolmonth = addMonths(new Date(), 1)

    // var startDate = format(startOfMonth(new Date(fromdate)), 'dd-MM-yyyy')
    // var endDate = format(endOfMonth(new Date(fromdate)), 'dd-MM-yyyy ')


    const prvyear2 = subYears(new Date(fromdate), 2)
    const prevmonth2 = subMonths(new Date(prvyear2), 3)
    const nextmonth2 = addMonths(new Date(prvyear2), 2)
    // const monthRange2 = eachMonthOfInterval({ start: new Date(prevmonth2), end: new Date(nextmonth2) });

    const from2 = new Date(prevmonth2)
    const to2 = endOfMonth(new Date(nextmonth2))

    const prvyear1 = subYears(new Date(fromdate), 1)
    const prevmonth1 = subMonths(new Date(prvyear1), 3)
    const nextmonth1 = addMonths(new Date(prvyear1), 2)
    // const monthRange1 = eachMonthOfInterval({ start: new Date(prevmonth1), end: new Date(nextmonth1) });
    const from1 = new Date(prevmonth1)
    const to1 = endOfMonth(new Date(nextmonth1))

    const prevmonth = subMonths(new Date(fromdate), 3)
    const nextmonth = addMonths(new Date(fromdate), 2)
    // const monthRange = eachMonthOfInterval({ start: new Date(prevmonth), end: new Date(nextmonth) });
    const from = new Date(prevmonth)
    const to = endOfMonth(new Date(nextmonth))


    const ProcessDetails = useCallback((e) => {
        ClearDetails()
        setLoading(true)
        const postdata = {
            from: moment(from).format('DD/MM/YYYY 00:00:00'),
            to: moment(to).format('DD/MM/YYYY 23:59:59')
        }
        const Processdata = async (postdata) => {
            const result = await dispatch(getMonthlyOpVisitCount(postdata))
            const opdata = result.payload.data

            const result1 = await dispatch(getMonthlyIpVisitCount(postdata))
            const ipdata = result1.payload.data

            const totalOpCount = opdata.map(val => val.COUNT).reduce((prev, next) => Number(prev) + Number(next))
            const totalIpCount = ipdata.map(val => val.COUNT).reduce((prev, next) => Number(prev) + Number(next))
            const opavrg = Math.floor(totalOpCount / 6)
            const ipavrg = Math.floor(totalIpCount / 6)
            const sumdata = opdata.map((val, index) => {
                const ip = ipdata.find((value) => val.MONTHS === value.MONTHS)
                return {
                    Total: val.COUNT + ip.COUNT
                }

            })
            const totval = sumdata.map(val => val.Total).reduce((prev, next) => Number(prev) + Number(next))
            const totavg = Math.floor(totval / 6)

            const newdata = opdata.map((val, index) => {
                const ip = ipdata.find((value) => val.MONTHS === value.MONTHS)
                return {
                    month: moment(new Date(val.MONTHS)).format('MMM-YYYY'),
                    OPCount: val.COUNT,
                    IPCount: ip.COUNT,
                    Total: val.COUNT + ip.COUNT,
                    InDcOp: val.COUNT >= opavrg ? 1 : 0,
                    InDcIp: ip.COUNT >= ipavrg ? 1 : 0,
                    InDcTotal: (val.COUNT + ip.COUNT) >= totavg ? 1 : 0
                }
            })
            setMonth(newdata);

        }
        Processdata(postdata)

        const postdata1 = {
            from: moment(from1).format('DD/MM/YYYY 00:00:00'),
            to: moment(to1).format('DD/MM/YYYY 23:59:59')
        }

        const Processdata1 = async (postdata1) => {
            const result = await dispatch(getMonthlyOpVisitCount(postdata1))
            const opdata = result.payload.data

            const result1 = await dispatch(getMonthlyIpVisitCount(postdata1))
            const ipdata = result1.payload.data

            const totalOpCount1 = opdata.map(val => val.COUNT).reduce((prev, next) => Number(prev) + Number(next))
            const totalIpCount1 = ipdata.map(val => val.COUNT).reduce((prev, next) => Number(prev) + Number(next))
            const opavrg1 = Math.floor(totalOpCount1 / 6)
            const ipavrg1 = Math.floor(totalIpCount1 / 6)


            const sumdata = opdata.map((val, index) => {
                const ip = ipdata.find((value) => val.MONTHS === value.MONTHS)
                return {
                    Total: val.COUNT + ip.COUNT
                }

            })
            const totval1 = sumdata.map(val => val.Total).reduce((prev, next) => Number(prev) + Number(next))
            const totavg1 = Math.floor(totval1 / 6)

            const newdata1 = opdata.map((val, index) => {
                const ip = ipdata.find((value) => val.MONTHS === value.MONTHS)
                return {
                    month: moment(new Date(val.MONTHS)).format('MMM-YYYY'),
                    OPCount: val.COUNT,
                    IPCount: ip.COUNT,
                    Total: val.COUNT + ip.COUNT,
                    InDcOp: val.COUNT >= opavrg1 ? 1 : 0,
                    InDcIp: ip.COUNT >= ipavrg1 ? 1 : 0,
                    InDcTotal: (val.COUNT + ip.COUNT) >= totavg1 ? 1 : 0
                }
            })

            setMonth1(newdata1);
        }
        Processdata1(postdata1)


        const postdata2 = {
            from: moment(from2).format('DD/MM/YYYY 00:00:00'),
            to: moment(to2).format('DD/MM/YYYY 23:59:59')
        }
        const Processdata2 = async (postdata2) => {
            const result = await dispatch(getMonthlyOpVisitCount(postdata2))
            const opdata = result.payload.data

            const result1 = await dispatch(getMonthlyIpVisitCount(postdata2))
            const ipdata = result1.payload.data

            const totalOpCount2 = opdata.map(val => val.COUNT).reduce((prev, next) => Number(prev) + Number(next))
            const totalIpCount2 = ipdata.map(val => val.COUNT).reduce((prev, next) => Number(prev) + Number(next))
            const opavrg2 = Math.floor(totalOpCount2 / 6)
            const ipavrg2 = Math.floor(totalIpCount2 / 6)

            const sumdata = opdata.map((val, index) => {
                const ip = ipdata.find((value) => val.MONTHS === value.MONTHS)
                return {
                    Total: val.COUNT + ip.COUNT
                }

            })
            const totval2 = sumdata.map(val => val.Total).reduce((prev, next) => Number(prev) + Number(next))
            const totavg2 = Math.floor(totval2 / 6)

            const newdata2 = opdata.map((val, index) => {
                const ip = ipdata.find((value) => val.MONTHS === value.MONTHS)

                return {
                    month: moment(new Date(val.MONTHS)).format('MMM-YYYY'),
                    OPCount: val.COUNT,
                    IPCount: ip.COUNT,
                    Total: val.COUNT + ip.COUNT,
                    InDcOp: val.COUNT >= opavrg2 ? 1 : 0,
                    InDcIp: ip.COUNT >= ipavrg2 ? 1 : 0,
                    InDcTotal: (val.COUNT + ip.COUNT) >= totavg2 ? 1 : 0
                }
            })
            setMonth2(newdata2);
        }
        Processdata2(postdata2)



        // const startDate = format(startOfMonth(new Date(firstmonth)), 'dd-MM-yyyy')
        // const endDate = format(endOfMonth(new Date(lastmonth)), 'dd-MM-yyyy')


        // const dateRange = monthList.map((val, index) => {
        //     return {
        //         startDate: format(startOfMonth(new Date(val)), 'dd-MM-yyyy'),
        //         endDate: format(endOfMonth(new Date(val)), 'dd-MM-yyyy')
        //     }
        // })


        const firstmonth = subMonths(new Date(formonth), monthcount)
        const lastmonth = subMonths(new Date(formonth), 1)
        const monthList = eachMonthOfInterval({ start: new Date(firstmonth), end: new Date(lastmonth) });
        const dateRange = monthList.map((val, index) => {
            return {
                month: moment(new Date(val)).format('MMM-YYYY')
            }
        })



        const postmed = {
            from: moment(startOfMonth(new Date(firstmonth))).format('DD/MM/YYYY 00:00:00'),
            to: moment(endOfMonth(new Date(lastmonth))).format('DD/MM/YYYY 23:59:59'),
            ouCode: pharmacy
        }


        const SoledMedicinesDetails = async () => {
            const result = await dispatch(getSoledMedicinesQnty(postmed))
            const meddata = result.payload.data

            const datas = meddata.map((val) => {
                const totqnt = (meddata?.filter(item => val.IT_CODE === item.IT_CODE).reduce((acc, curr) => acc + (curr.QTY), 0));
                return {
                    IT_CODE: val.IT_CODE,
                    qntyTot: totqnt
                }
            })
            let totqnty = datas.filter((ele, ind) => ind === datas.findIndex(elem => elem.IT_CODE === ele.IT_CODE))

            const oneDay = 24 * 60 * 60 * 1000;
            const diffDays = Math.round(Math.abs((startOfMonth(new Date(firstmonth))) - (endOfMonth(new Date(lastmonth)))) / oneDay);

            const viewdata = totqnty && totqnty.map((val) => {
                const obj = {
                    IT_CODE: val.IT_CODE,
                    QNTY_TOT: val.qntyTot,
                    AVRG: (val.qntyTot / diffDays).toFixed(2)
                }
                return obj
            })

            setList(viewdata)


            const datalist = dateRange.map((val, index) => {
                const newlist = meddata.filter((value) => moment(new Date(value.BMD_DATE)).format('MMM-YYYY') === val.month)
                return {
                    month: val.month,
                    data: newlist,
                }
            })

            setMonthwise(datalist)

        }
        SoledMedicinesDetails(postmed)

        setFlag(1)

    }, [dispatch, from, to, from1, to1, month, month1, month2, from2, to2, formonth, monthcount])



    useEffect(() => {

        if (month.length !== 0 && month1.length !== 0 && month2.length !== 0) {

            const obj = {
                count: 1,
                data: month
            }
            const obj1 = {
                count: 2,
                data: month1
            }
            const obj2 = {

                count: 3,
                data: month2
            }
            const newdatas = [...final, obj2, obj1, obj]
            setLoading(false)
            setFinal(newdatas);

        }



    }, [month.length !== 0, month1.length !== 0, month2.length !== 0])


    useEffect(() => {
        if (list.length !== 0) {
            const ob = {
                con: 1,
                data: list
            }

            const newdatass = [...medlist, ob]
            setLoading(false)
            setMedlist(newdatass)
        }

    }, [list.length !== 0])

    return (
        <Fragment>
            <ToastContainer />
            {loading && <CustomCircularProgress />}
            <Paper sx={{
                display: "flex",
                flexDirection: 'row',
                justifyContent: "center",
                width: "100%",
                pt: 1,
                px: 2,
                flexShrink: 3
            }}>
                <Paper sx={{
                    display: "flex",
                    flexDirection: 'column',
                    borderRadius: '1px',
                    border: '1px solid grey',
                    flex: 1,
                    height: '830px',
                }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: 'row',
                        justifyContent: 'left',
                        backgroundColor: '#525252',
                        fontWeight: 'bold',
                        textAlign: 'left',
                        height: '26px',
                        pl: 1,
                        pt: 1,
                    }}>
                        <Typography
                            variant="body1"
                            style={{
                                color: "whitesmoke",
                                fontSize: '13px',
                                fontFamily: 'Arial',
                                fontWeight: 'bold',
                            }} >
                            ROL Based Analysis
                        </Typography>
                    </Box>
                    <Paper sx={{ display: "flex", flexDirection: 'row', pt: 1, flex: 1 }}>
                        <Box sx={{ display: "flex", flexDirection: 'row', }}>
                            <Box sx={{ pl: 2, pr: 1, pt: 2 }}>
                                <Typography variant="body1"
                                    align='right'
                                    style={{
                                        fontFamily: 'Arial',
                                    }}>
                                    For :
                                </Typography>
                            </Box>
                            <Box sx={{ pt: 1 }}>
                                <TextField type='Month' size='small'
                                    style={{
                                        height: 10,
                                        paddingBottom: 1,
                                        width: 200,
                                        BorderAllRounded: 1,
                                        fontSize: '10px',
                                        fontFamily: 'Arial',
                                        borderRadius: '3px'
                                    }}
                                    // defaultValue={new Date()}
                                    value={formonth}
                                    name="formonth"
                                    onChange={(e) => ChangeForMonth(e)}
                                />
                            </Box>
                            <Box sx={{ pl: 2, pt: 2 }}>
                                <Typography variant="body1"
                                    align='right'
                                    style={{
                                        fontFamily: 'Arial',
                                    }}>
                                    From :
                                </Typography>
                            </Box>
                            <Box sx={{ pl: 1, pt: 1 }}>
                                <TextField type='Month' size='small'
                                    style={{
                                        height: 10,
                                        paddingBottom: 1,
                                        width: 200,
                                        BorderAllRounded: 1,
                                        fontSize: '10px',
                                        fontFamily: 'Arial',
                                        borderRadius: '3px'
                                    }}

                                    value={fromdate}
                                    name="fromdate"
                                    onChange={(e) => ChangeFromDate(e)}
                                />
                            </Box>

                            <Box sx={{ display: "flex", flexDirection: 'column', pl: 0.5 }}>
                                <Box sx={{ display: "flex", width: "100%", flexDirection: 'row' }}>

                                    <Box sx={{ display: "flex", flexDirection: 'row', pt: 1 }}>
                                        <FormControl fullWidth
                                            size='small'   >
                                            <Select
                                                variant='outlined'
                                                size="small"
                                                fullWidth
                                                align='center'
                                                style={{
                                                    height: 40,
                                                    paddingBottom: 1,
                                                    width: 160,
                                                    BorderAllRounded: 1,
                                                    fontSize: '15px',
                                                    fontFamily: 'Arial',
                                                    borderRadius: '3px'
                                                }}
                                                value={monthcount}
                                                onChange={(e) => ChangeMonthCount(e)}
                                            >
                                                <MenuItem disabled value={0}>--Month Count--</MenuItem>
                                                {
                                                    numberOfMonth?.map((val, index) => (
                                                        <MenuItem key={index} value={val.no}>
                                                            {val.no}
                                                        </MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box sx={{ pl: 0.5, pt: 1 }}>

                                        <OutletSelect
                                            value={pharmacy}
                                            setValue={setpharmacy} />

                                    </Box>
                                    <Box sx={{ pt: 1, pl: 0.5 }}>

                                        <Button variant="outlined"
                                            style={{
                                                height: 40,
                                                paddingBottom: 1,
                                                width: 200,
                                                BorderAllRounded: 1,
                                                fontSize: '13px',
                                                fontFamily: 'Arial',
                                                borderRadius: '3px',
                                                color: 'black'
                                            }}
                                            onClick={ProcessDetails}
                                        >
                                            Process
                                        </Button>
                                    </Box>
                                </Box>

                            </Box>
                        </Box>
                    </Paper>

                    <Box sx={{ display: "flex", flexDirection: 'column', height: '660px' }}>
                        <Box sx={{ display: "flex", flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'column', height: '450px' }}>
                            {flag === 1 ? <Box >
                                {final && final.map((val, index) => {
                                    return < Box key={index} sx={{ display: "flex", flexDirection: 'column' }}>
                                        <MonthSelect
                                            value={val.data}
                                        />
                                    </Box>

                                })

                                }

                                {medlist && medlist.map((val, index) => {
                                    return < Box key={index} sx={{ display: "flex", flexDirection: 'column' }}>
                                        <SoledMedicinesDetails
                                            value={val.data}
                                            setcount={monthcount}
                                            monthwise={monthwise}

                                        />
                                    </Box>

                                })
                                }
                                {/* <Box sx={{ display: "flex", flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'column' }}>

                                </Box> */}

                            </Box>
                                : null
                            }
                        </Box>


                        <Box sx={{ pt: 1 }}>

                        </Box>
                    </Box>
                    {/* <Box sx={{ display: "flex", flexDirection: 'column', height: '35px', pt: 2 }}>
                        <Divider flexItem sx={{ borderBlockColor: 'grey' }}></Divider>
                    </Box> */}
                    <Box sx={{ display: "flex", flex: 1, justifyContent: 'center' }}>
                        <Box sx={{ display: "flex", pt: 1.5 }}>
                            <Button variant="outlined"
                                style={{
                                    height: 40,
                                    width: 200,
                                    BorderAllRounded: 1,
                                    fontSize: '13px',
                                    fontFamily: 'Arial',
                                    borderRadius: '3px',
                                    color: 'black'
                                }}
                                onClick={Closepage}
                            >
                                Close
                            </Button>

                            {/* <Box sx={{ pl: 1 }}>
                                <Button variant="outlined"
                                    style={{
                                        height: 40,
                                        // paddingBottom: 1,
                                        width: 200,
                                        BorderAllRounded: 1,
                                        fontSize: '13px',
                                        fontFamily: 'Arial',
                                        borderRadius: '3px',
                                        color: 'black'
                                    }}
                                    onClick={ExportToExcel}
                                >
                                    Export To Excel
                                </Button>
                            </Box> */}
                        </Box>
                    </Box>
                </Paper>
            </Paper>
        </Fragment >
    )
}

export default RolBasedAnalysis