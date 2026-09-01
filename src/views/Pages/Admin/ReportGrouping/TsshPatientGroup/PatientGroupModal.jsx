// @ts-nocheck
import React, { memo, useCallback } from 'react'
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { Box } from '@mui/joy';
import Table from '@mui/joy/Table';
import { axiosinstance } from '../../../../../controllers/AxiosConfig';
import { errorNofity, succesNofity, warningNofity } from '../../../../../Constant/Constants';

const PatientGroupModal = ({ open, setOpen, addData, removeData, setIplist, setAdd, setRemove }) => {

    const onClickInsertPatient = useCallback(async () => {
        try {
            //INSERT DATA IN TO THE TSSH TABLE
            if (addData?.length > 0) {
                const insertPostData = addData.map((e) => [
                    e.IPD_DATE,
                    e.IP_NO,
                    e.PT_NO,
                    e.DISSTATUS,
                    e.DISDATE
                ])

                const result = await axiosinstance.post('/admission/insertTsshPatient', insertPostData);
                const { success, message } = result.data;
                if (success === 1) {
                    succesNofity(message)
                } else if (success === 2) {
                    warningNofity(message)
                } else {
                    errorNofity(message)
                }
            }

            //REMOVE DATA FROM THE TSSH TABLE
            if (removeData?.length > 0) {
                const removePostData = removeData.map((e) => e.slno)
                const removeIpNumner = await axiosinstance.post('/admission/removePatiet', removePostData);
                const { success, message } = removeIpNumner.data;
                if (success === 1) {
                    succesNofity(message)
                } else if (success === 2) {
                    warningNofity(message)
                } else {
                    errorNofity(message)
                }
            }

            setIplist([])
            setOpen(false)
            setAdd([])
            setRemove([])
        } catch (e) {
            errorNofity(e)
        }
    }, [addData, removeData, setAdd, setIplist, setOpen, setRemove])

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}

            onClose={() => setOpen(false)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Sheet
                variant="outlined"
                sx={{
                    maxWidth: 900,
                    minWidth: 900,
                    borderRadius: 'md',
                    p: 3,
                    boxShadow: 'lg',
                }}
            >
                <ModalClose variant="plain" sx={{ m: 1 }} />
                <Typography id="modal-desc" textColor="text.tertiary">
                    Make sure the Patient List before Proceeed
                </Typography>
                <Box>Add The Following Patient To TSSH</Box>
                {
                    addData?.length === 0 ?
                        <Typography level="body-xs" variant="outlined" color='danger' sx={{ paddingX: 2, marginY: 1 }} >No Patient Data Selected</Typography>
                        :
                        <Box sx={{ maxHeight: 150, overflow: 'auto' }}>
                            <Table aria-label="basic table" size="sm" stickyHeader hoverRow  >
                                <thead>
                                    <tr style={{ height: 5 }}>
                                        <th style={{ height: 5 }}>#</th>
                                        <th style={{ width: '10%', height: 5 }}>Ip Number</th>
                                        <th style={{ width: '10%', height: 5 }}>Patient #</th>
                                        <th style={{ height: 5 }}>Patient Name</th>
                                        <th style={{ height: 5 }}>Admission Date</th>
                                        <th style={{ height: 5 }}>Discharge Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        addData?.map((e, idx) => (
                                            <tr key={e.IP_NO} style={{ height: 5 }} >
                                                <td style={{ height: 5 }}>{idx + 1}</td>
                                                <td style={{ height: 5 }} >{e.IP_NO}</td>
                                                <td style={{ height: 5 }} >{e.PT_NO}</td>
                                                <td style={{ height: 5 }} >{e.PTC_PTNAME}</td>
                                                <td style={{ height: 5 }} >{e.IPD_DATE}</td>
                                                <td style={{ height: 5 }} >{e.DISDATE}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </Box>
                }
                <Box>Remove The Following Patient From TSSH</Box>
                {
                    removeData?.length === 0 ?
                        <Typography level="body-xs" variant="outlined" color='danger' sx={{ paddingX: 2, marginY: 1 }} >No Patient Data Selected</Typography>
                        :
                        <Box sx={{ maxHeight: 150, overflow: 'auto' }}>
                            <Table aria-label="basic table" size="sm" stickyHeader hoverRow >
                                <thead>
                                    <tr style={{ height: 5 }}>
                                        <th style={{ height: 5 }}>#</th>
                                        <th style={{ width: '10%', height: 5 }}>Ip Number</th>
                                        <th style={{ width: '10%', height: 5 }}>Patient #</th>
                                        <th style={{ height: 5 }}>Patient Name</th>
                                        <th style={{ height: 5 }}>Admission Date</th>
                                        <th style={{ height: 5 }}>Discharge Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        removeData?.map((e, idx) => (
                                            <tr key={e.IP_NO} style={{ height: 5 }} >
                                                <td style={{ height: 5 }}>{idx + 1}</td>
                                                <td style={{ height: 5 }} >{e.IP_NO}</td>
                                                <td style={{ height: 5 }} >{e.PT_NO}</td>
                                                <td style={{ height: 5 }} >{e.PTC_PTNAME}</td>
                                                <td style={{ height: 5 }} >{e.IPD_DATE}</td>
                                                <td style={{ height: 5 }} >{e.DISDATE}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </Box>
                }
                <Box sx={{ paddingTop: 2 }}>
                    <Button
                        variant='outlined'
                        sx={{ mx: 2, width: '20%' }}
                        size='sm'
                        onClick={onClickInsertPatient}
                    >Save</Button>
                    <Button
                        variant='outlined'
                        // color='error'
                        sx={{ mx: 2, width: '20%' }}
                        size='sm'
                        onClick={() => setOpen(false)}
                    >Close</Button>
                </Box>
            </Sheet>
        </Modal>
    )
}

export default memo(PatientGroupModal) 