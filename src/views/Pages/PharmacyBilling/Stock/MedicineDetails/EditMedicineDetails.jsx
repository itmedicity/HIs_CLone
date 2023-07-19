import { Box, Typography } from '@mui/material'
import React, { Fragment, useCallback, useState, useEffect, useMemo } from 'react'
import { ToastContainer } from 'react-toastify'
import Divider from '@mui/material/Divider';
import { succesNofity, warningNofity } from '../../../../../Constant/Constants'
import { axiosinstance } from '../../../../../controllers/AxiosConfig'


export const EditMedicineDetails = ({ medEdit, setFlag, setEditflag, count, setCount }) => {
    const [description, setDescription] = useState('')
    const [shortname, setShortname] = useState('')
    const [strip, setStrip] = useState(0)
    const [pack, setPack] = useState(0)
    const [medId, setMedId] = useState('')


    useEffect(() => {
        const { it_code, itc_desc, itc_alias, itn_strip, itn_pack } = medEdit
        setMedId(it_code)
        setDescription(itc_desc)
        setShortname(itc_alias)
        setStrip(itn_strip)
        setPack(itn_pack)

    }, [])

    const PageClose = useCallback(() => {
        setFlag(0)
    }, [])

    const CancelDetails = useCallback(() => {
        setEditflag(0)
        setDescription('')
        setShortname('')
        setStrip(0)
        setPack(0)
        setMedId('')
    })

    const GetStrip = (e) => {
        setStrip(e.target.value)
    }
    const GetPack = (e) => {
        setPack(e.target.value)

    }

    const patchdata = useMemo(() => {
        return {

            itn_strip: strip,
            itn_pack: pack,
            it_code: medId
        }
    }, [medId, strip, pack])

    const SaveMedicineDetails = useCallback((e) => {
        const UpdateMedicine = async (patchdata) => {
            if (strip === '') {
                warningNofity("Enter Strip Details")
            }
            else if (pack === '') {
                warningNofity("Enter Pack Details")
            }
            else {
                const results = await axiosinstance.patch('/importMedicines/medupdate', patchdata)
                const { success, message } = results.data
                if (success === 2) {
                    succesNofity(message);
                    setCount(count + 1);
                    CancelDetails();
                }
                else if (success === 1) {
                    warningNofity(message)
                }
                else {
                    warningNofity(message);
                }

            }
        }
        UpdateMedicine(patchdata);

    }, [patchdata, strip, pack])

    return (

        <Fragment>
            <ToastContainer />

            <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: "center", width: "100%", pt: 2 }}>
                <Box sx={{ display: "flex", flexDirection: 'column', borderRadius: '1px', flex: 1 }}>   </Box>
                <Box sx={{
                    display: "flex", flexDirection: 'column', borderRadius: '3px', border: '1px solid grey', flex: 1.3, height: '250px',

                }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: 'row',
                        justifyContent: 'left',
                        backgroundColor: '#525252',
                        fontWeight: 'bold',
                        textAlign: 'left',
                        height: '25px',
                        pl: 1,
                        pt: 0.5

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

                    {/* Description */}
                    <Box sx={{ display: "flex", pt: 2, width: "100%" }}>
                        <Box sx={{ display: "flex", width: "24%", justifyContent: "flex-end", pr: 0.5, pt: 0.5 }}>
                            <Typography variant="body1"
                                align='right'
                                style={{
                                    fontSize: '12px',
                                    fontFamily: 'Arial',
                                }}>
                                Description
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", width: "2%", pt: 0.5 }}>
                            <Typography variant="body1"
                                align='center'
                                style={{
                                    fontSize: '14px',
                                }}
                            >
                                :
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", width: "72%", pl: 0.5 }}>
                            <input type="text" autoComplete='off' disabled
                                style={{
                                    border: '0.5px solid grey',
                                    fontSize: '12px',
                                    height: '20px',
                                    width: '450px',
                                    margin: '0px,0px,0px,0px',
                                    borderRadius: '3px',
                                }}
                                value={description}
                                name="description"
                            />
                        </Box>
                    </Box>

                    {/* ShortName */}
                    <Box sx={{ display: "flex", pt: 1, width: "100%" }}>
                        <Box sx={{ display: "flex", width: "24%", justifyContent: "flex-end", pr: 0.5, pt: 0.5 }}>
                            <Typography variant="body1"
                                align='right'
                                style={{
                                    fontSize: '12px',
                                    fontFamily: 'Arial',
                                }}>
                                Short Name
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", width: "2%", pt: 0.5 }}>
                            <Typography variant="body1"
                                align='center'
                                style={{
                                    fontSize: '14px',
                                }}
                            >
                                :
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", width: "72%", pl: 0.5 }}>
                            <input type="text" autoComplete='off' disabled
                                style={{
                                    border: '0.5px solid grey',
                                    fontSize: '12px',
                                    height: '20px',
                                    width: '150px',
                                    margin: '0px,0px,0px,0px',
                                    borderRadius: '3px',
                                }}
                                value={shortname}
                                name="shortname"

                            />
                        </Box>
                    </Box>

                    {/* Strip */}
                    <Box sx={{ display: "flex", pt: 1, width: "100%" }}>
                        <Box sx={{ display: "flex", width: "24%", justifyContent: "flex-end", pr: 0.5, pt: 0.5 }}>
                            <Typography variant="body1"
                                align='right'
                                style={{
                                    fontSize: '12px',
                                    fontFamily: 'Arial',
                                }}>
                                Strip
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", width: "2%", pt: 0.5 }}>
                            <Typography variant="body1"
                                align='center'
                                style={{
                                    fontSize: '14px',
                                }}
                            >
                                :
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", width: "72%", pl: 0.5 }}>
                            <input type="text" autoComplete='off'
                                style={{
                                    border: '0.5px solid grey',
                                    fontSize: '12px',
                                    height: '20px',
                                    width: '150px',
                                    margin: '0px,0px,0px,0px',
                                    borderRadius: '3px',
                                }}
                                value={strip}
                                name="strip"
                                onChange={(e) => GetStrip(e)}
                            />
                        </Box>
                    </Box>

                    {/* Pack */}
                    <Box sx={{ display: "flex", pt: 1, width: "100%" }}>
                        <Box sx={{ display: "flex", width: "24%", justifyContent: "flex-end", pr: 0.5, pt: 0.5 }}>
                            <Typography variant="body1"
                                align='right'
                                style={{
                                    fontSize: '12px',
                                    fontFamily: 'Arial',
                                }}>
                                Pack
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", width: "2%", pt: 0.5 }}>
                            <Typography variant="body1"
                                align='center'
                                style={{
                                    fontSize: '14px',
                                }}
                            >
                                :
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", width: "72%", pl: 0.5 }}>
                            <input type="text" autoComplete='off'
                                style={{
                                    border: '0.5px solid grey',
                                    fontSize: '12px',
                                    height: '20px',
                                    width: '150px',
                                    margin: '0px,0px,0px,0px',
                                    borderRadius: '3px',
                                }}
                                value={pack}
                                name="pack"
                                onChange={(e) => GetPack(e)}
                            />
                        </Box>
                    </Box>
                    <Divider flexItem sx={{ borderBlockColor: 'grey', pt: 3 }}></Divider>
                    <Box sx={{ flex: 1, display: "flex", flexDirection: 'row', justifyContent: 'center', pt: 1 }}>
                        <Box sx={{ display: "flex", }}>
                            <button
                                style={{
                                    boxShadow: '0px 0.1px 0.1px rgba(000,000,000,0.1), inset 0px 0px 0px rgba(255,255,255,0.1)',
                                    background: '-webkit-gradient( linear, left top, left bottom, from(#ffffff), color-stop(0.50, #ebebeb), color-stop(0.50, #dbdbdb), to(#ECEBEB))',
                                    backgroundColor: '#ffffff)',
                                    fontSize: '12px',
                                    borderRadius: '5px',
                                    padding: '4px',
                                    cursor: 'pointer',
                                    width: '65px',
                                    height: '26px',
                                    borderSpacing: '1px',
                                    borderColor: 'whitesmoke',
                                    fontFamily: 'Arial',
                                    fontWeight: 'bold',
                                }}
                                onClick={SaveMedicineDetails}
                            >
                                Save
                            </button>
                        </Box>

                        <Box sx={{ display: "flex", }}>
                            <button
                                style={{
                                    boxShadow: '0px 0.1px 0.1px rgba(000,000,000,0.1), inset 0px 0px 0px rgba(255,255,255,0.1)',
                                    background: '-webkit-gradient( linear, left top, left bottom, from(#ffffff), color-stop(0.50, #ebebeb), color-stop(0.50, #dbdbdb), to(#ECEBEB))',
                                    backgroundColor: '#ffffff)',
                                    fontSize: '12px',
                                    borderRadius: '5px',
                                    padding: '4px',
                                    cursor: 'pointer',
                                    width: '65px',
                                    height: '26px',
                                    borderSpacing: '1px',
                                    borderColor: 'whitesmoke',
                                    fontFamily: 'Arial',
                                    fontWeight: 'bold',
                                }}
                                onClick={CancelDetails}
                            >
                                Cancel
                            </button>
                        </Box>

                        <Box sx={{ display: "flex", }}>
                            <button
                                style={{
                                    boxShadow: '0px 0.1px 0.1px rgba(000,000,000,0.1), inset 0px 0px 0px rgba(255,255,255,0.1)',
                                    background: '-webkit-gradient( linear, left top, left bottom, from(#ffffff), color-stop(0.50, #ebebeb), color-stop(0.50, #dbdbdb), to(#ECEBEB))',
                                    backgroundColor: '#ffffff)',
                                    fontSize: '12px',
                                    borderRadius: '5px',
                                    padding: '4px',
                                    cursor: 'pointer',
                                    width: '65px',
                                    height: '26px',
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
                </Box>
                <Box sx={{ display: "flex", flexDirection: 'column', borderRadius: '1px', flex: 1 }}>   </Box>

            </Box>

        </Fragment>

    )
}
