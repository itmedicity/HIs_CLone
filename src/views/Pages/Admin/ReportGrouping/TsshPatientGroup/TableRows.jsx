// @ts-nocheck
import React, { memo, useCallback } from 'react'
import { Button, TableCell, TableRow } from '@mui/material'
import { axiosinstance } from '../../../../../controllers/AxiosConfig'
import { errorNofity, succesNofity, warningNofity } from '../../../../../Constant/Constants'

const TableRows = ({ data, n, setCount }) => {

    const onCLickTransferButton = useCallback(async (data) => {
        const postData = {
            date: data.IPD_DATE,
            ip_no: data.IP_NO,
            op_no: data.PT_NO,
            disDate: data.DISDATE,
            disStatus: data.DISSTATUS
        }

        const val = Math.random()

        const result = await axiosinstance.post('/admission/insertTsshPatient', postData);
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

    const onCLickDeleteButton = useCallback(async (data) => {
        const postData = {
            ip_no: data.IP_NO,
        }

        const val = Math.random()
        const result = await axiosinstance.post('/admission/removePatiet', postData);
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

    return (
        <TableRow>
            <TableCell padding='checkbox' >{n + 1}</TableCell>
            <TableCell padding='checkbox' >{data.IPD_DATE}</TableCell>
            <TableCell padding='checkbox' >{data.IP_NO}</TableCell>
            <TableCell padding='checkbox' >{data.PT_NO}</TableCell>
            <TableCell padding='checkbox' >{data.PTC_PTNAME}</TableCell>
            <TableCell padding='checkbox' align='center' >
                {
                    data.isTssh === 0 ?
                        <Button
                            variant='outlined'
                            size='small'
                            fullWidth
                            sx={{ textTransform: 'capitalize', }}
                            onClick={() => onCLickTransferButton(data)}
                        >Transfer to TSSH</Button> :
                        <Button
                            variant='outlined'
                            size='small'
                            color='error'
                            fullWidth
                            sx={{ textTransform: 'capitalize', }}
                            onClick={() => onCLickDeleteButton(data)}
                        >Remove From Tssh</Button>
                }
            </TableCell>
        </TableRow>
    )
}

export default memo(TableRows)