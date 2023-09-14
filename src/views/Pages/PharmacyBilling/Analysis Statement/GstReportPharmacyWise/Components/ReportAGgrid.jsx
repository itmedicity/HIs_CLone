import { AgGridReact } from 'ag-grid-react';
import React, { Fragment, useState, useMemo, useRef, useEffect } from 'react'
import { Box } from '@mui/material'

const ReportAGgrid = ({ reportData, valClick }) => {

    const gridRef = useRef();

    // const ExportToExcel = useCallback(() => {

    //     // gridRef.current.api.exportDataAsCsv();
    // }, [])

    useEffect(() => {
        if (valClick > 0) {
            gridRef.current.api.exportDataAsCsv();
        }
    }, [valClick])

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
        { headerName: 'Pharmacy Code', field: 'OUCODE', minWidth: 150, filter: 'agTextColumnFilter' },
        { headerName: "Item Code", field: 'CODE', minWidth: 100 },
        { headerName: "Bill No", field: 'BILL', minWidth: 100, filter: 'agTextColumnFilter' },
        { headerName: "Bill Date", field: 'BILLDATE', minWidth: 200, filter: 'agTextColumnFilter' },
        { headerName: "CACR", field: 'CACR', minWidth: 100 },
        { headerName: "Quantity", field: 'QTY', minWidth: 100 },
        { headerName: "Loose", field: 'LOOSE', minWidth: 80 },
        { headerName: "Purcahse Rate", field: 'PRATE', minWidth: 150 },
        { headerName: "MRP", field: 'MRP', minWidth: 100 },
        { headerName: "Actual MRP", field: 'ACTMRP', minWidth: 150 },
        { headerName: "Amount", field: 'AMT', minWidth: 110 },
        { headerName: "Discount", field: 'DIS', minWidth: 100 },
        { headerName: "Tax Code", field: 'TAXCODE', minWidth: 100 },
        { headerName: "Tax %", field: 'TAXPER', minWidth: 100 },
        { headerName: "Tax Amount", field: 'TAXAMT', minWidth: 120 },
        { headerName: 'Pharmacy', field: 'OUC_DESC', minWidth: 200, filter: 'agTextColumnFilter' },
        { headerName: "Item", field: 'ITC_DESC', minWidth: 200, filter: 'agTextColumnFilter' },
        { headerName: "Tax Description", field: 'TXC_DESC', minWidth: 150 },

    ]);
    return (

        <Fragment>
            <Box style={{ height: '100%', boxSizing: 'border-box' }}>
                <div className="ag-theme-alpine" style={{ height: '570px', minWidth: '100%' }}>
                    {/* <Suspense fallback={<LinearProgress />} > */}

                    < AgGridReact
                        ref={gridRef}
                        columnDefs={columnDefs}
                        rowData={reportData}
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
        </Fragment>
    )
}

export default ReportAGgrid