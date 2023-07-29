
import { Box, Button, Divider, Paper, Table, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { Fragment, useState, useCallback, useRef } from 'react'
import { ToastContainer } from 'react-toastify'
import OutletSelect from '../../Stock/CommonComponents/OutletSelect'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { endOfMonth, format, previousDay, startOfMonth } from 'date-fns'
import moment from 'moment';
import { getMonthlyOpVisitCount } from '../../../../../Redux-Slice/pharmacyBilling/rolProcessSlice';

const RolBasedAnalysis = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [pharmacy, setpharmacy] = useState(0)
    const [fromdate, setFromdate] = useState(moment(new Date()))


    const monthlist = [
        { id: 1, name: 'January' },
        { id: 2, name: 'February' },
        { id: 3, name: 'March' },
        { id: 4, name: 'April' },
        { id: 5, name: 'May' },
        { id: 6, name: 'June' },
        { id: 7, name: 'July' },
        { id: 8, name: 'August' },
        { id: 9, name: 'September' },
        { id: 10, name: 'October' },
        { id: 11, name: 'November' },
        { id: 12, name: 'December' }
    ];

    const Closepage = useCallback(() => {
        navigate("/Menu/PharmacyBilling")

    }, [])
    const gridRef = useRef();

    const ExportToExcel = useCallback(() => {
        gridRef.current.api.exportDataAsCsv();
    }, [])


    const ChangeFromDate = (e) => {
        // ClearDetails()
        setFromdate(e.target.value)
    }

    var startDate = format(startOfMonth(new Date(fromdate)), 'dd-MM-yyyy')
    var endDate = format(endOfMonth(new Date(fromdate)), 'dd-MM-yyyy ')






    const ProcessDetails = useCallback(() => {

        // const [fromdate, setFromdate] = useState(moment(new Date()))

        // const dateRange = eachDayOfInterval({ start: new Date(startDate), end: new Date(endDate) });
        // // const dateRange = eachDayOfInterval({ start: new Date(startOfMonth(fromdate)), end: new Date(endOfMonth(fromdate)) });
        // console.log(dateRange);
        // const xx = new Date(dateRange)
        // console.log(new Date(dateRange), 'yyyy-MM-dd');


        // const dateAndDayFormat = dateRange.map((val) => {
        //     return { date_format: moment(val).format('YYYY-MM-DD') }
        // });

        // dateAndDayFormat && dateAndDayFormat.map((value) => {

        //     console.log(value.date_format);
        // })

        // console.log(dateAndDayFormat);
        // console.log(dateAndDayFormat[0].date_format);









        // const start = moment().startOf('month')
        // for (let i = 0; i <= 6; i++) {
        //     console.log(start.subtract(1, 'month').format('MMMM YYYY'))
        // }
        // const previousMonth = moment()
        //     .subtract(1, 'month')
        //     .startOf('month')
        //     .format('MMMM');

        // console.log(previousMonth);



        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var today = new Date();
        var d;
        var month;
        for (var i = 6; i > 0; i -= 1) {
            d = new Date(today.getFullYear, today.getMonth() - i, 1);
            month = monthNames[d.getMonth()];
            console.log(month);
        }



        // const postdata = {
        //     from: startDate,
        //     to: endDate,
        // }
        // const processdata = async (postdata) => {
        //     const result = await dispatch(getMonthlyOpVisitCount(postdata))
        //     const opdata = result.payload
        //     if (opdata.success === 2) {
        //         console.log(opdata);
        //     }
        // }
        // processdata(postdata)

    }, [])



    return (
        <Fragment>
            <ToastContainer />
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
                    <Box sx={{ display: "flex", flexDirection: 'row', pt: 1, flex: 1, pb: 2 }}>
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
                                // value={formonth}
                                // name="formonth"
                                // onChange={(e) => ChangeForMonth(e)}
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

                            <Box sx={{ display: "flex", flexDirection: 'column', pl: 1 }}>
                                <Box sx={{ display: "flex", width: "100%", flexDirection: 'row' }}>

                                    {/* <Box sx={{ display: "flex", flexDirection: 'row', pt: 1.5 }}>

                                        <input type="checkbox"
                                            background='white'
                                            border='0.5px solid  #C4C4C4'
                                            style={{
                                                width: '15px',
                                                height: '15px',
                                                color: 'black',

                                            }}
                                            value={active}
                                            name="active"
                                            checked={active}
                                            onChange={(e) => ChangeActive(e)}
                                        >
                                        </input>
                                        <Typography variant="body1"
                                            align='right'
                                            style={{
                                                fontSize: '15px',
                                                fontFamily: 'Arial',
                                                pl: 1
                                            }}>
                                            All Select
                                        </Typography>
                                    </Box> */}
                                    {/* <Box sx={{ pl: 1, pt: 0.5 }}>

                                        <OutletSelect
                                            value={pharmacy}
                                            setValue={setpharmacy} />

                                    </Box> */}
                                    <Box sx={{ pt: 1 }}>

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
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: 'column', height: '610px' }}>
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
                                                {/* {monthlist && monthlist.map((val, index) => (
                                                    <TableCell key={index} align="center"
                                                        sx={{
                                                            fontSize: 12,
                                                            borderBottom: '1px solid grey',
                                                            borderRight: '1px solid lightgrey',

                                                        }}>{val.name}</TableCell>
                                                ))} */}
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
                                                {/* <TableCell sx={{ borderBottom: '1px solid grey', borderRight: '1px solid lightgrey', width: 10 }}></TableCell>
                                                <TableCell sx={{ borderBottom: '1px solid grey', borderRight: '1px solid lightgrey', width: 10 }}></TableCell>
                                                <TableCell sx={{ borderBottom: '1px solid grey', borderRight: '1px solid lightgrey', width: 10 }}></TableCell>
                                                <TableCell sx={{ borderBottom: '1px solid grey', borderRight: '1px solid lightgrey', width: 10 }}></TableCell>
                                                <TableCell sx={{ borderBottom: '1px solid grey', borderRight: '1px solid lightgrey', width: 10 }}></TableCell>
                                                <TableCell sx={{ borderBottom: '1px solid grey', borderRight: '1px solid lightgrey', width: 10 }}></TableCell> */}

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
                                                {/* <TableCell sx={{ borderRight: '1px solid lightgrey' }}></TableCell>
                                                <TableCell sx={{ borderRight: '1px solid lightgrey' }}></TableCell>
                                                <TableCell sx={{ borderRight: '1px solid lightgrey' }}></TableCell>
                                                <TableCell sx={{ borderRight: '1px solid lightgrey' }}></TableCell>
                                                <TableCell sx={{ borderRight: '1px solid lightgrey' }}></TableCell>
                                                <TableCell sx={{ borderRight: '1px solid lightgrey' }}></TableCell> */}

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
                                    // ref={gridRef}
                                    // rowData={rowData}
                                    // columnDefs={columnDefs}
                                    // onGridReady={onGridReady}
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
                </Paper>
            </Paper>
        </Fragment >
    )
}

export default RolBasedAnalysis