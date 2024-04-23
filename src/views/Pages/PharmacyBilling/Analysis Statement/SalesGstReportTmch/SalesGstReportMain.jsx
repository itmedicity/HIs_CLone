// @ts-nocheck
import {
    Box, Typography, Button
} from '@mui/material'

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import React, { Fragment, useState, useCallback, useEffect, memo, useMemo, useRef } from 'react'
import { ToastContainer } from 'react-toastify'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import moment from 'moment';
import { endOfMonth, startOfMonth } from 'date-fns'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { axiosinstance } from '../../../../../controllers/AxiosConfig'

import { AgGridReact } from 'ag-grid-react';
import { useNavigate } from 'react-router-dom';
import { warningNofity } from '../../../../../Constant/Constants';


const SalesGstReportMain = () => {
    const gridRef = useRef();
    const navigate = useNavigate();

    const [loading] = useState(true);

    const [selectedDate, ChangeDate] = useState(new Date());
    const [viewreport, setViewReport] = useState([])

    const startDate = startOfMonth(selectedDate);
    const endDate = endOfMonth(selectedDate)

    const postData2 = {
        from: moment(startDate).format('YYYY-MM-DD 00:00:00'),
        to: moment(endDate).format('YYYY-MM-DD 23:59:59')
    }

    // AG GRID CODES
    const ExportToExcel = useCallback(() => {
        gridRef.current.api.exportDataAsCsv();
    }, [])

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

    const [rowData, setRowData] = useState([]);
    // const [loading, setLoading] = useState(0);

    // Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState([
        { headerName: 'Item Name', field: "ITC_DESC", resizable: true },
        { headerName: 'mrp', field: "MRP" },
        { headerName: 'Actual mrp', field: "ACTMRP" },
        { headerName: 'original mrp', field: "ORIGINALMRP", type: 'rightAligned' },
        { headerName: 'cost rate', field: "PRATE", type: 'rightAligned' },
        { headerName: 'tax', field: "TXC_DESC", type: 'rightAligned' },
        { headerName: 'amount', field: "AMNT", type: 'rightAligned' },
        { headerName: 'loose qty', field: "LOOSE", type: 'rightAligned' },
        { headerName: 'qty', field: "QTY", type: 'rightAligned' },
        { headerName: 'discount', field: "DIS", type: 'rightAligned' },
    ]);


    //GET THE TSSH PATIENT LIST FROM THE MYSQL SERVER 
    const getPharmacyTsshSales = async () => {
        await axiosinstance.post('/admission/getIpNumberTsshGrouped', postData2).then(async (result) => {
            const { success, data } = result.data;

            if (success === 1) {
                const postDate = {
                    from: moment(startDate).format('DD/MM/YYYY 00:00:00'),
                    to: moment(endDate).format('DD/MM/YYYY 23:59:59'),
                    ptno: data?.map(e => e.ip_no)
                }

                await axiosinstance.post('/pharmacytax/tmchGstReport', postDate).then((result) => {
                    const { success, data } = result.data;
                    if (success === 1) {
                        setViewReport(data?.map((e) => {
                            return {
                                "ITC_DESC": e.ITC_DESC,
                                "MRP": e.MRP?.toLocaleString('en-US', { minimumFractionDigits: 4 }),
                                "ACTMRP": e.ACTMRP?.toLocaleString('en-US', { minimumFractionDigits: 4 }),
                                "ORIGINALMRP": e.ORIGINALMRP?.toLocaleString('en-US', { minimumFractionDigits: 4 }),
                                "PRATE": e.PRATE?.toLocaleString('en-US', { minimumFractionDigits: 4 }),
                                "TXC_DESC": e.TXC_DESC,
                                "AMNT": e.AMNT?.toLocaleString('en-US', { minimumFractionDigits: 4 }),
                                "LOOSE": e.LOOSE,
                                "QTY": e.QTY,
                                "DIS": e.DIS?.toLocaleString('en-US', { minimumFractionDigits: 4 }),
                            }
                        }))
                    } else {
                        warningNofity('No data to fetch')
                    }
                })

            }
        })
    }

    const handleClose = () => {
        navigate("/Menu/Mis")
    }

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
                                onClick={handleClose}
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
                                onClick={(e) => ExportToExcel(e)}
                            >
                                Export To Excel
                            </Button>
                        </Box>
                    </Box>

                    <Box sx={{
                        //backgroundColor: 'green'
                    }} >
                        <Box>
                            <Box sx={{
                                //backgroundColor: 'green'
                            }} >
                                <Box sx={{ display: 'flex', flex: 1, height: '100%', boxSizing: 'border-box' }}>
                                    <div className="ag-theme-alpine" style={{ minHeight: '570px', minWidth: '100%' }}>
                                        < AgGridReact
                                            ref={gridRef}
                                            columnDefs={colDefs}
                                            rowData={viewreport}
                                            defaultColDef={defaultColDef}
                                            rowHeight={rowHeight}
                                            headerHeight={headerHeight}
                                            rowDragManaged={true}
                                            animateRows={true}
                                            onGridReady={onGridReady}
                                            rowSelection="multiple"
                                            rowStyle={rowStyle}
                                            suppressColumnVirtualisation={true}
                                            suppressRowVirtualisation={true}
                                            suppressRowClickSelection={true}
                                            groupSelectsChildren={true}
                                            rowGroupPanelShow={'always'}
                                            pivotPanelShow={'always'}
                                            enableRangeSelection={true}
                                            overlayNoRowsTemplate={loading ? 'Please wait ... !!! Loading...' : 'No data available'}
                                        />
                                    </div>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

        </Fragment >
    )
}

export default memo(SalesGstReportMain) 