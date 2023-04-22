import { Box, Button, Divider, Paper } from '@mui/material'
import React from 'react'
import imageLogo from '../../assets/Ellider.png'
import moment from 'moment'

const HeaderBar = () => {

    const today = moment().format('dddd LL')
    return (
        <Paper sx={{ height: '60px', display: 'flex', backgroundColor: '#E4E4E4' }} >
            <Box sx={{ width: '124px', }} >
                <img alt='Ellider Logo' style={{ height: '60px', }} src={imageLogo} />
            </Box>
            <Divider orientation="vertical" flexItem sx={{ pl: 1 }} />
            <Box sx={{ flex: 1 }} >
                <Box sx={{ height: '26px', }} >
                    <Box sx={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: 'rgb(15,129,190)',
                        lineHeight: '14px',
                        paddingTop: '7px',
                        paddingLeft: '5px',
                        fontFamily: 'Arial, Helvetica, sans-serif',
                    }} >TRAVANCORE MEDICAL COLLEGE & HOSPITAL</Box>
                </Box>
                <Box sx={{ height: '34px', display: 'flex', flexDirection: 'row', alignItems: 'baseline', pt: '6px' }} >
                    <Box sx={{
                        fontWeight: 'bold',
                        color: 'rgb(88,86,83)',
                        fontSize: '15px',
                        fontFamily: 'Arial, Helvetica, sans-serif',
                        paddingLeft: '5px'
                    }} >
                        MANAGEMENT INFORMATION SYSTEM
                    </Box>
                    <Box sx={{
                        color: '#757373',
                        fontSize: '12px',
                        fontWeight: 'normal',
                        lineHeight: '20px',
                        paddingLeft: '5px'
                    }} >2.0.2.3020</Box>
                </Box>
            </Box>
            <Box sx={{
                width: '460px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingRight: '8px'
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'right',
                    fontSize: '16px',
                    color: '#0F81BE',
                    fontWeight: 'bold',
                    fontFamily: 'Arial, Helvetica, sans-serif',
                }} >DSOFT</Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'right',
                }} >
                    <Box sx={{
                        backgroundColor: 'grey',
                        color: 'white',
                        padding: '2px 15px',
                        textAlign: 'right',
                        fontSize: '12px',
                        fontFamily: 'Arial,Tahoma,Verdana,sans-serif'
                    }}>
                        {today}
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'right', flexDirection: 'row' }} >
                    {/* <Box>Change Password</Box> */}
                    <Button
                        sx={{
                            padding: 0,
                            fontFamily: 'Arial,Tahoma,Verdana,sans-serif',
                            textTransform: 'capitalize',
                            fontSize: '12px',
                            color: '#6D6962'
                        }}
                        size='small'
                    >Change Password</Button>
                    <Button
                        sx={{
                            padding: 0,
                            fontFamily: 'Arial,Tahoma,Verdana,sans-serif',
                            textTransform: 'capitalize',
                            fontSize: '12px',
                            color: '#6D6962'
                        }}
                        size='small'
                        startIcon={'|'}
                    >Logout</Button>
                </Box>
            </Box>
        </Paper>
    )
}

export default HeaderBar