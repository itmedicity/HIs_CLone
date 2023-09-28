import {
    Box, TextField, Typography, Button, FormControl, MenuItem, Select, Divider, Paper
} from '@mui/material'
import React, { Fragment, useState, useCallback, useEffect, memo, useMemo } from 'react'
import { ToastContainer } from 'react-toastify'
import OutletSelect from '../../Stock/CommonComponents/OutletSelect'
import { useNavigate } from 'react-router-dom'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import moment from 'moment';
import {
    getGstTaxReportSelect,
    getGstTaxReportSelect2,
    getGstTaxReportSelect3,
    getPharmacyTaxReport,
    getPharmacyTaxReportIp,
    getPharmacyTaxReportIpReturn
} from '../../../../../Redux-Slice/pharmacyBilling/pharmacyTaxSlice'
import { useDispatch, useSelector } from 'react-redux';
import { endOfMonth, startOfMonth } from 'date-fns'
import CustomCircularProgress from '../../../../Components/CustomCircularProgress'
import { infoNofity } from '../../../../../Constant/Constants'
import VirtuosoTableReport from './Components/VirtuosoTableReport'
import { GstExcelExport } from './Components/GstExcelExport'

// import PharmacyReportTable from './Components/PharmacyReportTable'
// import ReportAGgrid from './Components/ReportAGgrid'
const GstReportPharmacyWise = () => {
    const navigate = useNavigate();
    const [pharmacy, setpharmacy] = useState(0)
    // const [taxvalue, setTaxvalue] = useState(0)
    const [pay, setPay] = useState(0)
    const [allselect, setAllselect] = useState(true)
    const [fromdate, setFromdate] = useState(moment(new Date()))
    // const [purchase, setPurchase] = useState(0)
    // const [mrp, setMrp] = useState(0)
    // const [actualMrp, setActualMrp] = useState(0)
    const [grossamount, setGrossAmount] = useState(0)
    const [viewreport, setViewReport] = useState([])
    const [disArray, setDisArray] = useState([])
    const [loading, setLoading] = useState(false)
    const [totamount, setTotAmount] = useState(0)
    const [totdisc, setTotdisc] = useState(0)
    const [tottax, setTottax] = useState(0)
    const [queryselect, setQueryselect] = useState(0)
    const [gstdata, setGstdata] = useState([])
    const [flag, setflag] = useState(0)
    const [valClick, setValClick] = useState(0)
    const [procesClick, setProcesClick] = useState(0)
    const dispatch = useDispatch();
    const fileName = "GST Report";
    const [check, setCheck] = useState(0)
    const [viewcheck, setViewcheck] = useState(0)

    // const [taxList] = useState([
    //     { id: 1, desc: "0%", num: 0 },
    //     { id: 2, desc: "5%", num: 5 },
    //     { id: 3, desc: "12%", num: 12 },
    //     { id: 4, desc: "18%", num: 18 },
    //     { id: 5, desc: "28%", num: 24 },
    // ]);

    const [paytype] = useState([
        { id: 'I', desc: "In Patient" },
        { id: 'O', desc: "Others" },

    ]);

    const [query] = useState([
        { id: 1, qname: "Query1" },
        { id: 2, qname: "Query2" },
        { id: 3, qname: "Query3" },

    ]);

    // var startDate = format(startOfMonth(new Date(fromdate)), 'dd/MM/yyyy')
    // var endDate = format(endOfMonth(new Date(fromdate)), 'dd/MM/yyyy')

    // var startDate = moment('03/01/2023').format('DD/MM/yyyy 00:00:00')
    // var endDate = moment('03/31/2023').format('DD/MM/yyyy 23:59:59')

    const Closepage = useCallback(() => {
        navigate("/Menu/PharmacyBilling")

    }, [])

    var startDate = moment(startOfMonth(new Date(fromdate))).format('DD/MM/yyyy 00:00:00')
    var endDate = moment(endOfMonth(new Date(fromdate))).format('DD/MM/yyyy 23:59:59')

    const postdata = useMemo(() => {
        return {
            from: startDate,
            to: endDate
        }
    }, [startDate, endDate])

    const reportdata1 = useSelector(getGstTaxReportSelect)
    const reportdata2 = useSelector(getGstTaxReportSelect2)
    const reportdata3 = useSelector(getGstTaxReportSelect3)

    const CheckAllSelect = (e) => {
        if (e.target.checked === true) {
            setAllselect(true)
            setpharmacy(0)
        }
        else {
            ResetData()
            setAllselect(false)
        }
    }
    const ResetData = useCallback(() => {
        setTotdisc(0)
        setTottax(0)
        setTotAmount(0)
        setGrossAmount(0)
        setflag(0)
        setLoading(false)
        setValClick(0)
        // setQueryselect(0)
        // setGstdata([])
        // setDisArray([])
        // setViewReport([])
        setProcesClick(0)
        setCheck(0)
        setViewcheck(0)
    }, [])

    const ChangeDate = (e) => {
        ResetData()
        setFromdate(e.target.value)

    }
    const ChangeQuery = (e) => {
        ResetData()
        setQueryselect(e.target.value)
    }


    const ViewasExcel = useCallback((e) => {
        GstExcelExport(viewreport, fileName)
    }, [viewreport])

    const ProcessDetails = useCallback(() => {

        if (queryselect === 0) {
            infoNofity("Select Query For Process")
        } else {

            setLoading(true)
            dispatch(getPharmacyTaxReport(postdata))
            dispatch(getPharmacyTaxReportIpReturn(postdata))
            dispatch(getPharmacyTaxReportIp(postdata))
            setProcesClick(1)
            setGstdata([])
            setDisArray([])
            setViewReport([])
        }
    }, [dispatch, postdata, queryselect])


    // useEffect(() => {
    //     if (ckeck === 1) {
    //         return () => {
    //             dispatch(getPharmacyTaxReport())
    //             dispatch(getPharmacyTaxReportIpReturn())
    //             dispatch(getPharmacyTaxReportIp())
    //         }
    //     }
    // }, [])

    useEffect(() => {
        //  if (gstdata.length === 0) {
        if (procesClick === 1) {
            if (queryselect === 1) {
                setGstdata(reportdata1)
                setCheck(1)
            }
            else if (queryselect === 2) {
                setGstdata(reportdata2)
                setCheck(1)
            }
            else if (queryselect === 3) {
                setGstdata(reportdata3)
                setCheck(1)

            } else {
                setGstdata([])
                setCheck(0)

            }
        } else {
            setGstdata([])
            setflag(0)
            setCheck(0)
        }
        // }

    }, [queryselect, reportdata1, reportdata2, reportdata3, procesClick])


    useEffect(() => {
        if (Object.keys(gstdata).length !== 0 && check === 1) {
            setViewcheck(1)
            // setDisArray(gstdata)
            if (allselect === true && pay === 0) {
                setDisArray(gstdata)
                // setLoading(false)
            }
            else if (allselect === true && pay !== 0) {
                if (pay === 'I') {
                    const phrma = gstdata.filter((val) => val.CACR === pay)
                    setDisArray(phrma)
                }
                else {
                    const phrma = gstdata.filter((val) => val.CACR !== pay)
                    setDisArray(phrma)
                }
            }
            else if (allselect === false && pharmacy !== 0 && pay !== 0) {
                if (pay === 'I') {
                    const phrma = gstdata.filter((val) => val.OUCODE === pharmacy && val.CACR === pay)
                    setDisArray(phrma)
                }
                else {
                    const phrma = gstdata.filter((val) => val.OUCODE === pharmacy && val.CACR !== pay)
                    setDisArray(phrma)
                }
            }
            else {
                const phrma = gstdata.filter((val) => val.OUCODE === pharmacy)
                setDisArray(phrma)

            }
        }
        else {
            setDisArray([])
            setflag(0)
            setViewcheck(0)
        }

    }, [gstdata, check, allselect, pay, pharmacy])

    useEffect(() => {
        if (Object.keys(disArray).length !== 0 && viewcheck === 1) {

            const newdata = disArray?.map((val) => {
                const obj = {
                    OUCODE: val.OUCODE,
                    OUC_DESC: val.OUC_DESC,
                    CODE: val.CODE,
                    ITC_DESC: val.ITC_DESC,
                    BILL: val.BILL,
                    BILLDATE: moment(val.BILLDATE).format('YYYY-MM-DD HH:mm:ss'),
                    CACR: val.CACR,
                    QTY: val.QTY,
                    LOOSE: val.LOOSE,
                    PRATE: Math.floor(val.PRATE * 100) / 100,
                    MRP: Math.floor(val.MRP * 100) / 100,
                    ACTMRP: Math.floor(val.ACTMRP * 100) / 100,
                    DIS: Math.floor(val.DIS * 100) / 100,
                    AMT: Math.floor(val.AMT * 100) / 100,
                    TAXAMT: Math.floor(val.TAXAMT * 100) / 100,
                    TAXCODE: val.TAXCODE,
                    TAXPER: val.TAXPER,
                    TXC_DESC: val.TXC_DESC,
                }
                return obj

            })
            setViewReport(newdata)
            setLoading(false)
            setflag(1)
            const amounttotal = disArray?.map(val => val.AMT).reduce((prev, next) => Number(prev) + Number(next))
            setTotAmount(Math.floor(amounttotal * 100) / 100)

            const taxamount = disArray?.map(val => val.TAXAMT).reduce((prev, next) => Number(prev) + Number(next))
            setTottax(Math.floor(taxamount * 100) / 100)

            const discount = disArray?.map(val => val.DIS).reduce((prev, next) => Number(prev) + Number(next))
            setTotdisc(Math.floor(discount * 100) / 100)

            const grossamount = amounttotal + taxamount + discount
            setGrossAmount(Math.floor(grossamount * 100) / 100)

        }
        else {
            setViewReport([])
            setflag(0)
            setViewcheck(0)
        }
    }, [disArray, viewcheck])








    // useEffect(() => {
    //     if (gstdata.length !== 0) {
    //         setLoading(false)
    //         setflag(1)
    //     } else {
    //         setflag(0)
    //     }
    // }, [gstdata])

    // else if (allselect === true && taxvalue !== 0 && pay === 0) {
    //     const phrma = gstdata.filter((val) => val.TAXPER === taxvalue)
    //     setDisArray(phrma)
    // }
    // else if (allselect === true && taxvalue !== 0 && pay !== 0) {
    //     if (pay === 'I') {
    //         const phrma = gstdata.filter((val) => val.CACR === pay && val.TAXPER === taxvalue)
    //         setDisArray(phrma)
    //     }
    //     else {
    //         const phrma = gstdata.filter((val) => val.CACR !== pay && val.TAXPER === taxvalue)
    //         setDisArray(phrma)
    //     }
    // }

    // checkbox false

    // else if (allselect === false && pharmacy !== 0 && taxvalue === 0 && pay !== 0) {
    //     if (pay === 'I') {
    //         const phrma = gstdata.filter((val) => val.OUCODE === pharmacy && val.CACR === pay)
    //         setDisArray(phrma)
    //     }
    //     else {
    //         const phrma = gstdata.filter((val) => val.OUCODE === pharmacy && val.CACR !== pay)
    //         setDisArray(phrma)
    //     }
    // }

    // if (flag === 0) {
    //     setLoading(true)
    // } else {
    //     setLoading(false)
    // }

    // const purtotal = disArray.map(val => val.PRATE).reduce((prev, next) => Number(prev) + Number(next))
    // setPurchase(Math.floor(purtotal * 100) / 100)

    // const mrptotal = disArray.map(val => val.MRP).reduce((prev, next) => Number(prev) + Number(next))
    // setMrp(Math.floor(mrptotal * 100) / 100)

    // const actmrptotal = disArray.map(val => val.ACTMRP).reduce((prev, next) => Number(prev) + Number(next))
    // setActualMrp(Math.floor(actmrptotal * 100) / 100)

    return (
        <Fragment>
            <ToastContainer />
            {loading && <CustomCircularProgress />}
            <Box sx={{
                display: "flex",
                flexDirection: 'row',
                justifyContent: "center",
                width: "100%",
                pt: 1.5,
                px: 2,
                flexShrink: 3
            }}>
                <Box sx={{
                    display: "flex",
                    flexDirection: 'column',
                    borderRadius: '1px',
                    border: '1px solid grey',
                    flex: 1,
                    height: '800px',

                }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: 'row',
                        justifyContent: 'left',
                        backgroundColor: '#525252',
                        fontWeight: 'bold',
                        textAlign: 'left',
                        height: '30px',
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
                            GST Report Tax % And Pharmacy Wise
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: 'row', flex: 1, pt: 1 }}>
                        <Box sx={{ display: "flex", flexDirection: 'row' }}>
                            <Box sx={{ pl: 3, pt: 1.5 }}>
                                <Typography variant="body1"
                                    defaultValue
                                    style={{
                                        fontFamily: 'Arial',
                                        width: 50
                                    }}>
                                    Date :
                                </Typography>
                            </Box>
                            <Box sx={{ pl: 1, pt: 0.5 }}>
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
                                    onChange={(e) => ChangeDate(e)}
                                />
                            </Box>
                        </Box>

                        <Box sx={{ display: "flex", flexDirection: 'row', pl: 2, pt: 1.5 }}>
                            <input type="checkbox"
                                background='white'
                                border='0.5px solid  #C4C4C4'
                                style={{
                                    width: '18px',
                                    height: '18px',
                                    color: 'black',

                                }}
                                value={allselect}
                                name="allselect"
                                checked={allselect}
                                onChange={(e) => CheckAllSelect(e)}
                            >
                            </input>
                            <Box>
                                <Typography variant="body1"
                                    align='right'
                                    style={{
                                        fontSize: '15px',
                                        fontFamily: 'Arial',
                                        pl: 1
                                    }}>
                                    All Select
                                </Typography>
                            </Box>

                        </Box>

                        <Box sx={{ pl: 1, pt: 0.5 }}>

                            <OutletSelect
                                value={pharmacy}
                                setValue={setpharmacy}
                                disabled={allselect === true ? true : false} />
                        </Box>

                        {/* tax */}
                        {/* <Box sx={{ display: "flex", flexDirection: 'row', pl: 1 }}>
                            <Box sx={{ pt: 0.7 }}>
                                <FormControl fullWidth
                                    size='small'   >
                                    <Select
                                        variant='outlined'
                                        size="small"
                                        fullWidth
                                        style={{
                                            height: 40,
                                            paddingBottom: 1,
                                            width: 130,
                                            BorderAllRounded: 1,
                                            fontSize: '15px',
                                            fontFamily: 'Arial',
                                            borderRadius: '3px'
                                        }}
                                        defaultValue={0}
                                        value={taxvalue}
                                        onChange={(e) => setTaxvalue(e.target.value)}
                                    >
                                        <MenuItem disabled value={0}>--Tax--</MenuItem>
                                        {
                                            taxList?.map((val, index) => (
                                                <MenuItem key={index} value={val.num}>
                                                    {val.desc}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box> */}
                        {/* pay type */}
                        <Box sx={{ display: "flex", flexDirection: 'row', pl: 1 }}>
                            <Box sx={{ pt: 0.7 }}>
                                <FormControl fullWidth
                                    size='small'   >
                                    <Select
                                        variant='outlined'
                                        size="small"
                                        fullWidth
                                        style={{
                                            height: 40,
                                            paddingBottom: 1,
                                            width: 150,
                                            BorderAllRounded: 1,
                                            fontSize: '15px',
                                            fontFamily: 'Arial',
                                            borderRadius: '3px'
                                        }}
                                        defaultValue={0}
                                        value={pay}
                                        onChange={(e) => setPay(e.target.value)}
                                    >
                                        <MenuItem disabled value={0}>--Pay Type--</MenuItem>
                                        {
                                            paytype?.map((val, index) => (
                                                <MenuItem key={index} value={val.id}>
                                                    {val.desc}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: 'row', pl: 1, pt: 0.7 }}>

                            <FormControl fullWidth
                                size='small'   >
                                <Select
                                    variant='outlined'
                                    size="small"
                                    fullWidth
                                    style={{
                                        height: 40,
                                        paddingBottom: 1,
                                        width: 150,
                                        BorderAllRounded: 1,
                                        fontSize: '15px',
                                        fontFamily: 'Arial',
                                        borderRadius: '3px'
                                    }}
                                    defaultValue={0}
                                    value={queryselect}
                                    onChange={(e) => ChangeQuery(e)}
                                >
                                    <MenuItem disabled value={0}>-Select Query-</MenuItem>
                                    {
                                        query?.map((val, index) => (
                                            <MenuItem key={index} value={val.id}>
                                                {val.qname}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>

                        </Box>

                        <Box sx={{ pl: 1, pt: 0.5 }}>
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
                    <Box sx={{ display: "flex", flexDirection: 'column', pt: 2 }}>
                        <Divider flexItem sx={{ borderBlockColor: 'grey' }}></Divider>
                    </Box>

                    <Paper sx={{ display: "flex", flexDirection: 'row', height: '75px', pt: 2, justifyContent: 'center' }}>

                        <Box sx={{}}>
                            <Typography
                                style={{

                                    fontSize: 20,
                                    fontFamily: "Calibri",
                                }}>
                                Net Amount :{totamount}
                            </Typography>

                        </Box>
                        <Box sx={{ pl: 5 }}>
                            <Typography style={{

                                fontSize: 20,
                                fontFamily: "Calibri",
                            }}>
                                Total Discount :{totdisc}
                            </Typography>

                        </Box>
                        <Box sx={{ pl: 5 }}>
                            <Typography style={{

                                fontSize: 20,
                                fontFamily: "Calibri",
                            }}>
                                Total Tax Amount:{tottax}
                            </Typography>

                        </Box>

                        <Box sx={{ pl: 5 }}>
                            <Typography
                                style={{
                                    fontSize: 20,
                                    fontFamily: "Calibri",
                                }}>
                                Gross Amount :{grossamount}
                            </Typography>

                        </Box>

                        {/* <Box sx={{}}>
                            <Typography
                                style={{

                                    fontSize: 20,
                                    fontFamily: "Calibri",
                                }}>
                                Grand Total Of Purchase Rate :{purchase}
                            </Typography>

                        </Box>
                        <Box sx={{ pl: 5 }}>
                            <Typography style={{

                                fontSize: 20,
                                fontFamily: "Calibri",
                            }}>
                                Grand Total of MRP :{mrp}
                            </Typography>

                        </Box>
                        <Box sx={{ pl: 5 }}>
                            <Typography style={{

                                fontSize: 20,
                                fontFamily: "Calibri",
                            }}>
                                Grand Total of Actual MRP :{actualMrp}
                            </Typography>

                        </Box>
                        <Box sx={{ pl: 5 }}>
                            <Typography
                                style={{
                                    fontSize: 20,
                                    fontFamily: "Calibri",
                                }}>
                                Grand Total of Amount :{amount}
                            </Typography>

                        </Box> */}

                    </Paper>

                    {/* Virtuoso Table */}

                    <Box sx={{ display: "flex", flexDirection: 'column', height: '620px' }}>
                        {flag === 1 ?
                            <VirtuosoTableReport
                                reportData={viewreport}
                                valClick={valClick} />
                            : null}
                    </Box>



                    {/* agegrid */}
                    {/* <Box sx={{ display: "flex", flexDirection: 'column', height: '620px' }}>
                        {flag === 1 ?
                            <ReportAGgrid
                                reportData={viewreport}
                                valClick={valClick}
                            />
                            : null}
                    </Box> */}



                    {/* Material Table */}

                    {/* <Box sx={{ display: "flex", flexDirection: 'column', height: '520px' }}>
                        {flag === 1 ?
                            <PharmacyReportTable
                                reportData={viewreport}
                            />
                            : null}
                    </Box> */}


                    <Box sx={{ display: "flex", flexDirection: 'column', height: '18px', pt: 1 }}>
                        <Divider flexItem sx={{ borderBlockColor: 'grey' }}></Divider>
                    </Box>
                    <Box sx={{ display: "flex", flex: 1, justifyContent: 'center' }}>
                        <Box sx={{ pb: 2, display: "flex" }}>
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
                                onClick={Closepage}
                            >
                                Close
                            </Button>

                            <Box sx={{ pl: 1 }}>
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
                                    onClick={(e) => ViewasExcel(e)}
                                >
                                    Export To Excel
                                </Button>


                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

        </Fragment >
    )
}

export default memo(GstReportPharmacyWise)