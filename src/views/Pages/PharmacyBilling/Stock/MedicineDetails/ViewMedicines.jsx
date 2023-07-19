import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, IconButton } from '@mui/material'
import React, { Fragment, useCallback, useState, useMemo, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import Divider from '@mui/material/Divider';
import Edit_icon from '../../../../Images/Edit_icon.png'
import { axiosinstance } from '../../../../../controllers/AxiosConfig'
import { infoNofity } from '../../../../../Constant/Constants'
import { EditMedicineDetails } from './EditMedicineDetails';

export const ViewMedicines = ({ setFlag, viewmedicine, setViewmedicine }) => {
    const [editflag, setEditflag] = useState(0)
    const [shortname, setShortname] = useState('')
    const [medicine, setMedicine] = useState('')
    const [count, setCount] = useState(0)
    const [medEdit, setMedEdit] = useState([])

    const PageClose = useCallback(() => {
        setFlag(0)
        setEditflag(0)
        setShortname('')
        setMedicine('')

    }, [])

    useEffect(() => {
        const getdata = async () => {
            const result = await axiosinstance.get('/importMedicines/view')
            const { success, data } = result.data
            if (success === 2) {
                setViewmedicine(data)
                setCount(0)
            }
            else {
                setViewmedicine([])
                setCount(0)
            }
        }
        getdata()

    }, [count])

    const ChangeMedicine = (e) => {
        setMedicine(e.target.value)
    }

    const ChangeShortname = (e) => {
        setShortname(e.target.value)
    }

    const postdata = useMemo(() => {
        return {
            itc_desc: medicine,
            itc_alias: shortname,
        }
    }, [medicine, shortname])

    const SearchMedicines = useCallback((e) => {
        const searchdata = async (postdata) => {
            const result = await axiosinstance.post('/importMedicines/search', postdata)
            const { success, message, data } = result.data
            if (success === 2) {
                setViewmedicine(data)
            }
            else if (success === 1) {
                infoNofity(message)
            }
            else {
                infoNofity(message);
            }
        }
        searchdata(postdata)

    }, [postdata])

    const EditMedicine = useCallback((val) => {
        setMedEdit(val)
        setEditflag(1)
    }, [])

    return (
        <Fragment>
            <ToastContainer />
            {editflag === 1 ? <EditMedicineDetails medEdit={medEdit} setFlag={setFlag} setEditflag={setEditflag} setCount={setCount} count={count} /> :
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
                                Medicine Description
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex", flexDirection: 'row', width: "100%",
                                alignItems: "center", pt: 1, pl: 2.5
                            }}>

                            <Box sx={{ display: "flex" }}>
                                <input type='text' placeholder='Short Name' autoComplete='off'
                                    style={{
                                        border: '0.5px solid grey',
                                        fontSize: '12px',
                                        textAlign: 'start',
                                        height: '18px',
                                        width: '200px',
                                        margin: '0px,0px,0px,0px',
                                        borderRadius: '3px',

                                    }}
                                    value={shortname}
                                    name="shortname"
                                    onChange={(e) => ChangeShortname(e)}
                                >
                                </input>
                            </Box>
                            <Box sx={{ display: "flex", pl: 1 }}>
                                <input type='text' placeholder='Description' autoComplete='off'

                                    style={{

                                        border: '0.5px solid grey',
                                        fontSize: '12px',
                                        textAlign: 'start',
                                        height: '18px',
                                        width: '200px',
                                        margin: '0px,0px,0px,0px',
                                        borderRadius: '3px',

                                    }}
                                    value={medicine}
                                    name="medicine"
                                    onChange={(e) => ChangeMedicine(e)}
                                >
                                </input>
                            </Box>

                            <Box sx={{ display: "flex", pl: 1 }}>
                                <button
                                    style={{
                                        boxShadow: '0px 0.1px 0.1px rgba(000,000,000,0.1), inset 0px 0px 0px rgba(255,255,255,0.1)',
                                        background: '-webkit-gradient( linear, left top, left bottom, from(#ffffff), color-stop(0.50, #ebebeb), color-stop(0.50, #dbdbdb), to(#ECEBEB))',
                                        backgroundColor: '#ffffff)',
                                        fontSize: '12px',
                                        borderRadius: '5px',
                                        padding: '4px',
                                        cursor: 'pointer',
                                        width: '100px',
                                        height: '25px',
                                        borderSpacing: '1px',
                                        borderColor: 'whitesmoke',
                                        fontFamily: 'Arial',
                                        fontWeight: 'bold',

                                    }}
                                    onClick={SearchMedicines}
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
                                        width: '100px',
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
                                        maxHeight: 500, maxWidth: "100%",
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
                                                <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey' }}>Short Name</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey' }}>Description</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey' }}>Strip</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey' }}>Pack</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {viewmedicine && viewmedicine.map((val) => {
                                                return <TableRow key={val.it_code}>
                                                    <TableCell sx={{ borderRight: '1px solid lightgrey', width: 4 }}>
                                                        <IconButton
                                                            onClick={(e) => EditMedicine(val)}
                                                            sx={{ paddingY: 0.8, pl: 3, width: 2 }} >
                                                            <img src={Edit_icon} width="12" height="12" alt='Edit' />
                                                        </IconButton>
                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: 12, borderRight: '1px solid lightgrey', pl: 1, width: 60 }}>{val.itc_alias}</TableCell>
                                                    <TableCell sx={{ fontSize: 12, borderRight: '1px solid lightgrey', pl: 1, width: 400, textTransform: "capitalize", }}>{val.itc_desc.toLowerCase()}</TableCell>
                                                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1, width: 15 }}>{val.itn_strip}</TableCell>
                                                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1, width: 15 }}>{val.itn_pack}</TableCell>
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
            }
        </Fragment >
    )
}
