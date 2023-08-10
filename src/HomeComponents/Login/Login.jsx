import { Box, Button, Paper } from '@mui/material'
import React, { useCallback, useState } from 'react'
// import logo from "../assets/Ellider.png"
import '../style.css'
import imageLogo from "../../assets/Ellider.png"
import { ToastContainer } from 'react-toastify'
import { errorNofity, infoNofity } from '../../Constant/Constants'
import { useNavigate } from 'react-router-dom'
import { axiosinstance } from '../../controllers/AxiosConfig'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { logedIformation } from '../../Redux-Slice/LoginSlice/LoginInfomration'
import { usergroupid } from '../MenuRights/menuRights'

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [clinic, setClinic] = useState("00");

    const handleClickLogin = useCallback(async () => {
        if (userName === "") {
            infoNofity("User Name Is Blank")
        } else if (password === "") {
            infoNofity("User Password Is Blank")
        } else {
            const postData = {
                usc_name: userName,
                usc_pass: password
            }

            const loginFun = await axiosinstance.post("/employee/login", postData);
            const { success } = await loginFun.data;
            if (success === 1) {
                const { expireDate, message, token, data } = await loginFun.data;
                const loginCred = {
                    user: data.us_code,
                    name: data.usc_first_name,
                    usergroup: data.user_group_id,
                    token: token,
                    expire: expireDate
                }
                localStorage.setItem('usrCred', JSON.stringify(loginCred));
                dispatch(logedIformation(loginCred))

                if (moment(expireDate) > moment(new Date())) {
                    navigate('/Menu')
                }
            } else {
                errorNofity("Invalid Login")
            }
        }
    }, [userName, password, clinic])

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }} >
            <ToastContainer />
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
                                onChange={(e) => setUserName(e.target.value)}
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
                                type="password"
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
                                onChange={(e) => setPassword(e.target.value)}
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
                                onChange={(e) => setClinic(e.target.value)}
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
                                    onClick={handleClickLogin}
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