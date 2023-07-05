import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton } from '@mui/material'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Divider from '@mui/material/Divider';
import Edit_icon from '../../../../../views/Images/Edit_icon.png'
import { axiosinstance } from '../../../../../controllers/AxiosConfig'
export const ViewMenuDetails = ({ setFlag, view, setView, ClearData, EditUser }) => {

    useEffect(() => {
        const getdata = async () => {
            const result = await axiosinstance.get('/menugroups/select')
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

    const ClosePage = useCallback(() => {
        setFlag(0)
        ClearData();
    })
    return (
        <Fragment>
            <ToastContainer />
            <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: "center", width: "100%", pt: 2 }}>
                <Box sx={{ display: "flex", flexDirection: 'column', borderRadius: '1px', flex: 1 }}>   </Box>
                <Box sx={{
                    display: "flex", flexDirection: 'column', borderRadius: '3px', border: '1px solid grey', flex: 4, height: '600px',

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
                            Menu Group
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: 'column', height: '520px' }}>
                        <Box sx={{ display: "flex", p: 2 }} variant='elevation' overflow='hidden'>
                            <TableContainer
                                sx={{
                                    maxHeight: 520, maxWidth: "100%",
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
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey' }}>Module</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey' }}>Menu Group</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey' }}>Menu Name</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey' }}>Active</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {view && view.map((val) => {
                                            return <TableRow key={val.menuname_id}>
                                                <TableCell sx={{ borderRight: '1px solid lightgrey', width: 15 }}>
                                                    <IconButton
                                                        onClick={(e) => EditUser(val)}
                                                        sx={{ paddingY: 0.8 }} >
                                                        <img src={Edit_icon} width="12" height="12" alt='Edit' />
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.module_name}</TableCell>
                                                <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.menugroup_name}</TableCell>
                                                <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.menu_name}</TableCell>
                                                <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{(val.menuname_active) === 1 ? 'Yes' : 'No'}</TableCell>
                                            </TableRow>
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>
                    <Divider flexItem sx={{ borderBlockColor: 'grey' }}></Divider>
                    <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: 'center', pt: 1 }}>
                        <Box sx={{ display: "flex" }}>
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
                                    height: '26px',
                                    borderSpacing: '1px',
                                    borderColor: 'whitesmoke',
                                    fontFamily: 'Arial',
                                    fontWeight: 'bold',
                                }}
                                onClick={ClosePage}
                            >
                                Close
                            </button>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: 'column', borderRadius: '1px', flex: 1 }}>   </Box>
            </Box>
        </Fragment>
    )
}
