// @ts-nocheck
import React, { memo, useCallback } from 'react'
import { Button, TableCell, TableRow } from '@mui/material'
import { axiosinstance } from '../../../../../controllers/AxiosConfig'
import { errorNofity, succesNofity, warningNofity } from '../../../../../Constant/Constants'

const TableRows = ({ data, n, setCount }) => {

    // console.log(data)
    const onCLickRemovePatientFromTmch = useCallback(async (data) => {
        const postData = {
            date: data.IPD_DATE,
            ip_no: data.IP_NO,
            op_no: data.PT_NO,
            disDate: data.DISDATE,
            disStatus: data.DISSTATUS,
            status: 1
        }

        const val = Math.random()

        const result = await axiosinstance.post('/admission/TmchGrouping', postData);
        const { success, message } = await result.data;
        if (success === 1) {
            succesNofity(message)
            setCount(val)
        } else if (success === 2) {
            warningNofity(message)
        } else {
            errorNofity(message)
        }
    }, [data])

    // const onCLickDeleteButton = useCallback(async (data) => {
    //     const postData = {
    //         ip_no: data.IP_NO,
    //     }

    //     const val = Math.random()
    //     const result = await axiosinstance.post('/admission/removePatiet', postData);
    //     const { success, message } = await result.data;
    //     if (success === 1) {
    //         succesNofity(message)
    //         setCount(val)
    //     } else if (success === 2) {
    //         warningNofity(message)
    //     } else {
    //         errorNofity(message)
    //     }

    // }, [data])

    return (
        <TableRow>
            <TableCell padding='checkbox' >{n + 1}</TableCell>
            <TableCell padding='checkbox' >{data.IPD_DATE}</TableCell>
            <TableCell padding='checkbox' >{data.IP_NO}</TableCell>
            <TableCell padding='checkbox' >{data.PT_NO}</TableCell>
            <TableCell padding='checkbox' >{data.PTC_PTNAME}</TableCell>
            <TableCell padding='checkbox' align='center' >
                {
                    data.isTssh === 2 ?
                        <Button
                            variant='outlined'
                            size='small'
                            fullWidth
                            sx={{ textTransform: 'capitalize', color: 'blue' }}
                            onClick={() => onCLickRemovePatientFromTmch(data)}
                        >Tmch</Button> :
                        <Button
                            variant='outlined'
                            size='small'
                            fullWidth
                            disabled={true}
                            sx={{ textTransform: 'capitalize', color: 'red' }}
                        // onClick={() => onCLickDeleteButton(data)}
                        >Grouped</Button>
                }
            </TableCell>
        </TableRow>
    )
}

export default memo(TableRows)