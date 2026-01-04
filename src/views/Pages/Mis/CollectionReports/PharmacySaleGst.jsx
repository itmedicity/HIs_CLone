// @ts-nocheck
import {
    Box, TextField, Typography, Button, FormControl, MenuItem, Select, Divider, Paper, TableRow, TableCell,
} from '@mui/material'
import React, { Fragment, useState, useCallback, useEffect, memo, useMemo, useRef } from 'react'
import { ToastContainer } from 'react-toastify'
// import OutletSelect from '../../Stock/CommonComponents/OutletSelect'
// import { useNavigate } from 'react-router-dom'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import moment from 'moment';

// import { infoNofity } from '../../../../../Constant/Constants'
import { TableVirtuoso } from 'react-virtuoso'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { AgGridReact } from 'ag-grid-react';
import { axiosinstance } from '../../../../controllers/AxiosConfig';
import { useNavigate } from 'react-router-dom';
const PharmacySaleGst = () => {

    //AG GRID TABLE PROPERTIES

    const gridRef = useRef();
    const navigate = useNavigate();

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
    const [loading, setLoading] = useState(0);

    // Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState([
        { headerName: 'From', field: "from" },
        { headerName: 'To', field: "to" },
        { headerName: 'IP', field: "ip" },
        { headerName: 'op 0%', field: "op0", type: 'rightAligned' },
        { headerName: 'op 5%', field: "op5", type: 'rightAligned' },
        { headerName: 'op 12%', field: "op12", type: 'rightAligned' },
        { headerName: 'op 18%', field: "op18", type: 'rightAligned' },
        { headerName: 'op 28%', field: "op28", type: 'rightAligned' },
        { headerName: 'Tax 5%', field: "tax5", type: 'rightAligned' },
        { headerName: 'Tax 12%', field: "tax12", type: 'rightAligned' },
        { headerName: 'Tax 18%', field: "tax18", type: 'rightAligned' },
        { headerName: 'Tax 28%', field: "tax28", type: 'rightAligned' },
    ]);

    const [fromDate, ChangeFromDate] = useState(new Date());
    const [toDate, ChangeToDate] = useState(new Date());

    const frmDate = moment(fromDate).format('YYYY-MM-DD');
    const tDate = moment(toDate).format('YYYY-MM-DD')

    const getCollectionReports = useCallback(async () => {
        setLoading(1)
        const postData = {
            from: frmDate,
            to: tDate
        }
        setTimeout(() => {
            axiosinstance.post('/pharmacytax/pharmacySaleGst', postData).then((result) => {
                const { success, data } = result.data;
                if (success === 1) {
                    const newData = data?.map((e) => {
                        return {
                            from: frmDate,
                            to: tDate,
                            ip: e.ip.toLocaleString('en-US', { minimumFractionDigits: 2 }),
                            op0: e.op0.toLocaleString('en-US', { minimumFractionDigits: 2 }),
                            op5: e.op5.toLocaleString('en-US', { minimumFractionDigits: 2 }),
                            op12: e.op12.toLocaleString('en-US', { minimumFractionDigits: 2 }),
                            op18: e.op18.toLocaleString('en-US', { minimumFractionDigits: 2 }),
                            op28: e.op28.toLocaleString('en-US', { minimumFractionDigits: 2 }),
                            tax5: e.tax5.toLocaleString('en-US', { minimumFractionDigits: 2 }),
                            tax12: e.tax12.toLocaleString('en-US', { minimumFractionDigits: 2 }),
                            tax18: e.tax18.toLocaleString('en-US', { minimumFractionDigits: 2 }),
                            tax28: e.tax28.toLocaleString('en-US', { minimumFractionDigits: 2 })
                        }
                    })
                    setRowData(newData)
                }
            })

            setLoading(0)
        }, "3000")
    }, [frmDate, tDate])


    const handleClose = () => {
        navigate("/Menu/Mis")
    }

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
                            Pharmacy Salse GST Reports
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
                                    From:
                                </Typography>
                            </Box>
                            <Box sx={{ pl: 1, pt: 0.5 }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        views={['day',]}
                                        slotProps={{ textField: { size: 'small' } }}
                                        value={fromDate}
                                        onChange={(e) => ChangeFromDate(e)}
                                    />
                                </LocalizationProvider>
                            </Box>
                        </Box>

                        <Box sx={{ display: "flex", flexDirection: 'row' }}>
                            <Box sx={{ pl: 3, pt: 1.5 }}>
                                <Typography variant="body1"
                                    defaultValue
                                    style={{
                                        fontFamily: 'Arial',
                                        width: 50
                                    }}>
                                    To :
                                </Typography>
                            </Box>
                            <Box sx={{ pl: 1, pt: 0.5 }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        views={['day',]}
                                        slotProps={{ textField: { size: 'small' } }}
                                        value={toDate}
                                        onChange={(e) => ChangeToDate(e)}
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
                                onClick={getCollectionReports}
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
                                onClick={(e) => ExportToExcel()}
                            >
                                Export To Excel
                            </Button>
                        </Box>
                    </Box>
                    {loading === 1 && <Box sx={{ color: 'blue', textAlign: 'center' }} >Loading....</Box>}
                    <Box sx={{
                        //backgroundColor: 'green'
                    }} >
                        <Box sx={{ display: 'flex', flex: 1, height: '100%', boxSizing: 'border-box' }}>
                            <div className="ag-theme-alpine" style={{ minHeight: '570px', minWidth: '100%' }}>
                                {/* <Suspense fallback={<LinearProgress />} > */}
                                < AgGridReact
                                    ref={gridRef}
                                    columnDefs={colDefs}
                                    rowData={rowData}
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
                                />
                                {/* </Suspense> */}
                            </div>
                        </Box>
                    </Box>
                </Box>
            </Box>

        </Fragment >
    )
}

export default PharmacySaleGst