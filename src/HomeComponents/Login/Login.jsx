import { Box, Button, Paper } from '@mui/material'
import React from 'react'
// import logo from "../assets/Ellider.png"
import '../style.css'
import imageLogo from "../../assets/Ellider.png"

const Login = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }} >
            <Paper sx={{
                marginTop: '100px',
                width: '400px',
                height: "432px",
                display: 'flex',
                borderRadius: '15px',
                flexDirection: 'column'
            }} >
                <Box sx={{
                    width: '400px',
                    height: '83px',
                    borderTopRightRadius: '15px',
                    borderTopLeftRadius: '15px'
                }} >
                    <img alt='Ellider Logo' style={{ height: '55px', margin: '18px 10px 10px 40px' }} src={imageLogo} />
                </Box>
                <Box sx={{
                    width: '400px',
                    height: '34px',
                    backgroundColor: '#00A0E3'
                }} >
                    <h3 style={{
                        backgroundColor: '#00a0e3',
                        color: '#fff',
                        fontSize: '20px',
                        padding: '5px 50px',
                        borderBottom: '1px',
                        margin: '0px',
                        marginBottom: '20px',
                        fontFamily: '"Trebuchet MS" , Arial, Helvetica, sans-serif'
                    }} >Login</h3>
                </Box>
                <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center', paddingTop: '20px' }} >
                    <Box sx={{ display: 'flex', width: '80%', flexDirection: 'column' }} >
                        <Box sx={{
                            display: 'flex',
                            fontSize: '12px',
                            fontFamily: 'Arial',
                            lineHeight: '10px',
                            fontWeight: 550,
                        }} >User Name</Box>
                        <Box sx={{ display: 'flex', paddingTop: '5px' }}>
                            <input
                                autoComplete='off'
                                className='input_focus'
                                style={{
                                    width: '100%',
                                    height: '31px',
                                    outline: 'none',
                                    border: 'none',
                                    outlineColor: '#fff',
                                    borderBottom: '1px solid #0f81be',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    color: '#58595b',
                                    padding: '0 5px'
                                }}
                            />
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            fontSize: '12px',
                            fontFamily: 'Arial',
                            lineHeight: '10px',
                            fontWeight: 550,
                            paddingTop: '5px'
                        }} >Password</Box>
                        <Box sx={{ display: 'flex', paddingTop: '5px' }}>
                            <input
                                autoComplete='off'
                                className='input_focus'
                                style={{
                                    width: '100%',
                                    height: '31px',
                                    outline: 'none',
                                    border: 'none',
                                    outlineColor: '#fff',
                                    borderBottom: '1px solid #0f81be',
                                    fontSize: '16px',
                                    fontWeight: 'bold',
                                    color: '#58595b',
                                    padding: '0 5px'
                                }}
                            />
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            fontSize: '12px',
                            fontFamily: 'Arial',
                            lineHeight: '10px',
                            fontWeight: 550,
                            paddingTop: '5px'
                        }} >Clinic</Box>
                        <Box sx={{ display: 'flex', paddingTop: '5px' }}>
                            <select
                                title='Clinic Name'
                                className='select_box'
                                style={{
                                    width: '100%',
                                    padding: '5px',
                                    marginBottom: '20x',
                                    fontSize: '16px',
                                    color: '#58595b',
                                    fontWeight: 'bold',
                                    fontFamily: 'Arial, Helvetica, sans-serif',
                                    height: '31px ',
                                    background: 'transparent',
                                    border: '0px',
                                    borderBottom: '1px solid',
                                    borderBottomColor: '#0f81be',
                                }}
                                defaultValue="00"
                            >
                                <option>--Select--</option>
                                <option value="00" >Travancore Medical College & Hospital</option>
                                <option value="01" >Travancore Super Speciality Hospital</option>
                            </select>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            flex: 1,
                            justifyContent: "center",
                            alignItems: 'end',
                            paddingBottom: 3
                        }} >
                            <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center', }}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        width: 170,
                                        borderRadius: '30px',
                                        fontSize: '16px',
                                        color: '#fbfbfb',
                                        fontWeight: "bold",
                                        textTransform: 'capitalize',
                                        background: '#58595b',
                                        '&:hover': {
                                            backgroundColor: '#00A0E3'
                                        }
                                    }}
                                >Login</Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}

export default Login