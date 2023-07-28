import { Box, TextField, Typography, Button, FormControl, MenuItem, Select, Divider, LinearProgress, Paper, } from '@mui/material'
import React, { Fragment, useState, useCallback, useRef, useMemo, useEffect, memo, Suspense } from 'react'
import { ToastContainer } from 'react-toastify'
import OutletSelect from '../../Stock/CommonComponents/OutletSelect'
import { useNavigate } from 'react-router-dom'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import moment from 'moment';
import { getPharmacyTaxReport } from '../../../../../Redux-Slice/pharmacyBilling/pharmacyTaxSlice'
import { useDispatch } from 'react-redux';
import { endOfMonth, format, startOfMonth } from 'date-fns'
import { warningNofity } from '../../../../../Constant/Constants'


const GstReportPharmacyWise = () => {
    const navigate = useNavigate();
    const [pharmacy, setpharmacy] = useState(0)
    const [taxvalue, setTaxvalue] = useState(0)
    const [pay, setPay] = useState(0)
    const [allselect, setAllselect] = useState(true)
    const [viewDis, setViewDis] = useState(0)
    const [fromdate, setFromdate] = useState(moment(new Date()))
    const [purchase, setPurchase] = useState(0)
    const [mrp, setMrp] = useState(0)
    const [actualMrp, setActualMrp] = useState(0)
    const [amount, setAmount] = useState(0)
    const [viewreport, setViewReport] = useState([])
    const [disArray, setDisArray] = useState([])

    const dispatch = useDispatch();

    const ClearDetails = useCallback(() => {
        setpharmacy(0)
        setTaxvalue(0)
        setPay(0)
        setAllselect(true)
        setViewDis(0)
        setPurchase(0)
        setMrp(0)
        setActualMrp(0)
        setAmount(0)
        setViewReport([])
        setDisArray([])
    }, [])

    const [taxList] = useState([
        { id: 1, desc: "0%", num: 0 },
        { id: 2, desc: "5%", num: 5 },
        { id: 3, desc: "12%", num: 12 },
        { id: 4, desc: "18%", num: 18 },
        { id: 5, desc: "28%", num: 24 },
    ]);

    const [paytype] = useState([
        { id: 'I', desc: "In Patient", },
        { id: 'O', desc: "Others" },

    ]);

    var startDate = format(startOfMonth(new Date(fromdate)), 'dd-MM-yyyy')
    var endDate = format(endOfMonth(new Date(fromdate)), 'dd-MM-yyyy ')

    const CheckAllSelect = (e) => {
        if (e.target.checked === true) {
            setAllselect(true)
            setpharmacy(0)
        }
        else {
            setAllselect(false)
        }
    }

    const ChangeDate = (e) => {
        ClearDetails()
        setFromdate(e.target.value)
    }


    const rowHeight = 30
    const headerHeight = 30
    const defaultColDef = useMemo(() => {
        return {
            // sortable: true,
            resizable: true,
            flex: 1,
            minWidth: 100,
            // filter: true,
        };
    }, []);
    const onGridReady = (params) => {
        params.api.sizeColumnsToFit()
    }

    const rowStyle = {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    }

    const [columnDefs, setColumnDefs] = useState([
        { headerName: 'Pharmacy Code', field: 'OUCODE', minWidth: 150, filter: 'agTextColumnFilter', },
        { headerName: "Item Code", field: 'CODE', minWidth: 100 },
        { headerName: "Bill No", field: 'BILL', minWidth: 100 },
        { headerName: "Bill Date", field: 'BILLDATE', minWidth: 200, },
        { headerName: "CACR", field: 'CACR', minWidth: 100 },
        { headerName: "Quantity", field: 'QTY', minWidth: 100 },
        { headerName: "Loose", field: 'LOOSE', minWidth: 100 },
        { headerName: "Purcahse Rate", field: 'PRATE', minWidth: 150 },
        { headerName: "MRP", field: 'MRP', minWidth: 100 },
        { headerName: "Actual MRP", field: 'ACTMRP', minWidth: 150 },
        { headerName: "Amount", field: 'AMT', minWidth: 110 },
        { headerName: "Discount", field: 'DIS', minWidth: 100 },
        { headerName: "Tax Code", field: 'TAXCODE', minWidth: 100 },
        { headerName: "Tax %", field: 'TAXPER', minWidth: 100 },
        { headerName: "Tax Amount", field: 'TAXAMT', minWidth: 120 },
        { headerName: 'Pharmacy', field: 'OUC_DESC', minWidth: 200, filter: 'agTextColumnFilter' },
        { headerName: "Item", field: 'ITC_DESC', minWidth: 200 },
        { headerName: "Tax Description", field: 'TXC_DESC', minWidth: 150 },

    ]);

    useEffect(() => {
        if (disArray.length !== 0) {

            setViewDis(1)
            const newdata = disArray.map((val) => {
                const obj = {
                    OUCODE: val.OUCODE,
                    CODE: val.CODE,
                    BILL: val.BILL,
                    BILLDATE: moment(val.BILLDATE).format('YYYY-MM-DD HH:mm:ss'),
                    CACR: val.CACR,
                    QTY: val.QTY,
                    LOOSE: val.LOOSE,
                    PRATE: Math.floor(val.PRATE * 100) / 100,
                    MRP: Math.floor(val.MRP * 100) / 100,
                    ACTMRP: Math.floor(val.ACTMRP * 100) / 100,
                    AMT: Math.floor(val.AMT * 100) / 100,
                    DIS: val.DIS,
                    TAXCODE: val.TAXCODE,
                    TAXPER: val.TAXPER,
                    TAXAMT: Math.floor(val.TAXAMT * 100) / 100,
                    OUC_DESC: val.OUC_DESC,
                    ITC_DESC: val.ITC_DESC,
                    TXC_DESC: val.TXC_DESC,
                }
                return obj

            })
            setViewReport(newdata)


            const purtotal = disArray.map(val => val.PRATE).reduce((prev, next) => Number(prev) + Number(next))
            setPurchase(Math.floor(purtotal * 100) / 100)

            const mrptotal = disArray.map(val => val.MRP).reduce((prev, next) => Number(prev) + Number(next))
            setMrp(Math.floor(mrptotal * 100) / 100)

            const actmrptotal = disArray.map(val => val.ACTMRP).reduce((prev, next) => Number(prev) + Number(next))
            setActualMrp(Math.floor(actmrptotal * 100) / 100)

            const amounttotal = disArray.map(val => val.AMT).reduce((prev, next) => Number(prev) + Number(next))

            const taxamount = disArray.map(val => val.TAXAMT).reduce((prev, next) => Number(prev) + Number(next))

            const discount = disArray.map(val => val.DIS).reduce((prev, next) => Number(prev) + Number(next))

            const grossamount = amounttotal + taxamount + discount
            setAmount(Math.floor(amounttotal * 100) / 100)


        }

    }, [disArray.length !== 0])

    const ProcessDetails = useCallback(() => {

        const postdata = {
            from: startDate,
            to: endDate,
        }

        const processdata = async (postdata) => {

            const result = await dispatch(getPharmacyTaxReport(postdata))
            const dataset = result.payload
            if (dataset.success === 1) {
                const getarry = dataset.data
                if (allselect === true) {

                    if (taxvalue === 0 && pay === 0) {
                        const phrma = dataset.data
                        setDisArray(phrma)
                    }
                    else if (taxvalue !== 0 && pay === 0) {

                        const phrma = getarry.filter((val) => val.TAXPER === taxvalue)
                        setDisArray(phrma)
                    }
                    else if (taxvalue === 0 && pay !== 0) {
                        if (pay === 'I') {

                            const phrma = getarry.filter((val) => val.CACR === pay)
                            setDisArray(phrma)
                        }
                        else {
                            const phrma = getarry.filter((val) => val.CACR !== pay)
                            setDisArray(phrma)
                        }
                    }
                    else if (taxvalue !== 0 && pay !== 0) {
                        if (pay === 'I') {
                            const phrma = getarry.filter((val) => val.CACR === pay && val.TAXPER === taxvalue)
                            setDisArray(phrma)
                        }
                        else {
                            const phrma = getarry.filter((val) => val.CACR !== pay && val.TAXPER === taxvalue)
                            setDisArray(phrma)
                        }
                    }
                }
                else {
                    if (pharmacy !== 0 && taxvalue !== 0 && pay !== 0) {

                        if (pay === 'I') {
                            const phrma = getarry.filter((val) => val.OUCODE === pharmacy && val.TAXPER === taxvalue && val.CACR === pay)
                            setDisArray(phrma)
                        }
                        else {
                            const phrma = getarry.filter((val) => val.OUCODE === pharmacy && val.TAXPER === taxvalue && val.CACR !== pay)
                            setDisArray(phrma)
                        }
                    }
                    else if (pharmacy !== 0 && taxvalue === 0 && pay !== 0) {
                        if (pay === 'I') {
                            const phrma = getarry.filter((val) => val.OUCODE === pharmacy && val.CACR === pay)
                            setDisArray(phrma)
                        }
                        else {
                            const phrma = getarry.filter((val) => val.OUCODE === pharmacy && val.CACR !== pay)
                            setDisArray(phrma)
                        }
                    }
                    else if (pharmacy !== 0 && taxvalue !== 0 && pay === 0) {
                        if (pay === 'I') {
                            const phrma = getarry.filter((val) => val.OUCODE === pharmacy && val.TAXPER === taxvalue)
                            setDisArray(phrma)
                        }
                        else {
                            const phrma = getarry.filter((val) => val.OUCODE === pharmacy && val.TAXPER === taxvalue)
                            setDisArray(phrma)
                        }
                    }
                }
            }
            else {
                warningNofity("No Data Found");
            }
        }
        processdata(postdata)

    }, [startDate, endDate, dispatch, pay, disArray, pharmacy, taxvalue, allselect])

    const Closepage = useCallback(() => {
        navigate("/Menu/PharmacyBilling")

    }, [])

    const gridRef = useRef();

    const ExportToExcel = useCallback(() => {
        gridRef.current.api.exportDataAsCsv();
    }, [])


    return (
        <Fragment>
            <ToastContainer />

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
                                    // name="fromdate"
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
                        </Box>
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

                        </Box>

                    </Paper>

                    {/* agegrid */}
                    <Box sx={{ display: "flex", flexDirection: 'column', height: '570px' }}>
                        <Box style={{ height: '100%', boxSizing: 'border-box' }}>

                            <div className="ag-theme-alpine" style={{ height: '570px', minWidth: '100%' }}>
                                <Suspense fallback={<LinearProgress />} >
                                    {
                                        viewDis === 1 ? < AgGridReact
                                            ref={gridRef}
                                            columnDefs={columnDefs}
                                            rowData={viewreport}
                                            defaultColDef={defaultColDef}
                                            rowHeight={rowHeight}
                                            headerHeight={headerHeight}
                                            rowDragManaged={true}
                                            animateRows={true}
                                            onGridReady={onGridReady}
                                            rowSelection="multiple"
                                            rowStyle={rowStyle}
                                        /> : null
                                    }
                                </Suspense>
                            </div>
                        </Box>


                    </Box>
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
                                    onClick={ExportToExcel}
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