import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton } from '@mui/material'
import React, { Fragment, useState, useCallback, useEffect, useMemo } from 'react'
import { ToastContainer } from 'react-toastify'
import Divider from '@mui/material/Divider';
import Edit_icon from '../../../../../views/Images/Edit_icon.png'
import { axiosinstance } from '../../../../../controllers/AxiosConfig'
import { infoNofity } from '../../../../../Constant/Constants'

const ViewUserGroup = ({ setFlag, view, setView, EditUser, ClearData }) => {
    const [group, setGroup] = useState('')

    const Changegroup = (e) => {
        setGroup(e.target.value)
    }
    useEffect(() => {
        const getdata = async () => {
            const result = await axiosinstance.get('/usergroup/select')
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
            user_group_name: group,
        }
    }, [group])

    const SearchGroup = useCallback(() => {

        const searchData = async (postdata) => {
            const results = await axiosinstance.post('/usergroup/search', postdata)
            const { success, message, data } = results.data
            if (success === 2) {
                setView(data)
            }
            else if (success === 1) {

                infoNofity(message)
            }
            else {

                infoNofity(message);
            }
        }
        searchData(postdata)
    }, [postdata, group])



    const PageClose = useCallback(() => {
        setFlag(0)
        ClearData();

    }, [])
    return (
        <Fragment>
            <ToastContainer />
            <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: "center", width: "100%", pt: 2 }}>
                <Box sx={{ display: "flex", flexDirection: 'column', borderRadius: '1px', flex: 1 }}>   </Box>

                <Box sx={{
                    display: "flex", flexDirection: 'column', borderRadius: '3px', border: '1px solid grey', flex: 3, height: '600px',

                }}>
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
                            User Group
                        </Typography>
                    </Box>

                    <Box sx={{
                        display: "flex", flexDirection: 'row', width: "100%",
                        alignItems: "center", pt: 1, pl: 2.5
                    }}>

                        <Box sx={{ display: "flex" }}>
                            <input type='text' placeholder='Group' autoComplete='off'
                                style={{
                                    border: '0.5px solid grey',
                                    fontSize: '12px',
                                    textAlign: 'start',
                                    height: '18px',
                                    width: '160px',
                                    margin: '0px,0px,0px,0px',
                                    borderRadius: '3px',

                                }}
                                value={group}
                                name="group"
                                onChange={(e) => Changegroup(e)}
                            >
                            </input>
                        </Box>

                        <Box sx={{ display: "flex", pl: 0.3 }}>
                            <button
                                style={{
                                    boxShadow: '0px 0.1px 0.1px rgba(000,000,000,0.1), inset 0px 0px 0px rgba(255,255,255,0.1)',
                                    background: '-webkit-gradient( linear, left top, left bottom, from(#ffffff), color-stop(0.50, #ebebeb), color-stop(0.50, #dbdbdb), to(#ECEBEB))',
                                    backgroundColor: '#ffffff)',
                                    fontSize: '12px',
                                    borderRadius: '5px',
                                    padding: '4px',
                                    cursor: 'pointer',
                                    width: '63px',
                                    height: '25px',
                                    borderSpacing: '1px',
                                    borderColor: 'whitesmoke',
                                    fontFamily: 'Arial',
                                    fontWeight: 'bold',

                                }}
                                onClick={SearchGroup}
                            >
                                Search
                            </button>
                        </Box>

                        <Box sx={{ display: "flex", pl: 0.3 }}>
                            <button
                                style={{
                                    boxShadow: '0px 0.1px 0.1px rgba(000,000,000,0.1), inset 0px 0px 0px rgba(255,255,255,0.1)',
                                    background: '-webkit-gradient( linear, left top, left bottom, from(#ffffff), color-stop(0.50, #ebebeb), color-stop(0.50, #dbdbdb), to(#ECEBEB))',
                                    backgroundColor: '#ffffff)',
                                    fontSize: '12px',
                                    borderRadius: '5px',
                                    padding: '4px',
                                    cursor: 'pointer',
                                    width: '63px',
                                    height: '25px',
                                    borderSpacing: '1px',
                                    borderColor: 'whitesmoke',
                                    fontFamily: 'Arial',
                                    fontWeight: 'bold',

                                }}
                                onClick={PageClose}
                            >
                                Close
                            </button>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: 'column', height: '500px' }}>
                        <Box sx={{ display: "flex", p: 2 }} variant='elevation' overflow='hidden'>
                            <TableContainer
                                sx={{
                                    maxHeight: 400, maxWidth: "100%",
                                }}>
                                <Table size='small' stickyHeader aria-label="a dense table" padding={"none"}
                                    style={{
                                        border: "0.5px solid lightgrey", fontFamily: "Arial",
                                        BorderAllRounded: '1px', opacity: 0.9

                                    }}>
                                    <TableHead sx={{ height: '40px' }}>
                                        <TableRow size='small' sx={{
                                            borderWidth: 1,
                                            borderColor: 'grey',
                                            borderStyle: 'solid',

                                        }}>
                                            <TableCell sx={{ backgroundColor: 'lightgrey', fontSize: 12, borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey' }}></TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey' }}>Group</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey' }}>Active</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey' }}>Password Expiry Days</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {view && view.map((val) => {
                                            return <TableRow key={val.user_group_id}>
                                                <TableCell sx={{ borderRight: '1px solid lightgrey', width: 15 }}>
                                                    <IconButton
                                                        onClick={(e) => EditUser(val)}
                                                        sx={{ paddingY: 0.8 }} >
                                                        <img src={Edit_icon} width="12" height="12" alt='Edit' />
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.user_group_name}</TableCell>
                                                <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{(val.user_group_active) === 1 ? 'Yes' : 'No'}</TableCell>
                                                <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.pass_expiry_days}</TableCell>
                                            </TableRow>
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>
                    <Divider flexItem sx={{ borderBlockColor: 'grey' }}></Divider>
                </Box>

                <Box sx={{ display: "flex", flexDirection: 'column', borderRadius: '1px', flex: 1 }}>   </Box>

            </Box>
        </Fragment>
    )
}

export default ViewUserGroup