import { Box, TextField, Typography, Divider, Button, TableContainer, Table, TableBody, TableHead, TableCell, TableRow } from '@mui/material'
import React, { Fragment, useCallback, useState, useMemo, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import OutletSelect from '../CommonComponents/OutletSelect'
import { axiosinstance } from '../../../../../controllers/AxiosConfig'
import { infoNofity, succesNofity, warningNofity } from '../../../../../Constant/Constants'
import moment from 'moment';
import { useNavigate } from 'react-router-dom'
const StoreRequisitionEdit = () => {
    const navigate = useNavigate();
    const [docno, setDocno] = useState('')
    const [pharmacy, setpharmacy] = useState(0)
    const [reqDate, setReqdate] = useState(new Date())
    const [view, setView] = useState([])
    const [flag, setFlag] = useState(0)
    const [buttonview, setButtonview] = useState(0)

    const ReqDateChange = async (e) => {
        setReqdate(e.target.value)

    }
    const postdata = useMemo(() => {
        return {
            SR_NO: docno,
            OU_CODE: pharmacy,
            from: moment(reqDate).format('DD/MM/YYYY 00:00:00'),
            to: moment(reqDate).format('DD/MM/YYYY 23:59:59')
        }
    }, [docno, pharmacy, reqDate])

    const SerachRequest = useCallback((e) => {
        if (docno === '') {
            warningNofity("Please Enter Request No.")
        }
        else {
            const searchdata = async (postdata) => {
                const result = await axiosinstance.post('/storerequest/getmed', postdata)
                const { success, message, data } = result.data
                if (success === 2) {

                    const viewdata = data && data.map((val, index) => {
                        const obj = {
                            slno: index + 1,
                            IT_CODE: val.IT_CODE,
                            MCC_DESC: val.MCC_DESC,
                            ITC_ALIAS: val.ITC_ALIAS,
                            ITC_DESC: val.ITC_DESC,
                            UNC_ALIAS: val.UNC_ALIAS,
                            SRN_QTY: val.SRN_QTY,
                            SRN_QOH: val.SRN_QOH

                        }
                        return obj
                    })
                    setView(viewdata)
                    setFlag(0)
                    setButtonview(1)
                }
                else if (success === 1) {
                    infoNofity(message)
                    setButtonview(0)
                }
                else {
                    infoNofity(message);
                    setButtonview(0)
                }
            }
            searchdata(postdata)
        }
    }, [postdata])

    const Closepage = useCallback(() => {
        setFlag(0)
        setButtonview(0)
        navigate("/Menu/PharmacyBilling")

    }, [])

    const ProcessRequest = useCallback(() => {
        const getdata = async () => {
            const result = await axiosinstance.get('/importMedicines/view')
            const { success, data } = result.data
            if (success === 2) {
                const itemid = view.map((val, index) => {
                    const itemlist = data.find((value) => val.IT_CODE === value.it_code)
                    if ((val.SRN_QTY % itemlist.itn_strip) === 0) {
                        return {
                            ...val, ROL_QTY: val.SRN_QTY,
                        }
                    }
                    else {
                        return {
                            ...val, ROL_QTY: (val.SRN_QTY + (itemlist.itn_strip - (val.SRN_QTY % itemlist.itn_strip))),
                        }
                    }
                })
                setView(itemid);
                setFlag(1)
                setButtonview(2);
                succesNofity("ROL Setting Successfully Completed");
            }
        }
        getdata();

    }, [view])


    const InsertToRolSetting = useCallback(() => {
        const roldata = view && view.map((val) => {
            const obj = {
                OU_CODE: pharmacy,
                IT_CODE: val.IT_CODE,
                ITN_NAME: val.ITC_DESC,
                ITN_MAXQTY: val.ROL_QTY,
                ITN_MINQTY: 0,
                ITN_MINLVL: 0,
                ITN_MEDLVL: 0,
                ITN_MAXLVL: 0,
                STATUS: 'Y'
            }
            return obj

        })

        const AddDetails = async () => {

            const result = await axiosinstance.post('/storerequest/insert', roldata)
            const { success, message } = result.data
            if (success === 1) {
                setButtonview(3);
                succesNofity(message);

            }
            else {
                warningNofity(message);
                setButtonview(2)
            }
        }
        AddDetails(roldata);

    }, [view])

    const patchdata = useMemo(() => {
        return {
            SR_NO: docno
        }
    }, [docno])

    const UpdateStoreDetails = useCallback((e) => {

        const UpdateDetails = async (patchdata) => {
            const result = await axiosinstance.patch('/storerequest/update', patchdata)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message);
                setButtonview(0);
                ClearDetails();
            }
            else {
                warningNofity(message);
                setButtonview(3)
            }
        }
        UpdateDetails(patchdata);

    }, [patchdata])
    const ClearDetails = useCallback(() => {
        setDocno('')
        setpharmacy(0)
        setReqdate(new Date())
        setView([])
        setFlag(0)
        setButtonview(0)

    }, [])
    return (
        <Fragment>
            <ToastContainer />
            <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: "center", width: "100%", pt: 1 }}>
                <Box sx={{ display: "flex", flexDirection: 'column', borderRadius: '1px', flex: 1 }}>   </Box>
                <Box sx={{ display: "flex", flexDirection: 'column', borderRadius: '1px', border: '1px solid grey', flex: 10, height: '800px' }}>
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
                            Store Requisition
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: 'row', width: '100%' }}>

                        <Box sx={{ pt: 2, flex: 1.5, display: "flex", flexDirection: 'row' }}>
                            <Box sx={{ pt: 1, pl: 2 }}>
                                <Typography
                                    variant="body1"
                                    style={{
                                        fontSize: '15px',
                                        fontFamily: 'Arial',
                                        // fontWeight: 'bold',
                                    }} >
                                    Doc No.
                                </Typography>
                            </Box>
                            <Box sx={{ pl: 1 }}>
                                <TextField
                                    style={{ width: 250, }}
                                    variant="outlined" size='small'
                                    id='docno'
                                    value={docno}
                                    name="docno"
                                    onChange={(e) => { setDocno(e.target.value) }}
                                >
                                </TextField>
                            </Box>
                        </Box>

                        <Box sx={{ display: "flex", flexDirection: 'row', pt: 2, flex: 2, }}>
                            <Box sx={{ pl: 1, pt: 1 }}>
                                <Typography
                                    variant="body1"
                                    style={{
                                        fontSize: '15px',
                                        fontFamily: 'Arial',
                                        // fontWeight: 'bold',
                                    }} >
                                    Pharmacy
                                </Typography>
                            </Box>
                            <Box sx={{ pl: 2 }}>
                                <OutletSelect
                                    value={pharmacy}
                                    setValue={setpharmacy} />

                            </Box>

                        </Box>
                        <Box sx={{ pt: 2, flex: 1, }}>

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
                                value={reqDate}
                                onChange={(e) => ReqDateChange(e)}
                            />
                        </Box>
                        <Box sx={{ pt: 2, flex: 1 }}>
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
                                onClick={SerachRequest}
                            >
                                Search
                            </Button>
                        </Box>

                    </Box>

                    <Box sx={{ display: "flex", flexDirection: 'column', pt: 2 }}>
                        <Divider flexItem sx={{ borderBlockColor: 'grey' }}></Divider>
                    </Box>


                    <Box sx={{ display: "flex", flexDirection: 'column', height: '620px' }}>
                        <Box sx={{ display: "flex", p: 2 }} variant='elevation' overflow='hidden'>
                            <TableContainer sx={{ maxHeight: 620, maxWidth: "100%" }}>
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
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey' }}>Sl.No</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey' }}>Category</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey' }}>Item Code</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey' }}>Item</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey' }}>Unit</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey' }}>Req.Qnty</TableCell>
                                            {flag === 1 ?
                                                <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey' }}>ROL Qnty</TableCell>
                                                : null}
                                            <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey' }}>QOH</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {view && view.map((val, index) => {
                                            return <TableRow key={index}>
                                                <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.slno}</TableCell>
                                                <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.MCC_DESC}</TableCell>
                                                <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.ITC_ALIAS}</TableCell>
                                                <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.ITC_DESC}</TableCell>
                                                <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.UNC_ALIAS}</TableCell>
                                                <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.SRN_QTY}</TableCell>
                                                {flag === 1 ?
                                                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.ROL_QTY}</TableCell>
                                                    : null}
                                                <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.SRN_QOH}</TableCell>
                                            </TableRow>
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>



                    <Box sx={{ display: "flex", flexDirection: 'column', pt: 1 }}>
                        <Divider flexItem sx={{ borderBlockColor: 'grey' }}></Divider>
                    </Box>

                    <Box sx={{ pt: 2, display: "flex", flex: 1, justifyContent: 'center' }}>
                        {buttonview === 1 ?
                            <Box sx={{ display: "flex", }}>
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
                                    onClick={ProcessRequest}
                                >
                                    Process
                                </Button>
                            </Box> : null
                        }
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
                                onClick={Closepage}
                            >
                                Close
                            </Button>
                        </Box>
                        {buttonview === 2 ?
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
                                    onClick={InsertToRolSetting}
                                >
                                    Insert
                                </Button>
                            </Box> : null
                        }
                        {buttonview === 3 ?
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
                                    onClick={UpdateStoreDetails}
                                >
                                    Update
                                </Button>
                            </Box> : null
                        }

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
                                onClick={ClearDetails}
                            >
                                Clear
                            </Button>
                        </Box>

                    </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: 'column', borderRadius: '1px', flex: 1 }}>   </Box>
            </Box>
        </Fragment >
    )
}

export default StoreRequisitionEdit