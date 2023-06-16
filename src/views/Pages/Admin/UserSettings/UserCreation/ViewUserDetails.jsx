import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton } from '@mui/material'
import React, { Fragment, useEffect, useState, useCallback, useMemo } from 'react'
import { ToastContainer } from 'react-toastify'
import Divider from '@mui/material/Divider';
import { axiosinstance } from '../../../../../controllers/AxiosConfig';
import { infoNofity } from '../../../../../Constant/Constants';
import Edit_icon from '../../../../../views/Images/Edit_icon.png'

export const ViewUserDetails = ({ setFlag, view, setView, EditUser, ClearData }) => {

    const [username, setUsername] = useState('')
    const [shortname, setShortname] = useState('')
    const [fullname, setFullname] = useState('')
    const [search, setSearch] = useState(0)

    const Changeusername = (e) => {
        setUsername(e.target.value)
        setSearch(1)

    }
    const Changeshortname = (e) => {
        setShortname(e.target.value)
        setSearch(1)
    }
    const Changefullname = (e) => {
        setFullname(e.target.value)
        setSearch(1)
    }
    const PageClose = useCallback(() => {
        setFlag(0)
        setSearch(0)
        ClearData();

    }, [])


    useEffect(() => {
        const getdata = async () => {
            const result = await axiosinstance.get('/employee/view')
            const { success, data } = result.data
            if (success === 2) {
                setView(data)
            }
            else {
                setView([])
            }
        }
        getdata()

    }, [])

    const postdata = useMemo(() => {
        return {
            usc_name: username,
            usc_alias: shortname,
            usc_first_name: fullname
        }
    }, [username, shortname, fullname])

    const SearchUser = useCallback((e) => {
        const serachdata = async () => {

            const result = await axiosinstance.post('/employee/search', postdata)
            const { success, message, data } = result.data
            if (success === 2) {
                setView(data)
                setSearch(1)
                // setUsername('')
                // setShortname('')
                // setFullname('')
                setSearch(0)
            }
            else if (success === 1) {

                infoNofity(message)
            }
            else {

                infoNofity(message);
            }
        }

        const getdata = async () => {
            const result = await axiosinstance.get('/employee/view')
            const { success, message, data } = result.data
            if (success === 2) {
                setView(data)
                setFlag(1)
                setUsername('')
                setShortname('')
                setFullname('')
                setSearch(0)
            }
            else if (success === 1) {

                infoNofity(message)
            }
            else {
                infoNofity(message);
            }
        }


        if (search === 1) {
            serachdata(postdata)
        }
        else if (username === '' && shortname === '' && fullname === '') {
            getdata()
        }

    }, [postdata, search, username, shortname, fullname])


    return (
        <Fragment>
            <ToastContainer />
            <Box
                sx={{
                    display: "flex", flexDirection: 'column',
                    width: "100%",
                    height: "600px",
                    alignItems: "center",
                    justifyContent: 'center',
                    alignContent: 'center',
                    px: 19,
                }}>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: 'column',
                        flex: 1,
                        border: '1px solid grey',
                        borderRadius: '3px',
                        width: "100%",
                        maxHeight: "550px"
                    }}
                >

                    <Box
                        sx={{
                            display: "flex",
                            pt: 1,
                            pl: 1,
                            flexDirection: 'row',
                            justifyContent: 'left',
                            backgroundColor: '#525252',
                            fontWeight: 'bold',
                            textAlign: 'left',
                            height: '28px',

                        }}>
                        <Typography
                            variant="body1"
                            style={{
                                color: "whitesmoke",
                                fontSize: '13px',
                                fontFamily: 'Arial',
                                fontWeight: 'bold',

                            }} >
                            User Creation
                        </Typography>

                    </Box>

                    <Box
                        sx={{
                            display: "flex", flexDirection: 'row', width: "100%",
                            alignItems: "center", pt: 1, pl: 2.5
                        }}>

                        <Box sx={{ display: "flex" }}>
                            <input type='text' placeholder='User Name' autoComplete='off'
                                style={{
                                    border: '0.5px solid grey',
                                    fontSize: '12px',
                                    textAlign: 'start',
                                    height: '18px',
                                    width: '160px',
                                    margin: '0px,0px,0px,0px',
                                    borderRadius: '3px',

                                }}
                                value={username}
                                name="username"
                                onChange={(e) => Changeusername(e)}
                            >
                            </input>
                        </Box>
                        <Box sx={{ display: "flex", pl: 1 }}>
                            <input type='text' placeholder='Short Name'

                                style={{

                                    border: '0.5px solid grey',
                                    fontSize: '12px',
                                    textAlign: 'start',
                                    height: '18px',
                                    width: '160px',
                                    margin: '0px,0px,0px,0px',
                                    borderRadius: '3px',

                                }}
                                value={shortname}
                                name="shortname"
                                onChange={(e) => Changeshortname(e)}

                            >

                            </input>
                        </Box>
                        <Box sx={{ display: "flex", pl: 1 }}>
                            <input type='text' placeholder='Full Name'

                                style={{
                                    border: '0.5px solid grey',
                                    fontSize: '12px',
                                    textAlign: 'start',
                                    height: '18px',
                                    width: '160px',
                                    margin: '0px,0px,0px,0px',
                                    borderRadius: '3px',

                                }}
                                value={fullname}
                                name="fullname"
                                onChange={(e) => Changefullname(e)}

                            >
                            </input>
                        </Box>

                        <Box sx={{ display: "flex", pl: 1 }}>
                            <button
                                style={{
                                    backgroundColor: '#dbdbdb)',
                                    fontSize: '12px',
                                    borderRadius: '5px',
                                    padding: '4px',
                                    cursor: 'pointer',
                                    width: '75px',
                                    borderSpacing: '1px',
                                    borderColor: 'lightgrey',
                                    fontFamily: 'Arial',
                                    fontWeight: 'bold'

                                }}
                                onClick={SearchUser}
                            >
                                Search
                            </button>
                        </Box>

                        <Box sx={{ display: "flex", pl: 1 }}>
                            <button
                                style={{
                                    backgroundColor: '#dbdbdb)',
                                    fontSize: '12px',
                                    borderRadius: '5px',
                                    padding: '4px',
                                    cursor: 'pointer',
                                    width: '75px',
                                    borderSpacing: '1px',
                                    borderColor: 'lightgrey',
                                    fontFamily: 'Arial',
                                    fontWeight: 'bold'
                                }}
                                onClick={PageClose}
                            >
                                Close
                            </button>
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", p: 2 }} variant='elevation' overflow='hidden'>
                        {/* backgroundColor: '#dfdcdca6' */}
                        <TableContainer
                            sx={{
                                maxHeight: 400, maxWidth: "100%",

                            }}>
                            <Table size='small' stickyHeader aria-label="a dense table" padding={"none"}
                                // tableLayout='fixed'
                                style={{
                                    border: "0.5px solid lightgrey", fontFamily: "Arial",
                                    BorderAllRounded: '1px', opacity: 0.9

                                }}>

                                <TableHead sx={{ height: '40px' }} >
                                    <TableRow size='small' sx={{
                                        borderWidth: 1,

                                        borderColor: 'grey',
                                        borderStyle: 'solid',

                                    }}>
                                        <TableCell sx={{ backgroundColor: 'lightgrey', fontSize: 12, borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey' }}></TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey' }}>User Name</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey' }}>Short Name</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey' }}>Real Name</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey' }}>Active</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {view && view.map((val) => {
                                        return <TableRow key={val.emp_slno}>
                                            <TableCell sx={{ borderRight: '1px solid lightgrey', width: 15 }}>
                                                <IconButton
                                                    onClick={(e) => EditUser(val)}
                                                    sx={{ paddingY: 0.8 }} >
                                                    <img src={Edit_icon} width="12" height="12" alt='Edit' />
                                                </IconButton>
                                            </TableCell>

                                            <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.usc_name}</TableCell>
                                            <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.usc_alias}</TableCell>
                                            <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.usc_first_name}</TableCell>
                                            <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{(val.usc_active) === 1 ? 'Yes' : 'No'}</TableCell>
                                        </TableRow>
                                    })}
                                </TableBody>

                            </Table>

                        </TableContainer>

                    </Box>

                    <Divider flexItem sx={{ borderBlockColor: 'grey', pt: 3 }}></Divider>

                </Box>
            </Box>
        </Fragment >
    )
}
