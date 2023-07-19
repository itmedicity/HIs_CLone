import { Box, Button, Typography } from '@mui/material'
import React, { Fragment, useCallback, useMemo, useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { succesNofity, warningNofity } from '../../../../../Constant/Constants'
import { axiosinstance } from '../../../../../controllers/AxiosConfig'
import moment from 'moment';
import { ViewMedicines } from './ViewMedicines'
import { useNavigate } from 'react-router-dom'

const ImportMedicines = () => {
    const navigate = useNavigate();
    const [view, setView] = useState([])
    const [flag, setFlag] = useState(0)
    const [lastdate, setLastdate] = useState(new Date())
    const [viewmedicine, setViewmedicine] = useState([])

    const currentdate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')



    useEffect(() => {
        const getdata = async () => {
            const result = await axiosinstance.get('/importMedicines/select')
            const { success, data } = result.data
            if (success === 2) {
                const { lastupdate } = data[0]
                setLastdate(lastupdate)
            }
            else {
                setLastdate(new Date())
            }
        }
        getdata()

    }, [])
    const postdata = useMemo(() => {
        return {
            date0: lastdate,
            date1: currentdate
        }

    }, [lastdate, currentdate])

    const patchdata = useMemo(() => {
        return {
            lastupdate: currentdate
        }
    }, [currentdate])

    const ImportMedicines = useCallback(() => {
        const MedicineDetails = async (postdata) => {
            const result = await axiosinstance.post('/importMedicines/import', postdata)
            const { success, message, data } = result.data
            if (success === 2) {
                setView(data)
                succesNofity(message);
            }
            else {

                warningNofity(message);
            }
        }

        const UpdateImportedDate = async (patchdata) => {
            const result = await axiosinstance.patch('/importMedicines/update', patchdata)
            const { success } = result.data
            if (success === 2) {

            }
            else {


            }
        }

        MedicineDetails(postdata)
        UpdateImportedDate(patchdata)
    }, [patchdata, postdata])


    const ViewMedicineDetails = useCallback(() => {
        const getdata = async () => {
            const result = await axiosinstance.get('/importMedicines/view')
            const { success, message, data } = result.data
            if (success === 2) {
                setViewmedicine(data)
                setFlag(1)
            }
            else {

                warningNofity(message);
            }
        }
        getdata()
    }, [])

    const Closepage = useCallback(() => {
        navigate("/Menu/PharmacyBilling")


    }, [])
    return (
        <Fragment>
            <ToastContainer />
            {flag === 1 ? <ViewMedicines setFlag={setFlag} viewmedicine={viewmedicine} setViewmedicine={setViewmedicine} /> :
                < Box sx={{ display: "flex", flexDirection: 'row', justifyContent: "center", width: "100%", pt: 2 }}>
                    <Box sx={{ display: "flex", flexDirection: 'column', borderRadius: '1px', flex: 1 }}>  </Box>

                    <Box sx={{
                        display: "flex", flexDirection: 'column', borderRadius: '3px', border: '1px solid grey', flex: 1, height: '170px',
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
                            <Typography variant="body1"
                                style={{
                                    color: "whitesmoke",
                                    fontSize: '13px',
                                    fontFamily: 'Arial',
                                    fontWeight: 'bold',
                                }} >
                                Import New Medicine

                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", flexDirection: 'row', pt: 1 }}>
                            <Box sx={{ flex: 1, display: "flex", flexDirection: 'row', pl: 3 }}>

                                <button
                                    style={{
                                        // boxShadow: '0px 0.1px 0.1px rgba(000,000,000,0.1), inset 0px 0px 0px rgba(255,255,255,0.1)',
                                        background: '-webkit-gradient( linear, left top, left bottom, from(#ffffff), color-stop(0.50, #ebebeb), color-stop(0.50, #dbdbdb), to(#ECEBEB))',
                                        backgroundColor: '#ffffff)',
                                        fontSize: '13px',
                                        borderRadius: '5px',
                                        padding: '4px',
                                        cursor: 'pointer',
                                        width: '200px',
                                        height: '30px',
                                        borderSpacing: '1px',
                                        borderColor: 'whitesmoke',
                                        fontFamily: 'Arial',
                                        fontWeight: 'bold',
                                    }}
                                    onClick={ImportMedicines}
                                >
                                    Import
                                </button>
                            </Box>
                            <Box sx={{ justifyContent: 'right', pt: 2, flex: 1, pr: 3, }}>
                                <Typography
                                    align='right'
                                    style={{

                                        fontSize: '14px',
                                        fontFamily: "Calibri",
                                    }}>
                                    Date & Time :{currentdate}
                                </Typography>
                            </Box>

                        </Box>
                        <Box sx={{ display: "flex", flexDirection: 'row', pt: 1 }}>
                            <Box sx={{ flex: 1, display: "flex", flexDirection: 'row', pl: 3 }}>
                                <button
                                    style={{
                                        boxShadow: '0px 0.1px 0.1px rgba(000,000,000,0.1), inset 0px 0px 0px rgba(255,255,255,0.1)',
                                        background: '-webkit-gradient( linear, left top, left bottom, from(#ffffff), color-stop(0.50, #ebebeb), color-stop(0.50, #dbdbdb), to(#ECEBEB))',
                                        backgroundColor: '#ffffff)',
                                        fontSize: '13px',
                                        borderRadius: '5px',
                                        padding: '4px',
                                        cursor: 'pointer',
                                        width: '200px',
                                        height: '30px',
                                        borderSpacing: '1px',
                                        borderColor: 'whitesmoke',
                                        fontFamily: 'Arial',
                                        fontWeight: 'bold',
                                    }}
                                    onClick={ViewMedicineDetails}
                                >
                                    View Imported Medicines
                                </button>
                            </Box>

                        </Box>

                        <Box sx={{ display: "flex", flexDirection: 'row', pt: 1 }}>
                            <Box sx={{ flex: 1, display: "flex", flexDirection: 'row', pl: 3 }}>

                                <button
                                    style={{
                                        boxShadow: '0px 0.1px 0.1px rgba(000,000,000,0.1), inset 0px 0px 0px rgba(255,255,255,0.1)',
                                        background: '-webkit-gradient( linear, left top, left bottom, from(#ffffff), color-stop(0.50, #ebebeb), color-stop(0.50, #dbdbdb), to(#ECEBEB))',
                                        backgroundColor: '#ffffff)',
                                        fontSize: '13px',
                                        borderRadius: '5px',
                                        padding: '4px',
                                        cursor: 'pointer',
                                        width: '200px',
                                        height: '30px',
                                        borderSpacing: '1px',
                                        borderColor: 'whitesmoke',
                                        fontFamily: 'Arial',
                                        fontWeight: 'bold',
                                    }}
                                    onClick={Closepage}
                                >
                                    Close
                                </button>

                            </Box>

                        </Box>


                    </Box>
                    <Box sx={{ display: "flex", flexDirection: 'column', borderRadius: '1px', flex: 1 }}>   </Box>

                </Box>
            }
        </Fragment >

    )
}

export default ImportMedicines