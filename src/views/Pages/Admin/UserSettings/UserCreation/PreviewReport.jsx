import { Box, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState, useCallback } from 'react'
import { Fragment } from 'react'
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import moment from 'moment';
import Divider from '@mui/material/Divider';
import { ToastContainer } from 'react-toastify';
import { Tooltip } from '@mui/joy';
import pdf_icon from '../../../../../views/Images/pdf_icon.jpg';
import excel_icon from '../../../../../views/Images/excel_icon.jpg';
import close_icon from '../../../../../views/Images/close_icon.png';
import { ExporttoExcel } from './FunctionalComponents/ExcelReport';
import { pdfdownload } from './FunctionalComponents/PdfMaking';
import { getMenuSlno } from '../../../../../HomeComponents/MenuRights/menuRights';


export const PreviewReport = ({ view, preview, setFlag, ClearData }) => {
    const [user, setUser] = useState("DSOFT");
    const todaydate = moment(new Date()).format('DD/MM/YYYY')
    const printdate = moment(new Date()).format('DD/MM/YYYY HH:mm:ss')
    // const [viewList, setviewList] = useState()
    // const [pdf, setpdf] = useState(0)
    // const [excel, setexcel] = useState(0)
    const fileName = "User Details";

    const Viewaspdf = useCallback((e) => {
        pdfdownload(view)
    }, [])
    const ViewasExcel = useCallback((e) => {
        ExporttoExcel(preview, fileName)
    }, [])
    const ClosePreview = useCallback((e) => {
        setFlag(0)
        ClearData();
    }, [])

    // useEffect(() => {
    //     const userLogedInfm = localStorage.getItem("usrCred");
    //     if (userLogedInfm !== null) {
    //         let userName = JSON.parse(userLogedInfm).name;
    //         setUser(userName)
    //         let userGroup = JSON.parse(userLogedInfm).usergroup;
    //         getMenuSlno(userGroup).then((val) => {
    //             const menuSlno = val.map((value) => {
    //                 return {
    //                     menu_id: value.menuname_id,
    //                     pdf: value.pdf_view,
    //                     excel: value.excel_view
    //                 }
    //             })
    //             setviewList(menuSlno)
    //         })

    //     } else {
    //         setUser('')
    //     }

    //     viewList && viewList.map((val) => {
    //         if (val.menu_id === 2 && val.pdf === 1) {
    //             setpdf(1)
    //         }
    //         else {
    //             setpdf(0)
    //         }
    //         if (val.menu_id === 2 && val.excel === 1) {
    //             setexcel(1)
    //         }
    //         else {
    //             setexcel(0)
    //         }
    //     })
    // }, [pdf, excel])

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
            <Box
                sx={{
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
                    height: '40px',
                    pb: 2

                }}>
                    <Box
                        sx={{
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

                        }}
                    >

                        {/* {pdf === 1 ? */}
                        < Box sx={{ display: "flex", flexDirection: 'row' }}>
                            <Box sx={{ display: "flex", flexDirection: 'column' }}>
                                <Tooltip title="PDF">
                                    <IconButton
                                        onClick={(e) => Viewaspdf(e)}
                                    >
                                        <img src={pdf_icon} width="35" height="30" />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: 'column', pt: 1.5 }}>
                                <Typography
                                    style={{
                                        fontSize: '12px',
                                        fontFamily: "Calibri",
                                        color: '#121213',
                                    }}>PDF
                                </Typography>
                            </Box>
                        </Box>

                        {/* : null}
                        {
                            excel === 1 ? */}

                        <Box sx={{ display: "flex", flexDirection: 'row' }}>
                            <Box sx={{ display: "flex", flexDirection: 'column' }}>
                                <Tooltip title="Excel">
                                    <IconButton
                                        onClick={(e) => ViewasExcel(e)}
                                    >
                                        <img src={excel_icon} width="25" height="22" />
                                    </IconButton>
                                </Tooltip>

                            </Box>
                            <Box sx={{ display: "flex", flexDirection: 'column', pt: 1.5 }}>
                                <Typography
                                    style={{
                                        fontSize: '12px',
                                        fontFamily: "Calibri",
                                        color: '#121213',
                                    }}>Excel
                                </Typography>
                            </Box>
                        </Box>

                        {/* : null} */}

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


                <Box
                    sx={{
                        display: "flex",
                        border: '1px solid grey',
                        borderRadius: '2px',
                        flexDirection: 'column',
                        backgroundColor: "white",
                        pt: 3

                    }}
                >

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
                            User Creation List
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
                        pr: 5
                    }}
                        variant='elevation'>

                        <TableContainer>
                            <Table size='small' aria-label="a dense table" padding={"none"}>
                                <TableHead>
                                    <TableRow sx={{
                                        backgroundColor: '#E1E1E1',
                                        borderWidth: 0,
                                        borderTopWidth: 1,
                                        borderColor: 'grey',
                                        borderStyle: 'solid'
                                    }}>
                                        <TableCell
                                            sx={{
                                                fontWeight: 550,
                                                fontSize: 13,
                                                fontFamily: "Arial",
                                                borderWidth: 0,
                                                borderTopWidth: 1,
                                                borderColor: 'grey',
                                                borderStyle: 'solid',
                                                borderBottom: '1px solid grey'
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
                                                borderBottom: '1px solid grey'
                                            }}>Hospital Name</TableCell>
                                        <TableCell
                                            sx={{
                                                fontWeight: 550,
                                                fontSize: 13,
                                                fontFamily: "Arial",
                                                borderWidth: 0,
                                                borderTopWidth: 1,
                                                borderColor: 'grey',
                                                borderStyle: 'solid',
                                                borderBottom: '1px solid grey'
                                            }}>User Name</TableCell>
                                        <TableCell
                                            sx={{
                                                fontWeight: 550,
                                                fontSize: 13,
                                                fontFamily: "Arial",
                                                borderWidth: 0,
                                                borderTopWidth: 1,
                                                borderColor: 'grey',
                                                borderStyle: 'solid',
                                                borderBottom: '1px solid grey'
                                            }}>Short Name</TableCell>
                                        <TableCell
                                            sx={{
                                                fontWeight: 550,
                                                fontSize: 13,
                                                fontFamily: "Arial",
                                                borderWidth: 0,
                                                borderTopWidth: 1,
                                                borderColor: 'grey',
                                                borderStyle: 'solid',
                                                borderBottom: '1px solid grey'
                                            }}>Real Name</TableCell>
                                        <TableCell
                                            sx={{
                                                fontWeight: 550,
                                                fontSize: 13,
                                                fontFamily: "Arial",
                                                borderWidth: 0,
                                                borderTopWidth: 1,
                                                borderColor: 'grey',
                                                borderStyle: 'solid',
                                                borderBottom: '1px solid grey'
                                            }}>User Group</TableCell>
                                        <TableCell
                                            sx={{
                                                fontWeight: 550,
                                                fontSize: 13,
                                                fontFamily: "Arial",
                                                borderWidth: 0,
                                                borderTopWidth: 1,
                                                borderColor: 'grey',
                                                borderStyle: 'solid',
                                                borderBottom: '1px solid grey'
                                            }}>Active</TableCell>

                                    </TableRow>
                                </TableHead>

                                <TableBody sx={{ justifyContent: 'center', }}>
                                    {view && view.map((val) => {
                                        return <TableRow key={val.emp_slno} >
                                            <TableCell sx={{ fontSize: 12, fontFamily: "Arial", borderWidth: 0, borderBottom: '1px solid grey' }}>{val.emp_slno}</TableCell>
                                            <TableCell sx={{ fontSize: 12, fontFamily: "Arial", borderWidth: 0, borderBottom: '1px solid grey' }}>{'TRAVANCORE MEDICAL COLLEGE & HOSPITAL'}</TableCell>
                                            <TableCell sx={{ fontSize: 12, fontFamily: "Arial", borderWidth: 0, borderBottom: '1px solid grey' }}>{val.usc_name}</TableCell>
                                            <TableCell sx={{ fontSize: 12, fontFamily: "Arial", borderWidth: 0, borderBottom: '1px solid grey' }}>{val.usc_alias}</TableCell>
                                            <TableCell sx={{ fontSize: 12, fontFamily: "Arial", borderWidth: 0, borderBottom: '1px solid grey' }}>{val.usc_first_name}</TableCell>
                                            <TableCell sx={{ fontSize: 12, fontFamily: "Arial", borderWidth: 0, borderBottom: '1px solid grey' }}>{val.user_group_name}</TableCell>
                                            <TableCell sx={{ fontSize: 12, fontFamily: "Arial", borderWidth: 0, borderBottom: '1px solid grey' }}>{(val.usc_active) === 1 ? 'Yes' : 'No'}</TableCell>
                                        </TableRow>
                                    }
                                    )}
                                </TableBody>

                            </Table>
                        </TableContainer>

                    </Box>

                    <Box
                        sx={{
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
                                // backgroundColor: "burlywood"
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
