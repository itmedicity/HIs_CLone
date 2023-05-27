import { Box, Typography } from '@mui/material'
import React, { Fragment, useState, useCallback, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import Divider from '@mui/material/Divider';
import { axiosinstance } from '../../controllers/AxiosConfig';
import { succesNofity, warningNofity } from '../../Constant/Constants';
import { ViewUserDetails } from './ViewUserDetails';
import { PreviewReport } from './PreviewReport';



const UserCreation = () => {
    const [username, setUsername] = useState('')
    const [shortname, setShortname] = useState('')
    const [fullname, setFullname] = useState('')
    const [password, setPassword] = useState('')
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')
    const [clinic, setClinic] = useState(0)
    const [module, setModule] = useState(0)
    const [doctor, setDoctor] = useState(0)
    const [lab, setLab] = useState(0)
    const [nurse, setNurse] = useState(0)
    const [employee, setEmployee] = useState(0)
    const [time, setTime] = useState(0)
    const [pass, setPass] = useState(false)
    const [access, setAccess] = useState(false)
    const [billing, setBilling] = useState(false)
    const [active, setActive] = useState(true)
    const [flag, setFlag] = useState(0)
    const [view, setView] = useState([])
    const [edit, setEdit] = useState(0)
    const [userid, setUserid] = useState(0)
    const [empno, setEmpno] = useState(0)
    const [resetPass, setResetPass] = useState(0)


    const Changeusername = (e) => {
        setUsername(e.target.value)
        console.log(username);
    }
    const Changeshortname = (e) => {
        setShortname(e.target.value)
        // console.log(shortname);
    }
    const Changefullname = (e) => {
        setFullname(e.target.value)
    }
    const Changepassword = (e) => {
        setPassword(e.target.value)
    }
    const Changemobile = (e) => {
        setMobile(e.target.value)
    }
    const Changeemail = (e) => {
        setEmail(e.target.value)
    }
    const Getclinic = (e) => {
        setClinic(e.target.value)

    }
    const Getmodule = (e) => {
        setModule(e.target.value)

    }
    const Getdoctor = (e) => {
        setDoctor(e.target.value)

    }

    const Getlab = (e) => {
        setLab(e.target.value)

    }
    const Getnurse = (e) => {
        setNurse(e.target.value)

    }
    const Getemployee = (e) => {
        setEmployee(e.target.value)
    }

    const Changetime = (e) => {
        setTime(e.target.value)

    }
    const Changepass = (e) => {
        if (e.target.checked === true) {
            setPass(true)
        }
        else {
            setPass(false)
        }
    }

    const ChangeAccess = (e) => {
        if (e.target.checked === true) {
            setAccess(true)
        }
        else {
            setAccess(false)
        }
    }
    const ChangeBillingUser = (e) => {
        if (e.target.checked === true) {
            setBilling(true)
        }
        else {
            setBilling(false)
        }
    }
    const ChangeActive = (e) => {
        if (e.target.checked === true) {
            setActive(true)
        }
        else {
            setActive(false)
        }
    }

    const ResetPassword = (e) => {
        if (e.target.checked === true) {
            setResetPass(true)
        }
        else {
            setResetPass(false)
        }

    }

    const postdata = {
        us_code: Math.ceil(Math.random() * 1000),
        usc_name: username,
        usc_alias: shortname,
        usc_first_name: fullname,
        usc_pass: password,
        usc_active: active === true ? '1' : '0'

    }

    const patchdata = {
        emp_slno: empno,
        us_code: userid,
        usc_name: username,
        usc_alias: shortname,
        usc_first_name: fullname,
        usc_pass: password,
        usc_active: active === true ? '1' : '0'
    }


    const SaveUserDetails = useCallback((e) => {

        const UserDetailsAdd = async () => {
            if (username === '') {
                warningNofity("Enter User Name")
            }
            else if (shortname === '') {
                warningNofity("Enter Short Name")
            }
            else if (password === '') {
                warningNofity("Enter Password")
            }
            else if (mobile === '') {
                warningNofity("Enter Mobile")
            }
            else if (email === '') {
                warningNofity("Enter Email")
            }
            else {

                const result = await axiosinstance.post('/employee/insert', postdata)
                const { success, message } = result.data
                if (success === 1) {

                    succesNofity(message);
                    ClearUserDetails();

                }
                else if (success === 7) {
                    warningNofity(message)
                }
                else {
                    console.log(message);
                }
            }

        }

        const UserDetailsUpdate = async () => {

            if (resetPass === true) {

                // console.log('reset password');
                if (username === '') {
                    warningNofity("Enter User Name")
                }
                else if (shortname === '') {
                    warningNofity("Enter Short Name")
                }
                else if (password === '') {
                    warningNofity("Enter Password")
                }
                else if (mobile === '') {
                    warningNofity("Enter Mobile")
                }
                else if (email === '') {
                    warningNofity("Enter Email")
                }
                else {

                    const result = await axiosinstance.patch('/employee/resetpass', patchdata)

                    const { success, message } = result.data
                    if (success === 2) {
                        succesNofity(message);
                        ClearUserDetails();

                    }
                    else if (success === 7) {

                        warningNofity(message)
                    }
                    else {
                        console.log(message);
                    }
                }

            }
            else {

                // console.log('password not updated');

                if (username === '') {
                    warningNofity("Enter User Name")
                }
                else if (shortname === '') {
                    warningNofity("Enter Short Name")
                }
                else if (mobile === '') {
                    warningNofity("Enter Mobile")
                }
                else if (email === '') {
                    warningNofity("Enter Email")
                }
                else {

                    const result = await axiosinstance.patch('/employee/update', patchdata)

                    const { success, message } = result.data
                    if (success === 2) {
                        succesNofity(message);
                        ClearUserDetails();

                    }
                    else if (success === 7) {

                        warningNofity(message)
                    }
                    else {
                        console.log(message);
                    }
                }

            }
        }

        if (edit === 1) {
            UserDetailsUpdate(patchdata)
        }
        else {
            UserDetailsAdd(postdata)
        }
    }, [postdata, patchdata, edit])


    const ClearUserDetails = async () => {
        setUsername('')
        setShortname('')
        setFullname('')
        setPassword('')
        setMobile('')
        setEmail('')
        setClinic(0)
        setModule(0)
        setDoctor(0)
        setLab(0)
        setNurse(0)
        setEmployee(0)
        setTime(0)
        setPass(false)
        setAccess(false)
        setBilling(false)
        setActive(true)
        setFlag(0)
        setEdit(0)
        setResetPass(false)

    }

    const ViewUserData = useCallback(() => {

        const getdata = async () => {
            const result = await axiosinstance.get('/employee/view')
            const { success, message, data } = result.data
            if (success === 2) {
                setView(data)

                // console.log(data);
                setFlag(1)
            }
            else {
                succesNofity(message);
            }
        }
        getdata()

    }, [])

    const editView = async (val) => {

        setFlag(0)
        const { emp_slno, us_code, usc_name, usc_alias, usc_first_name, usc_pass, usc_active } = val
        setEmpno(emp_slno)
        setUserid(us_code)
        setUsername(usc_name)
        setShortname(usc_alias)
        setFullname(usc_first_name)
        setPassword('')
        setMobile('123456')
        setEmail(usc_first_name + "@gmail.com")
        setClinic(1)
        setActive(usc_active === 1 ? true : false)
        setEdit(1)

    }
    const [preview, setPreview] = useState([])
    const PreviewUserDetails = useCallback(() => {
        const getdata = async () => {
            const result = await axiosinstance.get('/employee/select')
            const { success, message, data } = result.data
            if (success === 2) {
                setView(data)

                // console.log(data);

                //  const { emp_slno, usc_active, usc_first_name, usc_alias, usc_name } = data[0]

                const viewdata = data && data.map((val) => {

                    const obj = {
                        emp_slno: val.emp_slno,
                        clinic_name: "Travancore Medcical College & Hospital",
                        usc_name: val.usc_name,
                        usc_alias: val.usc_alias,
                        usc_first_name: val.usc_first_name,
                        usc_active: (val.usc_active) === 1 ? "Yes" : "No"

                    }

                    return obj
                })
                setPreview(viewdata)
                setFlag(2)
            }
            else {
                succesNofity(message);
            }
        }
        getdata()

    }, [])


    return (
        <Fragment>
            <ToastContainer />
            {flag === 1 ? <ViewUserDetails setFlag={setFlag} view={view} setView={setView} EditUser={editView} ClearData={ClearUserDetails} /> :
                flag === 2 ? <PreviewReport setFlag={setFlag} view={view} preview={preview} ClearData={ClearUserDetails} /> :
                    <Box
                        sx={{
                            display: "flex", flexDirection: 'column',
                            width: "100%",
                            height: "600px",
                            alignItems: "center",
                            //  backgroundColor: 'lightskyblue',
                            justifyContent: 'center',
                            alignContent: 'center',
                            px: 19,
                        }}>
                        <Box
                            sx={{
                                // backgroundColor: 'pink',
                                display: "flex",
                                flexDirection: 'column',
                                flex: 1,
                                border: '1px solid grey',
                                borderRadius: '3px',
                                width: "100%",
                                maxHeight: "550px",
                                paddingTop: '0px'
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    pl: 1,
                                    flexDirection: 'row',
                                    //  width: "100%",
                                    justifyContent: 'left',
                                    backgroundColor: '#525252',
                                    fontWeight: 'bold',
                                    textAlign: 'left',
                                    height: '30px',
                                    py: 1
                                }}>

                                <Typography variant="body1"
                                    style={{
                                        color: "whitesmoke",
                                        fontSize: '13px',
                                        fontFamily: 'Arial',
                                        fontWeight: 'bold',

                                    }} >
                                    User Creation
                                </Typography>
                            </Box>

                            {/* user name */}
                            <Box
                                sx={{
                                    display: "flex", flexDirection: 'row', width: "100%",
                                    alignItems: "center", pt: 0.5
                                }}>
                                <Box sx={{
                                    display: "flex", width: "33%",
                                    justifyContent: "flex-end"
                                }}>
                                    <Typography variant="body1"
                                        align='right'
                                        style={{
                                            fontSize: '12px',
                                            fontFamily: 'Arial',

                                        }}>
                                        User Name
                                    </Typography>
                                </Box>

                                <Box sx={{ width: "2%" }}>

                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '13px',
                                            color: 'red',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        *
                                    </Typography>
                                </Box>
                                <Box sx={{ width: "3%" }}>

                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '14px',
                                        }}
                                    >
                                        :
                                    </Typography>
                                </Box>

                                <Box sx={{ width: "62%", pl: 0.5 }}>
                                    <input type="text" autoComplete='off'

                                        style={{
                                            border: '0.5px solid grey',
                                            fontSize: '12px',
                                            textAlign: 'start',
                                            height: '18px',
                                            width: '210px',
                                            margin: '0px,0px,0px,0px',
                                            borderRadius: '3px'
                                        }}

                                        // classname='textNewInputTest'
                                        id='username'
                                        value={username}
                                        name="username"
                                        // onInput={Changeusername}
                                        onChange={Changeusername}


                                    />
                                </Box>

                            </Box>

                            {/* Short Name */}

                            <Box
                                sx={{
                                    display: "flex", flexDirection: 'row', width: "100%",
                                    alignItems: "center", pt: 0.2
                                }}>
                                <Box sx={{
                                    display: "flex", width: "33%",
                                    justifyContent: "flex-end"
                                }}>
                                    <Typography variant="body1"
                                        align='right'
                                        style={{
                                            fontSize: '13px',
                                            fontFamily: 'Arial',

                                        }}>
                                        Short Name
                                    </Typography>
                                </Box>

                                <Box sx={{ width: "2%" }}>

                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '12px',
                                            color: 'red',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        *
                                    </Typography>
                                </Box>
                                <Box sx={{ width: "3%" }}>

                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '14px',
                                        }}
                                    >
                                        :
                                    </Typography>
                                </Box>

                                <Box sx={{ width: "62%", pl: 0.5 }}>
                                    <input type='text' autoComplete='off'

                                        style={{

                                            border: '0.5px solid grey',
                                            fontSize: '12px',
                                            textAlign: 'start',
                                            height: '18px',
                                            margin: '0px,0px,0px,0px',
                                            borderRadius: '3px',
                                            width: '70px'

                                        }}

                                        value={shortname}
                                        name="shortname"
                                        onChange={Changeshortname}
                                    />
                                </Box>

                            </Box>


                            {/* Full Name */}

                            <Box
                                sx={{
                                    display: "flex", flexDirection: 'row', width: "100%",
                                    alignItems: "center", pt: 0.2
                                }}>
                                <Box sx={{
                                    display: "flex", width: "33%",
                                    justifyContent: "flex-end"
                                }}>
                                    <Typography variant="body1"
                                        align='right'
                                        style={{
                                            fontSize: '12px',
                                            fontFamily: 'Arial',

                                        }}>
                                        Full Name
                                    </Typography>
                                </Box>

                                <Box sx={{ width: "2%" }}>

                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '13px',
                                            color: 'red',
                                            fontWeight: 'bold'
                                        }}
                                    >

                                    </Typography>
                                </Box>
                                <Box sx={{ width: "3%" }}>

                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '14px',
                                        }}
                                    >
                                        :
                                    </Typography>
                                </Box>

                                <Box sx={{ width: "62%", pl: 0.5 }}>
                                    <input type="text" autoComplete='off'
                                        style={{

                                            border: '0.5px solid grey',
                                            fontSize: '12px',
                                            textAlign: 'start',
                                            height: '18px',
                                            width: '215px',
                                            margin: '0px,0px,0px,0px',
                                            borderRadius: '3px'

                                        }}

                                        value={fullname}
                                        name="fullname"
                                        onChange={Changefullname}
                                    />
                                </Box>

                            </Box>



                            {/* Password*/}

                            <Box
                                sx={{
                                    display: "flex", flexDirection: 'row', width: "100%",
                                    alignItems: "center", pt: 0.2
                                }}>
                                <Box sx={{
                                    display: "flex", width: "33%",
                                    justifyContent: "flex-end"
                                }}>
                                    <Typography variant="body1"
                                        align='right'
                                        style={{
                                            fontSize: '12px',
                                            fontFamily: 'Arial',

                                        }}>
                                        Password
                                    </Typography>
                                </Box>

                                <Box sx={{ width: "2%" }}>

                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '13px',
                                            color: 'red',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        *
                                    </Typography>
                                </Box>
                                <Box sx={{ width: "3%" }}>

                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '14px',
                                        }}
                                    >
                                        :
                                    </Typography>
                                </Box>

                                {edit === 0 ?
                                    <Box sx={{ width: "62%", pl: 0.5 }}>
                                        <input input type="password" autoComplete='off'
                                            style={{

                                                border: '0.5px solid grey',
                                                fontSize: '12px',
                                                textAlign: 'start',
                                                height: '18px',
                                                width: '150px',
                                                margin: '0px,0px,0px,0px',
                                                borderRadius: '3px'

                                            }}
                                            value={password}
                                            name="password"
                                            onChange={Changepassword}
                                        />

                                    </Box> :

                                    <Box sx={{ width: "62%", pl: 0.5, display: "flex", flexDirection: 'row', }}>
                                        <Box sx={{ width: "19%" }}>
                                            <input input type="password" autoComplete='off'
                                                style={{

                                                    border: '0.5px solid grey',
                                                    fontSize: '12px',
                                                    textAlign: 'start',
                                                    height: '18px',
                                                    width: '150px',
                                                    margin: '0px,0px,0px,0px',
                                                    borderRadius: '3px'

                                                }}
                                                value={password}
                                                name="password"
                                                onChange={Changepassword}
                                            />
                                        </Box>

                                        <Box sx={{ width: "2%", pl: 0, pt: 0.5 }}>

                                            <input type="checkbox"
                                                background='white'
                                                border='0.5px solid  #C4C4C4'

                                                style={{
                                                    width: '15px',
                                                    height: '15px'

                                                }}
                                                checked={resetPass}
                                                value={resetPass}
                                                name="resetPass"
                                                onChange={ResetPassword}
                                            >

                                            </input>


                                        </Box>

                                        <Box sx={{ width: "12%", pl: 0, pt: 0.8 }}>
                                            <Typography variant="body1"
                                                align='right'
                                                style={{
                                                    fontSize: '12px',
                                                    fontFamily: 'Arial',

                                                }}>
                                                Reset Password
                                            </Typography>
                                        </Box>
                                    </Box>

                                }


                            </Box>


                            {/* Mobile*/}

                            <Box
                                sx={{
                                    display: "flex", flexDirection: 'row', width: "100%",
                                    alignItems: "center", pt: 0.2
                                }}>
                                <Box sx={{
                                    display: "flex", width: "33%",
                                    justifyContent: "flex-end"
                                }}>
                                    <Typography variant="body1"
                                        align='right'
                                        style={{
                                            fontSize: '12px',
                                            fontFamily: 'Arial',

                                        }}>
                                        Mobile Number
                                    </Typography>
                                </Box>

                                <Box sx={{ width: "2%" }}>

                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '13px',
                                            color: 'red',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        *
                                    </Typography>
                                </Box>
                                <Box sx={{ width: "3%" }}>

                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '14px',
                                        }}
                                    >
                                        :
                                    </Typography>
                                </Box>

                                <Box sx={{ width: "62%", pl: 0.5 }}>
                                    <input type="text" autoComplete='off'
                                        style={{

                                            border: '0.5px solid grey',
                                            fontSize: '12px',
                                            textAlign: 'start',
                                            height: '18px',
                                            width: '215px',
                                            margin: '0px,0px,0px,0px',
                                            borderRadius: '3px'

                                        }}
                                        value={mobile}
                                        name="mobile"
                                        onChange={Changemobile}
                                    />

                                </Box>

                            </Box>


                            {/* Email*/}

                            <Box
                                sx={{
                                    display: "flex", flexDirection: 'row', width: "100%",
                                    alignItems: "center", pt: 0.2
                                }}>
                                <Box sx={{
                                    display: "flex", width: "33%",
                                    justifyContent: "flex-end"
                                }}>
                                    <Typography variant="body1"
                                        align='right'
                                        style={{
                                            fontSize: '12px',
                                            fontFamily: 'Arial',

                                        }}>
                                        Email
                                    </Typography>
                                </Box>

                                <Box sx={{ width: "2%" }}>

                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '13px',
                                            color: 'red',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        *
                                    </Typography>
                                </Box>
                                <Box sx={{ width: "3%" }}>

                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '14px',
                                        }}
                                    >
                                        :
                                    </Typography>
                                </Box>

                                <Box sx={{ width: "62%", pl: 0.5 }}>
                                    <input type="text" autoComplete='off'
                                        style={{

                                            border: '0.5px solid grey',
                                            fontSize: '12px',
                                            textAlign: 'start',
                                            height: '18px',
                                            width: '300px',
                                            margin: '0px,0px,0px,0px',
                                            borderRadius: '3px'


                                        }}
                                        value={email}
                                        name="email"
                                        onChange={Changeemail}
                                    />

                                </Box>

                            </Box>
                            {/* Default Clinic */}
                            <Box sx={{
                                display: "flex", flexDirection: 'row', width: "100%",
                                alignItems: "center", pt: 0.2
                            }}>
                                <Box sx={{
                                    display: "flex", width: "33%",
                                    justifyContent: "flex-end"
                                }}>
                                    <Typography variant="body1"
                                        align='right'
                                        style={{
                                            fontSize: '12px',
                                            fontFamily: 'Arial'
                                        }}>
                                        Default Clinic
                                    </Typography>
                                </Box>


                                <Box sx={{ width: "2%" }}>

                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '13px',
                                            color: 'red',
                                            fontWeight: 'bold'
                                        }}
                                    >

                                    </Typography>
                                </Box>
                                <Box sx={{ width: "3%" }}>

                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '13px',
                                        }}
                                    >
                                        :
                                    </Typography>
                                </Box>
                                <Box sx={{ width: "62%", pl: 0.5 }}>

                                    <select
                                        defaultValue={0}
                                        variant="outlined"
                                        style={{

                                            height: 25,
                                            paddingBottom: 1,
                                            width: 200,
                                            BorderAllRounded: 1,
                                            fontSize: '12px',
                                            fontFamily: 'Arial',
                                            borderRadius: '3px'



                                        }}
                                        name="clinic"
                                        value={clinic}
                                        onChange={e => Getclinic(e)}>

                                        <option value="0">--Select--</option>
                                        <option value="1">Travancore Medical College & Hospital</option>

                                    </select>

                                </Box>

                            </Box>

                            {/* Default Module */}

                            <Box sx={{
                                display: "flex", flexDirection: 'row', width: "100%",
                                alignItems: "center", pt: 0.2
                            }}>
                                <Box sx={{
                                    display: "flex", width: "33%",
                                    justifyContent: "flex-end"
                                }}>
                                    <Typography variant="body1"
                                        align='right'
                                        style={{
                                            fontSize: '12px',
                                            fontFamily: 'Arial',

                                        }}>
                                        Default Module
                                    </Typography>
                                </Box>


                                <Box sx={{ width: "2%" }}>

                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '13px',
                                            color: 'red',
                                            fontWeight: 'bold'
                                        }}
                                    >

                                    </Typography>
                                </Box>
                                <Box sx={{ width: "3%" }}>

                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '13px',
                                        }}
                                    >
                                        :
                                    </Typography>
                                </Box>
                                <Box sx={{ width: "62%", pl: 0.5 }}>

                                    <select
                                        defaultValue={0}
                                        variant="outlined"
                                        style={{

                                            height: 25,
                                            paddingBottom: 1,
                                            width: 200,
                                            BorderAllRounded: 1,
                                            fontSize: '12px',
                                            fontFamily: 'Arial',
                                            borderRadius: '3px'

                                        }}

                                        name="module"
                                        value={module}
                                        onChange={e => Getmodule(e)}>
                                        <option value="0">--Select--</option>

                                    </select>

                                </Box>

                            </Box>


                            {/* Doctor */}

                            <Box sx={{
                                display: "flex", flexDirection: 'row', width: "100%",
                                alignItems: "center", pt: 0.2
                            }}>
                                <Box sx={{
                                    display: "flex", width: "33%",
                                    justifyContent: "flex-end"
                                }}>
                                    <Typography variant="body1"
                                        align='right'
                                        style={{
                                            fontSize: '12px',
                                            fontFamily: 'Arial',
                                        }}>
                                        Doctor
                                    </Typography>
                                </Box>


                                <Box sx={{ width: "2%" }}>

                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '13px',
                                            color: 'red',
                                            fontWeight: 'bold'
                                        }}
                                    >

                                    </Typography>
                                </Box>
                                <Box sx={{ width: "3%" }}>

                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '13px',
                                        }}
                                    >
                                        :
                                    </Typography>
                                </Box>
                                <Box sx={{ width: "62%", pl: 0.5 }}>

                                    <select
                                        defaultValue={0}
                                        variant="outlined"
                                        style={{

                                            height: 25,
                                            paddingBottom: 1,
                                            width: 200,
                                            BorderAllRounded: 1,
                                            fontSize: '12px',
                                            fontFamily: 'Arial',
                                            borderRadius: '3px'

                                        }}
                                        name="doctor"
                                        value={doctor}
                                        onChange={e => Getdoctor(e)}
                                    >
                                        <option value="0">--Select--</option>

                                    </select>

                                </Box>

                            </Box>

                            {/* Lab Technician */}

                            <Box sx={{
                                display: "flex", flexDirection: 'row', width: "100%",
                                alignItems: "center", pt: 0.2
                            }}>
                                <Box sx={{
                                    display: "flex", width: "33%",
                                    justifyContent: "flex-end"
                                }}>
                                    <Typography variant="body1"
                                        align='right'
                                        style={{
                                            fontSize: '12px',
                                            fontFamily: 'Arial',
                                        }}>
                                        Lab Technician
                                    </Typography>
                                </Box>


                                <Box sx={{ width: "2%" }}>

                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '13px',
                                            color: 'red',
                                            fontWeight: 'bold'
                                        }}
                                    >

                                    </Typography>
                                </Box>
                                <Box sx={{ width: "3%" }}>

                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '13px',
                                        }}
                                    >
                                        :
                                    </Typography>
                                </Box>
                                <Box sx={{ width: "62%", pl: 0.5 }}>

                                    <select
                                        defaultValue={0}
                                        variant="outlined"
                                        style={{

                                            height: 25,
                                            paddingBottom: 1,
                                            width: 200,
                                            BorderAllRounded: 1,
                                            fontSize: '12px',
                                            fontFamily: 'Arial',
                                            borderRadius: '3px'

                                        }}

                                        name="lab"
                                        value={lab}
                                        onChange={e => Getlab(e)}
                                    >

                                        <option value="0">--Select--</option>

                                    </select>
                                </Box>

                            </Box>


                            {/* Nurse */}

                            <Box sx={{
                                display: "flex", flexDirection: 'row', width: "100%",
                                alignItems: "center", pt: 0.2
                            }}>
                                <Box sx={{
                                    display: "flex", width: "33%",
                                    justifyContent: "flex-end"
                                }}>
                                    <Typography variant="body1"
                                        align='right'
                                        style={{
                                            fontSize: '12px',
                                            fontFamily: 'Arial',
                                        }}>
                                        Nurse
                                    </Typography>
                                </Box>


                                <Box sx={{ width: "2%" }}>

                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '13px',
                                            color: 'red',
                                            fontWeight: 'bold'
                                        }}
                                    >

                                    </Typography>
                                </Box>
                                <Box sx={{ width: "3%" }}>

                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '13px',
                                        }}
                                    >
                                        :
                                    </Typography>
                                </Box>
                                <Box sx={{ width: "62%", pl: 0.5 }}>

                                    <select
                                        defaultValue={0}
                                        variant="outlined"
                                        style={{

                                            height: 25,
                                            paddingBottom: 1,
                                            width: 200,
                                            BorderAllRounded: 1,
                                            fontSize: '12px',
                                            fontFamily: 'Arial',
                                            borderRadius: '3px'

                                        }}

                                        name="nurse"
                                        value={nurse}
                                        onChange={e => Getnurse(e)}
                                    >
                                        <option value="0">--Select--</option>

                                    </select>
                                </Box>
                            </Box>

                            {/* Employee*/}

                            <Box sx={{
                                display: "flex", flexDirection: 'row', width: "100%",
                                alignItems: "center", pt: 0.2
                            }}>
                                <Box sx={{
                                    display: "flex", width: "33%",
                                    justifyContent: "flex-end"
                                }}>
                                    <Typography variant="body1"
                                        align='right'
                                        style={{
                                            fontSize: '12px',
                                            fontFamily: 'Arial',
                                        }}>
                                        Employee
                                    </Typography>
                                </Box>


                                <Box sx={{ width: "2%" }}>

                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '13px',
                                            color: 'red',
                                            fontWeight: 'bold'
                                        }}
                                    >

                                    </Typography>
                                </Box>
                                <Box sx={{ width: "3%" }}>

                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '13px',
                                        }}
                                    >
                                        :
                                    </Typography>
                                </Box>
                                <Box sx={{ width: "62%", pl: 0.5 }}>

                                    <select
                                        defaultValue={0}
                                        variant="outlined"
                                        style={{

                                            height: 25,
                                            paddingBottom: 1,
                                            width: 200,
                                            BorderAllRounded: 1,
                                            fontSize: '12px',
                                            fontFamily: 'Arial',
                                            borderRadius: '3px'


                                        }}

                                        name="employee"
                                        value={employee}
                                        onChange={e => Getemployee(e)}>

                                        <option value="0">--Select--</option>

                                    </select>
                                </Box>
                            </Box>


                            {/* Idle Timeout */}
                            <Box sx={{
                                display: "flex", flexDirection: 'row', width: "100%",
                                alignItems: "center", pt: 0.2
                            }}>
                                <Box sx={{
                                    display: "flex", width: "33%",
                                    justifyContent: "flex-end"
                                }}>
                                    <Typography variant="body1"
                                        align='right'
                                        style={{
                                            fontSize: '12px',
                                            fontFamily: 'Arial',
                                        }}>
                                        Idle Timeout
                                    </Typography>
                                </Box>


                                <Box sx={{ width: "2%" }}>

                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '13px',
                                            color: 'red',
                                            fontWeight: 'bold'
                                        }}
                                    >

                                    </Typography>
                                </Box>
                                <Box sx={{ width: "3%" }}>

                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '13px',
                                        }}
                                    >
                                        :
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", flexDirection: 'row', width: '62%' }}>
                                    <Box sx={{ flexDirection: 'row', pl: 0.5 }}>


                                        <input type="text"
                                            style={{
                                                border: '0.5px solid grey',
                                                fontSize: '12px',
                                                textAlign: 'start',
                                                height: '18px',
                                                width: '130px',
                                                margin: '0px,0px,0px,0px',
                                                borderRadius: '3px'

                                            }}
                                            value={time}
                                            name="time"
                                            changeTextValue={Changetime}
                                        />
                                    </Box>
                                    <Box sx={{ p: 0.5, flexDirection: 'row' }}>
                                        <Typography variant="body1"
                                            align='left'
                                            style={{
                                                fontSize: '13px',
                                                fontFamily: 'Arial'
                                            }}
                                        >
                                            Minute
                                        </Typography>

                                    </Box>
                                </Box>
                            </Box>


                            {/* password reset */}

                            <Box sx={{
                                display: "flex", flexDirection: 'row', width: "100%",
                                alignItems: "center", pt: 0
                            }}>
                                <Box sx={{
                                    display: "flex", width: "33%",
                                    justifyContent: "flex-end"
                                }}>
                                    <Typography variant="body1"
                                        align='right'
                                        style={{ fontSize: '12px' }}>
                                        Password Reset Next Login
                                    </Typography>
                                </Box>

                                <Box sx={{ width: "2%" }}>

                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '13px',
                                            color: 'red',
                                            fontWeight: 'bold'
                                        }}
                                    >

                                    </Typography>
                                </Box>
                                <Box sx={{ width: "3%" }}>

                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '13px',
                                        }}
                                    >
                                        :
                                    </Typography>
                                </Box>
                                <Box sx={{ width: "62%", alignItems: 'left', px: '0px' }}>

                                    <input type="checkbox"
                                        background='white'
                                        border='0.5px solid  #C4C4C4'

                                        style={{
                                            width: '15px',
                                            height: '15px'

                                        }}

                                        checked={pass}
                                        value={pass}
                                        name="pass"
                                        onChange={Changepass}
                                    >

                                    </input>

                                </Box>
                            </Box>

                            {/* Allow public */}
                            <Box sx={{
                                display: "flex", flexDirection: 'row', width: "100%",
                                alignItems: "center", pt: 0
                            }}>
                                <Box sx={{
                                    display: "flex", width: "33%",
                                    justifyContent: "flex-end"
                                }}>
                                    <Typography variant="body1"
                                        align='right'
                                        style={{ fontSize: '12px' }}>
                                        Allow Public Access
                                    </Typography>
                                </Box>


                                <Box sx={{ width: "2%" }}>

                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '13px',
                                            color: 'red',
                                            fontWeight: 'bold'
                                        }}
                                    >

                                    </Typography>
                                </Box>
                                <Box sx={{ width: "3%" }}>

                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '13px',
                                        }}
                                    >
                                        :
                                    </Typography>
                                </Box>
                                <Box sx={{ width: "62%", alignItems: 'left', px: '0px' }}>

                                    <input type="checkbox"
                                        background='white'
                                        border='0.5px solid  #C4C4C4'

                                        style={{
                                            width: '15px',
                                            height: '15px'

                                        }}
                                        checked={access}
                                        value={access}
                                        name="access"
                                        onChange={ChangeAccess}
                                    >

                                    </input>

                                </Box>
                            </Box>

                            {/* Billing User */}
                            <Box sx={{
                                display: "flex", flexDirection: 'row', width: "100%", height: 23,
                                alignItems: "center", pt: 0
                            }}>
                                <Box sx={{
                                    display: "flex", width: "33%",
                                    justifyContent: "flex-end"
                                }}>
                                    <Typography variant="body1"
                                        align='right'
                                        style={{ fontSize: '12px' }}>
                                        Billing User
                                    </Typography>
                                </Box>


                                <Box sx={{ width: "2%" }}>

                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '13px',
                                            color: 'red',
                                            fontWeight: 'bold'
                                        }}
                                    >

                                    </Typography>
                                </Box>
                                <Box sx={{ width: "3%", }}>

                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '13px',
                                        }}
                                    >
                                        :
                                    </Typography>
                                </Box>
                                <Box sx={{ width: "62%", alignItems: 'left', px: '0px' }}>
                                    <input type="checkbox"
                                        background='white'
                                        border='0.5px solid  #C4C4C4'

                                        style={{
                                            width: '15px',
                                            height: '15px'
                                        }}
                                        checked={billing}
                                        value={billing}
                                        name="billing"
                                        onChange={ChangeBillingUser}
                                    >

                                    </input>

                                </Box>
                            </Box>
                            {/* Active */}
                            <Box sx={{
                                display: "flex", flexDirection: 'row', width: "100%", height: 23,
                                alignItems: "center", pt: 0, pb: 1
                            }}>
                                <Box sx={{
                                    display: "flex", width: "33%",
                                    justifyContent: "flex-end"
                                }}>
                                    <Typography variant="body1"
                                        align='right'
                                        style={{ fontSize: '12px' }}>
                                        Active
                                    </Typography>
                                </Box>


                                <Box sx={{ width: "2%" }}>

                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '13px',
                                            color: 'red',
                                            fontWeight: 'bold'
                                        }}
                                    >

                                    </Typography>
                                </Box>
                                <Box sx={{ width: "3%" }}>

                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '13px',
                                        }}
                                    >
                                        :
                                    </Typography>
                                </Box>
                                <Box sx={{ width: "62%", alignItems: 'left', px: '0px' }}>
                                    <input type="checkbox"

                                        background='white'
                                        border='0.5px solid  #C4C4C4'

                                        style={{
                                            width: '14px',
                                            height: '15px'
                                        }}
                                        value={active}
                                        name="active"
                                        checked={active}
                                        onChange={(e) => ChangeActive(e)}

                                    >
                                    </input>

                                </Box>
                            </Box>
                            <Divider flexItem sx={{ borderBlockColor: 'grey' }}></Divider>

                            <Box sx={{
                                p: 1,
                                display: "flex",
                                flexDirection: 'column',
                                width: "100%",
                                height: '100px',
                                alignItems: "center"
                            }}>

                                <Box sx={{ display: "flex", flexDirection: 'row', pt: 1 }}>

                                    <button
                                        style={{
                                            backgroundColor: '#dbdbdb)',
                                            fontSize: '12px',
                                            borderRadius: '5px',
                                            boxShadow: '0px 0px 0px, inset 0px 0px 0px ',
                                            padding: '4px',
                                            cursor: 'pointer',
                                            width: '75px',
                                            borderSpacing: '0.5px',
                                            boxSizing: 'border-box',
                                            // color: 'ButtonText',
                                            borderCollapse: 'separate',
                                            fontFamily: 'Arial'


                                        }}
                                        onClick={SaveUserDetails}
                                    >
                                        Save
                                    </button>

                                    <Box sx={{ pl: 1, flexDirection: 'row', display: "flex" }}>
                                        <button
                                            style={{
                                                backgroundColor: '#dbdbdb)',
                                                fontSize: '12px',
                                                borderRadius: '5px',
                                                boxShadow: '0px 0px 0px, inset 0px 0px 0px ',
                                                padding: '4px',
                                                cursor: 'pointer',
                                                width: '75px',
                                                borderSpacing: '1px',
                                                boxSizing: 'border-box',
                                                // color: 'ButtonText',
                                                borderCollapse: 'separate',
                                                fontFamily: 'Arial'

                                            }}
                                            onClick={ClearUserDetails}
                                        >
                                            Cancel
                                        </button>
                                    </Box>

                                    <Box sx={{ pl: 1, flexDirection: 'row', display: "flex" }}>
                                        <button
                                            style={{
                                                backgroundColor: '#dbdbdb)',
                                                fontSize: '12px',
                                                borderRadius: '5px',
                                                boxShadow: '0px 0px 0px, inset 0px 0px 0px ',
                                                padding: '4px',
                                                cursor: 'pointer',
                                                width: '75px',
                                                borderSpacing: '1px',
                                                boxSizing: 'border-box',
                                                color: 'ButtonText',
                                                borderCollapse: 'separate',
                                                fontFamily: 'Arial'



                                            }}
                                            onClick={ViewUserData}
                                        >
                                            View
                                        </button>
                                    </Box>
                                    <Box sx={{ pl: 1, flexDirection: 'row', display: "flex" }}>
                                        <button
                                            style={{
                                                backgroundColor: '#dbdbdb)',
                                                fontSize: '12px',
                                                borderRadius: '5px',
                                                boxShadow: '0px 0px 0px, inset 0px 0px 0px ',
                                                padding: '4px',
                                                cursor: 'pointer',
                                                width: '75px',
                                                borderSpacing: '1px',
                                                boxSizing: 'border-box',
                                                color: 'ButtonText',
                                                borderCollapse: 'separate',
                                                fontFamily: 'Arial'



                                            }}
                                            onClick={PreviewUserDetails}
                                        >
                                            Preview
                                        </button>
                                    </Box>
                                    <Box sx={{ pl: 1, flexDirection: 'row', display: "flex" }}>
                                        <button
                                            style={{
                                                backgroundColor: '#dbdbdb)',
                                                fontSize: '12px',
                                                borderRadius: '5px',
                                                boxShadow: '0px 0px 0px, inset 0px 0px 0px ',
                                                padding: '4px',
                                                cursor: 'pointer',
                                                width: '75px',
                                                borderSpacing: '1px',
                                                boxSizing: 'border-box',
                                                color: 'ButtonText',
                                                borderCollapse: 'separate',
                                                fontFamily: 'Arial'


                                            }}
                                            onClick={ClearUserDetails}
                                        >
                                            Close
                                        </button>
                                    </Box>

                                </Box>

                            </Box>


                        </Box>
                    </Box>
            }
        </Fragment>
    )
}

export default UserCreation