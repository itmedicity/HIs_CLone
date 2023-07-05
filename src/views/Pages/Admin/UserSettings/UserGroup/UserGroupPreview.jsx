import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material'
import React, { Fragment, useCallback, useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import pdf_icon from '../../../../Images/pdf_icon.jpg'
import excel_icon from '../../../../Images/excel_icon.jpg'
import close_icon from '../../../../Images/close_icon.png'
import moment from 'moment';
import Divider from '@mui/material/Divider';
import { pdfgroup } from './UserGroupComponents/PDFUserGroup'
import { ExcelExportGroup } from './UserGroupComponents/ExcelUserGroup'


export const UserGroupPreview = ({ view, preview, setFlag, ClearData }) => {
    const [user, setUser] = useState("DSOFT");
    const todaydate = moment(new Date()).format('DD/MM/YYYY')
    const printdate = moment(new Date()).format('DD/MM/YYYY HH:mm:ss')
    const fileName = "User Group Details";

    const Viewaspdf = useCallback((e) => {
        pdfgroup(view)
    }, [])

    const ViewasExcel = useCallback((e) => {
        ExcelExportGroup(preview, fileName)

    }, [])

    const ClosePreview = useCallback((e) => {
        setFlag(0)
        ClearData();
    }, [])

    useEffect(() => {
        const userLogedInfm = localStorage.getItem("usrCred");
        if (userLogedInfm !== null) {
            let userName = JSON.parse(userLogedInfm).name;
            setUser(userName)
        } else {
            setUser('')
        }
    }, [setUser])

    return (
        <Fragment>
            <ToastContainer />
            <Box sx={{
                display: "flex", flexDirection: 'column',
                width: "100%",
                justifyContent: 'right',
                backgroundColor: "#E1E1E1",
                pl: 3,
                pr: 6,
                pt: 2,
            }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: 'right',
                    height: '35px',
                    pb: 2

                }}>
                    <Box sx={{
                        display: "flex",
                        width: "15%",
                        height: "100%",
                        alignItems: "center",
                        justifyContent: 'left',
                        alignContent: 'left',
                        alignItems: "left",
                        border: '1px solid lightgrey',
                        backgroundColor: 'white',
                        borderRadius: '5px',
                        opacity: 0.6

                    }}>
                        <Tooltip title="PDF">
                            <IconButton
                                onClick={(e) => Viewaspdf(e)}
                            >
                                <img src={pdf_icon} width="40" height="35" />
                            </IconButton>
                        </Tooltip>
                        <Box sx={{ py: 1.5 }}
                        >
                            <Typography style={{
                                fontSize: '12px',
                                fontFamily: "Calibri",
                                color: '#121213',
                            }}>PDF
                            </Typography>
                        </Box>
                        <Tooltip title="Excel">
                            <IconButton
                                onClick={(e) => ViewasExcel(e)}
                            >
                                <img src={excel_icon} width="25" height="20" />
                            </IconButton>
                        </Tooltip>

                        <Box sx={{ py: 1.5 }}
                        >
                            <Typography
                                style={{
                                    fontSize: '12px',
                                    fontFamily: "Calibri",
                                    color: '#121213',
                                }}>Excel
                            </Typography>
                        </Box>

                        <Tooltip title="Close">
                            <IconButton
                                onClick={(e) => ClosePreview(e)}
                            >
                                <img src={close_icon} width="35" height="20" />
                            </IconButton>
                        </Tooltip>

                        <Box sx={{ py: 1.5 }}
                        >
                            <Typography
                                style={{
                                    fontSize: '12px',
                                    fontFamily: "Calibri",
                                    color: '#121213',
                                }}>Close
                            </Typography>
                        </Box>

                    </Box>
                </Box>


                <Box sx={{
                    display: "flex",
                    border: '1px solid grey',
                    borderRadius: '2px',
                    flexDirection: 'column',
                    backgroundColor: "white",
                    pt: 3

                }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: 'row',
                        justifyContent: "center",
                    }}>
                        <Typography
                            style={{

                                fontSize: '20px',
                                fontWeight: 'bold',
                                fontFamily: "Calibri",
                                color: '#121213',
                                // fontStyle: 'normal',

                            }}>
                            TRAVANCORE MEDICAL COLLEGE & HOSPITAL
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: 'row',
                            justifyContent: "center",

                        }}>
                        <Typography
                            style={{

                                fontSize: '15px',
                                fontWeight: 'bold',
                                fontFamily: "Calibri",
                                color: '#121213',

                            }}>
                            A Unit Of Quilon Medical Trust, Mylapore, Thattamala P.O, Kollam
                        </Typography>
                    </Box>

                    <Box sx={{
                        display: "flex",
                        flexDirection: 'row',
                        justifyContent: "center",

                    }}>
                        <Typography
                            style={{

                                fontSize: '14px',
                                // fontWeight: 'bold',
                                fontFamily: "Calibri",
                                color: '#121213',

                            }}>
                            Phone: 0474-2729393, Mobile: 0474-2729393,2726161,FAX:
                        </Typography>
                    </Box>

                    <Box sx={{
                        display: "flex",
                        flexDirection: 'row',
                        justifyContent: "center",

                    }}>
                        <Typography
                            style={{

                                fontSize: '12px',
                                // fontWeight: 'bold',
                                fontFamily: "Calibri",
                                color: '#121213',

                            }}>
                            Email: tmc@tmc.ac.in , Website :
                        </Typography>
                    </Box>

                    <Box sx={{
                        display: "flex",
                        flexDirection: 'row',
                        justifyContent: "center",

                    }}>
                        <Typography
                            style={{

                                fontSize: '22px',
                                fontWeight: 'bold',
                                fontFamily: "Calibri",
                                color: '#121213',
                                paddingLeft: '10px'

                            }}>
                            User Group List
                        </Typography>
                    </Box>

                    <Box sx={{
                        display: "flex",
                        width: "98%",
                        flexDirection: 'row',
                        justifyContent: "right",
                    }}>
                        <Typography
                            style={{

                                fontSize: '12px',
                                fontFamily: "Calibri",
                                color: '#121213',
                                paddingLeft: '10px',

                            }}>
                            Run Date :{todaydate}
                        </Typography>
                    </Box>


                    <Box sx={{
                        display: "flex",
                        flexDirection: 'column',
                        flex: 1,
                        pl: 2,
                        pt: 3,
                        pr: 5,

                    }}
                        variant='elevation'>
                        <TableContainer>
                            <Table size='small' aria-label="a dense table" padding={"none"} >
                                <TableHead>
                                    <TableRow sx={{
                                        backgroundColor: '#E1E1E1', borderWidth: 0, borderTopWidth: 1, borderColor: 'grey', borderStyle: 'solid'
                                    }}>
                                        <TableCell sx={{
                                            fontWeight: 550,
                                            fontSize: 13,
                                            fontFamily: "Arial",
                                            borderWidth: 0,
                                            borderTopWidth: 1,
                                            borderColor: 'grey',
                                            borderStyle: 'solid',
                                            borderBottom: '1px solid grey',
                                            columnWidth: 40,
                                            pl: 0.3
                                        }}>Sl.No</TableCell>

                                        <TableCell
                                            sx={{
                                                fontWeight: 550,
                                                fontSize: 13,
                                                fontFamily: "Arial",
                                                borderWidth: 0,
                                                borderTopWidth: 1,
                                                borderColor: 'grey',
                                                borderStyle: 'solid',
                                                borderBottom: '1px solid grey',
                                                columnWidth: 200
                                            }}>Group</TableCell>
                                        <TableCell
                                            sx={{
                                                fontWeight: 550,
                                                fontSize: 13,
                                                fontFamily: "Arial",
                                                borderWidth: 0,
                                                borderTopWidth: 1,
                                                borderColor: 'grey',
                                                borderStyle: 'solid',
                                                borderBottom: '1px solid grey',
                                                columnWidth: 200
                                            }}>Active</TableCell>
                                        <TableCell
                                            sx={{
                                                fontWeight: 550,
                                                fontSize: 13,
                                                fontFamily: "Arial",
                                                borderWidth: 0,
                                                borderTopWidth: 1,
                                                borderColor: 'grey',
                                                borderStyle: 'solid',
                                                borderBottom: '1px solid grey',
                                                columnWidth: 200,
                                            }}>Password Expiry Days</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody sx={{ justifyContent: 'center', }}>
                                    {view && view.map((val) => {
                                        return <TableRow key={val.group_id} >
                                            <TableCell sx={{ fontSize: 12, fontFamily: "Arial", borderWidth: 0, borderBottom: '1px solid grey', pl: 0.3 }}>{val.user_group_id}</TableCell>
                                            <TableCell sx={{ fontSize: 12, fontFamily: "Arial", borderWidth: 0, borderBottom: '1px solid grey' }}>{val.user_group_name}</TableCell>
                                            <TableCell sx={{ fontSize: 12, fontFamily: "Arial", borderWidth: 0, borderBottom: '1px solid grey' }}>{(val.user_group_active) === 1 ? 'Yes' : 'No'}</TableCell>
                                            <TableCell sx={{ fontSize: 12, fontFamily: "Arial", borderWidth: 0, borderBottom: '1px solid grey' }}>{val.pass_expiry_days}</TableCell>
                                        </TableRow>
                                    }
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

                    <Box sx={{
                        display: "flex",
                        flexDirection: 'column',
                        flex: 1,
                        width: "100%",
                        height: "100%",
                        py: 5
                    }}>
                        <Divider flexItem sx={{ borderBlockColor: 'black' }}></Divider>

                        <Box sx={{
                            display: "flex",
                            flexDirection: 'row',
                            flex: 1,
                            width: "100%",
                            height: "100%",
                            pt: 1
                        }}>

                            <Box sx={{
                                display: "flex",
                                width: "40%",
                                height: "100%",
                                flexDirection: 'column',
                            }}>

                                <Typography
                                    style={{

                                        fontSize: '14px',
                                        fontFamily: "Calibri",
                                        color: 'grey',
                                        paddingLeft: '10px'

                                    }}>
                                    Date/Time :{printdate}
                                </Typography>
                            </Box>

                            <Box sx={{
                                display: "flex",
                                width: "40%",
                                height: "100%",
                                flexDirection: 'row',
                                justifyContent: "center",

                            }}>
                                <Typography
                                    style={{

                                        fontSize: '14px',
                                        fontFamily: "Calibri",
                                        color: 'grey',
                                        paddingLeft: '10px'

                                    }}>
                                    User :{user}
                                </Typography>
                            </Box >

                            <Box sx={{
                                display: "flex",
                                width: "20%",
                                height: "100%",
                                flexDirection: 'row',
                                justifyContent: "center",
                            }}>
                                <Typography
                                    style={{
                                        fontSize: '14px',
                                        fontFamily: "Calibri",
                                        color: 'grey',
                                        paddingLeft: '10px'
                                    }}>
                                    Powered By : Ellider
                                </Typography>
                            </Box >
                        </Box>

                    </Box>
                </Box>
            </Box>
        </Fragment >
    )
}
