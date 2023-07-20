
import { Box, Button, Divider, Table, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { Fragment, useState, useCallback, useRef } from 'react'
import { ToastContainer } from 'react-toastify'
import OutletSelect from '../../Stock/CommonComponents/OutletSelect'
import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useNavigate } from 'react-router-dom'

const RolBasedAnalysis = () => {
    const navigate = useNavigate();
    const [pharmacy, setpharmacy] = useState(0)

    const monthlist = [
        { id: 0, name: 'January' },
        { id: 1, name: 'February' },
        { id: 2, name: 'March' },
        { id: 3, name: 'April' },
        { id: 4, name: 'May' },
        { id: 5, name: 'June' }];

    const [rowData, setRowData] = useState();
    const onGridReady = useCallback((params) => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then((resp) => resp.json())
            .then((data) => setRowData(data));
    }, []);

    const [columnDefs, setColumnDefs] = useState([
        {
            field: 'athlete',
            rowSpan: params => params.data.country === 'Russia' ? 2 : 1,
            width: 200, filter: true,
        },
        { field: 'age', width: 100 },
        { field: 'country', filter: true },
        { field: 'year', width: 100 },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
    ]);

    const Closepage = useCallback(() => {
        navigate("/Menu/PharmacyBilling")

    }, [])
    const gridRef = useRef();

    const ExportToExcel = useCallback(() => {
        console.log("hii");
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
                pt: 1,
                px: 2
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
                        height: '26px',
                        pl: 1,
                        pt: 1,
                        flexShrink: 3
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
                    <Box sx={{ display: "flex", flexDirection: 'row', pt: 1, flex: 1 }}>
                        <Box sx={{ display: "flex", flexDirection: 'row', }}>
                            <Box sx={{ pl: 2, pr: 1, pt: 4 }}>
                                <Typography variant="body1"
                                    align='right'
                                    style={{
                                        fontSize: 'px',
                                        fontFamily: 'Arial',
                                    }}>
                                    From :
                                </Typography>
                            </Box>
                            <Box sx={{ pt: 3 }}>
                                <TextField type='Date' size='small'
                                    style={{
                                        height: 10,
                                        paddingBottom: 1,
                                        width: 200,
                                        BorderAllRounded: 1,
                                        fontSize: '10px',
                                        fontFamily: 'Arial',
                                        borderRadius: '3px'
                                    }}
                                // value={fromdate}
                                // onChange={(e) => FromDateChange(e)}
                                />
                            </Box>

                            <Box sx={{ pl: 3, pt: 4 }}>
                                <Typography variant="body1"
                                    align='right'
                                    style={{
                                        fontSize: 'px',
                                        fontFamily: 'Arial',
                                    }}>
                                    To :
                                </Typography>
                            </Box>
                            <Box sx={{ pl: 1.5, pt: 3 }}>
                                <TextField type='Date' size='small'
                                    style={{
                                        height: 10,
                                        paddingBottom: 1,
                                        width: 200,
                                        BorderAllRounded: 1,
                                        fontSize: '10px',
                                        fontFamily: 'Arial',
                                        borderRadius: '3px'
                                    }}
                                // value={fromdate}
                                // onChange={(e) => FromDateChange(e)}
                                />
                            </Box>

                            <Box sx={{ display: "flex", flexDirection: 'column', pl: 2 }}>
                                <Box sx={{ pl: 3 }}>
                                    <Typography variant="body1"
                                        align='left'
                                        style={{
                                            fontSize: 15,
                                            fontFamily: 'Arial',
                                        }}>
                                        Pharmacy Select
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", width: "100%", flexDirection: 'row', pl: 2 }}>

                                    <Box sx={{ display: "flex", flexDirection: 'row', pt: 1.5 }}>

                                        <input type="checkbox"
                                            background='white'
                                            border='0.5px solid  #C4C4C4'
                                            style={{
                                                width: '15px',
                                                height: '15px',
                                                color: 'black'
                                            }}
                                        // value={active}
                                        // name="active"
                                        // checked={active}
                                        // onChange={(e) => ChangeActive(e)}
                                        >
                                        </input>
                                        <Typography variant="body1"
                                            align='right'
                                            style={{
                                                fontSize: 'px',
                                                fontFamily: 'Arial',
                                                pl: 1
                                            }}>
                                            All Select
                                        </Typography>
                                    </Box>
                                    <Box sx={{ pl: 1, pt: 0.5 }}>

                                        <OutletSelect
                                            value={pharmacy}
                                            setValue={setpharmacy} />

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
                                        // onClick={ProcessDetails}
                                        >
                                            Process
                                        </Button>
                                    </Box>
                                </Box>

                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: 'column', height: '610px', pt: 1 }}>
                        <Box sx={{ display: "flex", flexDirection: 'column', height: '100px' }}>
                            <Box sx={{
                                display: "flex",
                                borderRadius: '1px',
                                border: '1px solid grey',
                                width: '100%'

                            }}
                                variant='elevation' overflow='hidden'>
                                <TableContainer
                                    sx={{
                                        maxHeight: 100,
                                        width: '100%'
                                    }}>
                                    <Table size="small" padding={"none"}>
                                        <TableHead >
                                            <TableRow>
                                                <TableCell size='small' align="center"
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        fontSize: 12,
                                                        borderRight: '1px solid lightgrey',
                                                        borderBottom: '1px solid grey',

                                                    }}>
                                                    Month
                                                </TableCell>
                                                {monthlist && monthlist.map((val, index) => (
                                                    <TableCell key={index} align="center"
                                                        sx={{
                                                            fontSize: 12,
                                                            borderBottom: '1px solid grey',
                                                            borderRight: '1px solid lightgrey',

                                                        }}>{val.name}</TableCell>
                                                ))}
                                            </TableRow>
                                            <TableRow>
                                                <TableCell size='small' align="center"
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        fontSize: 12,
                                                        borderBottom: '1px solid grey',
                                                        borderRight: '1px solid lightgrey',
                                                    }} >
                                                    OP
                                                </TableCell>
                                                <TableCell sx={{ borderBottom: '1px solid grey', borderRight: '1px solid lightgrey', width: 10 }}></TableCell>
                                                <TableCell sx={{ borderBottom: '1px solid grey', borderRight: '1px solid lightgrey', width: 10 }}></TableCell>
                                                <TableCell sx={{ borderBottom: '1px solid grey', borderRight: '1px solid lightgrey', width: 10 }}></TableCell>
                                                <TableCell sx={{ borderBottom: '1px solid grey', borderRight: '1px solid lightgrey', width: 10 }}></TableCell>
                                                <TableCell sx={{ borderBottom: '1px solid grey', borderRight: '1px solid lightgrey', width: 10 }}></TableCell>
                                                <TableCell sx={{ borderBottom: '1px solid grey', borderRight: '1px solid lightgrey', width: 10 }}></TableCell>

                                            </TableRow>

                                            <TableRow>
                                                <TableCell size='small' align="center"
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        fontSize: 12,
                                                        borderRight: '1px solid lightgrey',
                                                        width: 10
                                                    }} >
                                                    IP
                                                </TableCell>
                                                <TableCell sx={{ borderRight: '1px solid lightgrey' }}></TableCell>
                                                <TableCell sx={{ borderRight: '1px solid lightgrey' }}></TableCell>
                                                <TableCell sx={{ borderRight: '1px solid lightgrey' }}></TableCell>
                                                <TableCell sx={{ borderRight: '1px solid lightgrey' }}></TableCell>
                                                <TableCell sx={{ borderRight: '1px solid lightgrey' }}></TableCell>
                                                <TableCell sx={{ borderRight: '1px solid lightgrey' }}></TableCell>

                                            </TableRow>
                                        </TableHead>

                                    </Table>
                                </TableContainer>
                            </Box>

                        </Box>
                        {/* AgeGrid */}
                        <Box sx={{ pt: 4 }}>
                            <Box style={{ height: '100%', boxSizing: 'border-box' }}>
                                <div className="ag-theme-alpine" style={{ height: '520px', width: '100%' }}>
                                    <AgGridReact
                                        ref={gridRef}
                                        rowData={rowData}
                                        columnDefs={columnDefs}
                                        onGridReady={onGridReady}
                                    >
                                    </AgGridReact>
                                </div>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: 'column', height: '50px', pt: 2 }}>
                        <Divider flexItem sx={{ borderBlockColor: 'grey' }}></Divider>
                    </Box>
                    <Box sx={{ display: "flex", flex: 1, justifyContent: 'center' }}>
                        <Box sx={{ pb: 2, display: "flex", }}>
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

export default RolBasedAnalysis