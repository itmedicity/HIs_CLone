// @ts-nocheck
import {
    Box, TextField, Typography, Button, FormControl, MenuItem, Select, Divider, Paper, TableRow, TableCell,
    Table, TableBody, TableHead, TableContainer
} from '@mui/material'
import React, { Fragment, useState, useCallback, useEffect, memo, useMemo, useRef } from 'react'
import { ToastContainer } from 'react-toastify'
// import OutletSelect from '../../Stock/CommonComponents/OutletSelect'
// import { useNavigate } from 'react-router-dom'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { endOfMonth, startOfMonth } from 'date-fns'

// import { infoNofity } from '../../../../../Constant/Constants'
import { TableVirtuoso } from 'react-virtuoso'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { AgGridReact } from 'ag-grid-react';
import { axiosinstance } from '../../../../controllers/AxiosConfig';


const CollectionReportTssh = () => {

    //AG GRID TABLE PROPERTIES

    const gridRef = useRef();
    const [collection, setCollection] = useState(0)

    const ExportToExcel = useCallback(() => {
        gridRef.current.api.exportDataAsCsv();
    }, [])

    // useEffect(() => {
    //     if (valClick > 0) {
    //         gridRef.current.api.exportDataAsCsv();
    //     }
    // }, [valClick])

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

    // Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState([
        { field: "from" },
        { field: "to" },
        { field: "name" },
        { field: "amount", type: 'rightAligned' }
    ]);

    const [fromDate, ChangeFromDate] = useState(new Date());
    const [toDate, ChangeToDate] = useState(new Date());

    const frmDate = moment(fromDate).format('YYYY-MM-DD');
    const tDate = moment(toDate).format('YYYY-MM-DD')

    const getCollectionReports = useCallback(async () => {
        const postData = {
            from: frmDate,
            to: tDate
        }
        axiosinstance.post('/pharmacytax/collectionTmch', postData).then((result) => {
            const { success, data } = result.data;
            if (success === 1) {
                const newData = data?.map((e) => {
                    return {
                        from: frmDate,
                        to: tDate,
                        name: e.name,
                        amount: e.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })
                    }
                })
                setRowData(newData)
                setCollection(data.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0))
            }
        })
    }, [frmDate, tDate])

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
                            Collection Report - TMCH
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
                                onClick={(e) => ExportToExcel()}
                            >
                                Export To Excel
                            </Button>
                        </Box>

                        <Box sx={{ pl: 1, pt: 0.5 }}>
                            <Typography variant="body1"
                                defaultValue
                                style={{
                                    fontFamily: 'Arial',
                                }}>
                                Collection : {collection.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </Typography>
                        </Box>
                    </Box>

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

export default CollectionReportTssh