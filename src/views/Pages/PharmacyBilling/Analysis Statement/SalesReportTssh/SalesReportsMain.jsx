// @ts-nocheck
import {
    Box, TextField, Typography, Button, FormControl, MenuItem, Select, Divider, Paper, TableRow, TableCell,
    Table, TableBody, TableHead, TableContainer
} from '@mui/material'
import React, { Fragment, useState, useCallback, useEffect, memo, useMemo } from 'react'
import { ToastContainer } from 'react-toastify'
import OutletSelect from '../../Stock/CommonComponents/OutletSelect'
import { useNavigate } from 'react-router-dom'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { endOfMonth, startOfMonth } from 'date-fns'

import { infoNofity } from '../../../../../Constant/Constants'
import { TableVirtuoso } from 'react-virtuoso'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { axiosinstance } from '../../../../../controllers/AxiosConfig'
import { GstExcelExport } from '../GstReportPharmacyWise/Components/GstExcelExport'

const SalesReportsMain = () => {

    const [tableData, setTableData] = useState();
    const [selectedDate, ChangeDate] = useState(new Date());
    const [pharData, setPharData] = useState([])
    const [pharData1, setPharData1] = useState([])
    const [pharData2, setPharData2] = useState([])
    const [pharData3, setPharData3] = useState([])
    const [viewreport, setViewReport] = useState([])

    const startDate = startOfMonth(selectedDate);
    const endDate = endOfMonth(selectedDate)
    const fileName = "GST Report";

    const postData2 = {
        from: moment(startDate).format('YYYY-MM-DD 00:00:00'),
        to: moment(endDate).format('YYYY-MM-DD 23:59:59')
    }

    //GET THE TSSH PATIENT LIST FROM THE MYSQL SERVER 
    const getPharmacyTsshSales = async () => {
        await axiosinstance.post('/admission/getIpNumberTssh', postData2).then((result) => {
            const { success, data } = result.data;

            if (success === 1) {
                const postDate = {
                    from: moment(startDate).format('DD/MM/YYYY 00:00:00'),
                    to: moment(endDate).format('DD/MM/YYYY 23:59:59'),
                    ptno: data?.map(e => e.ip_no)
                }

                axiosinstance.post('/pharmacytax/tsshReportOne', postDate).then((result) => {
                    const { success, data } = result.data;
                    if (success === 1) {
                        setPharData([...pharData, ...data])
                    }
                })

                axiosinstance.post('/pharmacytax/tsshReportTwo', postDate).then((result) => {
                    const { success, data } = result.data;
                    if (success === 1) {
                        setPharData1([...pharData1, ...data])
                    }
                })

                axiosinstance.post('/pharmacytax/tsshReportThree', postDate).then((result) => {
                    const { success, data } = result.data;
                    if (success === 1) {
                        setPharData2([...pharData2, ...data])
                    }
                })

                axiosinstance.post('/pharmacytax/tsshReportFour', postDate).then((result) => {
                    const { success, data } = result.data;
                    if (success === 1) {
                        setPharData3([...pharData3, ...data])
                    }
                })
            }
        })
    }

    useEffect(() => {
        setTableData([...pharData, ...pharData1, ...pharData2, ...pharData3])
        setViewReport([...pharData, ...pharData1, ...pharData2, ...pharData3]?.map((e) => {
            return {
                "ITC_DESC": e.ITC_DESC,
                "MRP": e.MRP,
                "ACTMRP": e.ACTMRP,
                "ORIGINALMRP": e.ORIGINALMRP,
                "PRATE": e.PRATE,
                "TXC_DESC": e.TXC_DESC,
                "AMNT": e.AMNT,
                "LOOSE": e.LOOSE,
                "QTY": e.QTY
            }
        }))
    }, [pharData, pharData1, pharData2, pharData3])

    const TableComponents = {
        Scroller: React.forwardRef((props, ref) => <TableContainer component={Paper} {...props} ref={ref} />),
        Table: (props) => <Table {...props} style={{ borderCollapse: 'separate' }} />,
        TableHead: TableHead,
        TableRow: TableRow,
        TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
    }

    const ViewasExcel = useCallback((e) => {
        GstExcelExport(viewreport, fileName)
    }, [viewreport, tableData])

    console.log(tableData)

    //GET THE PHARMACY SALSES DETAULS
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

                    {/* TRANSACTION PORTION */}

                    <Box sx={{ display: "flex", flexDirection: 'row', pb: 0.5 }}>
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
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        views={['month', 'year']}
                                        slotProps={{ textField: { size: 'small' } }}
                                        value={selectedDate}
                                        onChange={(e) => ChangeDate(e)}
                                    />
                                </LocalizationProvider>


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
                                onClick={getPharmacyTsshSales}
                            >
                                Process
                            </Button>
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
                            // onClick={Closepage}
                            >
                                Close
                            </Button>
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
                                onClick={(e) => ViewasExcel(e)}
                            >
                                Export To Excel
                            </Button>
                        </Box>
                    </Box>

                    <Box sx={{
                        //backgroundColor: 'green'
                    }} >

                        <Box>
                            <TableVirtuoso
                                data={tableData}
                                style={{
                                    height: 500,
                                    display: 'flex',
                                    flex: 1,
                                }}
                                components={TableComponents}
                                fixedHeaderContent={(index, user) => (
                                    <TableRow>
                                        <TableCell style={{ background: 'white' }}>Item</TableCell>
                                        <TableCell style={{ background: 'white' }}>Mrp</TableCell>
                                        <TableCell style={{ background: 'white' }}>Actual Mrp</TableCell>
                                        <TableCell style={{ background: 'white' }}>Original Mrp</TableCell>
                                        <TableCell style={{ background: 'white' }}>Rate</TableCell>
                                        <TableCell style={{ background: 'white' }}>Tax</TableCell>
                                        <TableCell style={{ background: 'white' }}>Amount</TableCell>
                                        <TableCell style={{ background: 'white' }}>loose Qty</TableCell>
                                        <TableCell style={{ background: 'white' }}>Qty</TableCell>
                                    </TableRow>
                                )}
                                itemContent={(index, item) => (
                                    <>
                                        <TableCell style={{ background: 'white' }}>{item.ITC_DESC}</TableCell>
                                        <TableCell style={{ background: 'white' }}>{item.MRP}</TableCell>
                                        <TableCell style={{ background: 'white' }}>{item.ACTMRP}</TableCell>
                                        <TableCell style={{ background: 'white' }}>{item.ORIGINALMRP}</TableCell>
                                        <TableCell style={{ background: 'white' }}>{item.PRATE}</TableCell>
                                        <TableCell style={{ background: 'white' }}>{item.TXC_DESC}</TableCell>
                                        <TableCell style={{ background: 'white' }}>{item.AMNT}</TableCell>
                                        <TableCell style={{ background: 'white' }}>{item.LOOSE}</TableCell>
                                        <TableCell style={{ background: 'white' }}>{item.QTY}</TableCell>
                                    </>
                                )}

                            />

                        </Box>

                    </Box>
                </Box>
            </Box>

        </Fragment >
    )
}

export default SalesReportsMain