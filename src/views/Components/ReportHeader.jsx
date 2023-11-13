// @ts-nocheck
import { IconButton, Tooltip } from '@mui/joy';
import { Box } from '@mui/material'
import moment from 'moment';
import React, { memo } from 'react'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const ReportHeader = ({ name, data, hosName, disable }) => {
    const { from, to } = data;

    const navigate = useNavigate();

    return (
        <Box sx={{ m: '25px' }} >
            <Box display={disable === false ? 'flex' : 'none'} justifyContent='flex-end'  >
                <Tooltip size="sm" variant="outlined" title="Go Back" color="danger"  >
                    <IconButton disabled={false} variant="outlined" size="sm" onClick={() => navigate("/Menu/Mis")} >
                        <CloseIcon />
                    </IconButton>
                </Tooltip>
            </Box>
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
            >{hosName}</Box>
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