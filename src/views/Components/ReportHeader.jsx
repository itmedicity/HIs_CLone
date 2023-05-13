import { Box } from '@mui/material'
import moment from 'moment';
import React, { memo } from 'react'

const ReportHeader = ({ name, data }) => {
    console.log(data)
    const { from, to } = data.date;
    return (
        <Box sx={{ m: '25px' }} >
            <Box
                sx={{
                    display: 'flex',
                    color: '#005B9A',
                    fontSize: '18px',
                    fontFamily: 'Calibri,arial',
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                    justifyContent: 'center'
                }}
            >TRAVANCORE MEDICAL COLLEGE & HOSPITAL</Box>
            <Box
                sx={{
                    display: 'flex',
                    color: '#005B9A',
                    fontSize: '15px',
                    fontFamily: 'Calibri,arial',
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                    justifyContent: 'center'
                }}
            >(A Unit Of Quilon Medical Trust)</Box>
            <Box
                sx={{
                    display: 'flex',
                    color: '#005B9A',
                    fontSize: '15px',
                    fontFamily: 'Calibri,arial',
                    fontWeight: 'bold',
                    justifyContent: 'center'
                }}
            >Mylapore, Thattamala P.O, Kollam</Box>
            <Box
                sx={{
                    display: 'flex',
                    color: '#005B9A',
                    fontSize: '15px',
                    fontFamily: 'Calibri,arial',
                    fontWeight: 'bold',
                    justifyContent: 'center'
                }}
            >PH : 0474-2729393,2726161</Box>
            <Box
                sx={{
                    display: 'flex',
                    color: '#005B9A',
                    fontSize: '15px',
                    fontFamily: 'Calibri,arial',
                    fontWeight: 'bold',
                    justifyContent: 'center'
                }}
            >Email:tmc@tmc.ac.in</Box>
            <Box
                sx={{
                    display: 'flex',
                    color: '#005B9A',
                    fontSize: '22px',
                    fontFamily: 'Calibri,arial',
                    fontWeight: 'bold',
                    justifyContent: 'center'
                }}
            >{name}</Box>
            <Box
                justifyContent='space-between'
                display='flex'
                flexDirection='row'
            >
                <Box
                    sx={{
                        display: 'flex',
                        fontStyle: 'normal',
                        fontWeight: 'normal',
                        color: '#005B9A',
                        fontSize: '15px',
                        fontFamily: 'Calibri,arial'
                    }}
                >{`From ${moment(from).format('MM/DD/YYYY')} To ${moment(from).format('MM/DD/YYYY')}`}</Box>
                <Box
                    sx={{
                        display: 'flex',
                        fontStyle: 'normal',
                        fontWeight: 'normal',
                        color: '#005B9A',
                        fontSize: '15px',
                        fontFamily: 'Calibri,arial',
                    }}
                >Run Date:{moment().format('DD/MM/YYYY')}</Box>
            </Box>
        </Box>
    )
}

export default memo(ReportHeader)