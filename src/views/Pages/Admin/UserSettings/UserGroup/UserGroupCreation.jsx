import { Box, Divider, Typography } from '@mui/material'
import React, { useCallback, useState, useMemo } from 'react'
import { Fragment } from 'react'
import { ToastContainer } from 'react-toastify'
import { succesNofity, warningNofity } from '../../../../../Constant/Constants'
import { axiosinstance } from '../../../../../controllers/AxiosConfig'
import ViewUserGroup from './ViewUserGroup'
import { UserGroupPreview } from './UserGroupPreview'
import { useNavigate } from 'react-router-dom'

const UserGroupCreation = () => {
    const navigate = useNavigate();
    const [group, setGroup] = useState('')
    const [expiry, setExpiry] = useState(0)
    const [active, setActive] = useState(true)
    const [flag, setFlag] = useState(0)
    const [view, setView] = useState([])
    const [groupid, setGroupid] = useState(0)
    const [edit, setEdit] = useState(0)
    const [preview, setPreview] = useState([])

    const ChangeGroup = (e) => {
        setGroup(e.target.value)
    }

    const ChangeExpiryDays = (e) => {
        setExpiry(e.target.value)
    }

    const ChangeActive = (e) => {
        if (e.target.checked === true) {
            setActive(true)
        }
        else {
            setActive(false)

        }
    }
    const postdata = useMemo(() => {
        return {
            user_group_name: group,
            pass_expiry_days: expiry,
            user_group_active: active === true ? '1' : '0'
        }
    }, [group, expiry, active])

    const patchdata = useMemo(() => {
        return {
            user_group_id: groupid,
            user_group_name: group,
            pass_expiry_days: expiry,
            user_group_active: active === true ? '1' : '0'
        }
    }, [groupid, group, expiry, active])
    const SaveUserGroupdetails = useCallback((e) => {

        const SaveUserGroup = async () => {
            if (group === '') {
                warningNofity("Enter User Group")
            }
            else {
                const results = await axiosinstance.post('/usergroup/insertgroup', postdata)
                const { success, message } = results.data
                if (success === 1) {
                    succesNofity(message);
                    ClearUserGroup();
                }
                else if (success === 7) {
                    warningNofity(message)
                }
                else {
                    warningNofity(message);
                }
            }
        }

        const UserGroupUpdate = async () => {
            if (group === '') {
                warningNofity("Enter User Group")
            }
            else {
                const results = await axiosinstance.patch('/usergroup/update', patchdata)
                const { success, message } = results.data
                if (success === 2) {
                    succesNofity(message);
                    ClearUserGroup();
                }
                else if (success === 7) {
                    warningNofity(message)
                }
                else {
                    warningNofity(message);
                }
            }
        }

        if (edit === 1) {
            UserGroupUpdate(patchdata)
        }
        else {
            SaveUserGroup(postdata);
        }
    }, [postdata, patchdata, edit, group])

    const ClearUserGroup = useCallback(() => {
        setGroup('')
        setExpiry(0)
        setActive(true)
    }, [])

    const ViewUserGroupDetails = useCallback(() => {
        const getdata = async () => {
            const result = await axiosinstance.get('/usergroup/select')
            const { success, message, data } = result.data
            if (success === 2) {
                setView(data)
                setFlag(1)
            }
            else {
                succesNofity(message);
            }
        }
        getdata()

    }, [])

    const editView = useCallback((val) => {
        setFlag(0)
        const { user_group_id, user_group_name, pass_expiry_days, user_group_active } = val
        setGroupid(user_group_id)
        setGroup(user_group_name)
        setExpiry(pass_expiry_days)
        setActive(user_group_active === 1 ? true : false)
        setEdit(1)

    }, [])


    const PreviewUserGroup = useCallback(() => {
        const getdata = async () => {
            const result = await axiosinstance.get('/usergroup/select')
            const { success, message, data } = result.data
            if (success === 2) {
                setView(data)
                const viewdata = data && data.map((val) => {
                    const obj = {
                        user_group_id: val.user_group_id,
                        user_group_name: val.user_group_name,
                        user_group_active: (val.user_group_active) === 1 ? "Yes" : "No",
                        pass_expiry_days: (val.pass_expiry_days)
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

    const Closepage = useCallback(() => {
        navigate("/Menu/Admin")
        ClearUserGroup();
    }, [])
    return (
        <Fragment>
            <ToastContainer />
            {
                flag === 1 ? <ViewUserGroup setFlag={setFlag} view={view} setView={setView} EditUser={editView} ClearData={ClearUserGroup} /> :
                    flag === 2 ? <UserGroupPreview setFlag={setFlag} view={view} preview={preview} ClearData={ClearUserGroup} /> :
                        <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: "center", width: "100%", pt: 2 }}>
                            <Box sx={{ display: "flex", flexDirection: 'column', borderRadius: '1px', flex: 1 }}>   </Box>

                            <Box sx={{
                                display: "flex", flexDirection: 'column', borderRadius: '3px', border: '1px solid grey', flex: 1.3, height: '190px',

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
                                        User Group
                                    </Typography>
                                </Box>

                                {/* Group name */}
                                <Box sx={{ display: "flex", pt: 2, width: "100%" }}>
                                    <Box sx={{ display: "flex", width: "24%", justifyContent: "flex-end", pr: 0.5 }}>
                                        <Typography variant="body1"
                                            align='right'
                                            style={{
                                                fontSize: '12px',
                                                fontFamily: 'Arial',
                                            }}>
                                            Group
                                        </Typography>

                                    </Box>

                                    <Box sx={{ display: "flex", width: "2%", }}>
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

                                    <Box sx={{ display: "flex", width: "2%" }}>
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
                                                height: '18px',
                                                width: '95%',
                                                margin: '0px,0px,0px,0px',
                                                borderRadius: '3px',
                                            }}
                                            value={group}
                                            name="group"
                                            onChange={ChangeGroup}

                                        />
                                    </Box>
                                </Box>

                                {/* Password Expiry Days */}
                                <Box sx={{ display: "flex", pt: 0.5, width: "100%" }}>
                                    <Box sx={{ display: "flex", width: "24%", justifyContent: "flex-end", pr: 0.5 }}>
                                        <Typography variant="body1"
                                            align='right'
                                            style={{
                                                fontSize: '12px',
                                                fontFamily: 'Arial',
                                            }}>
                                            Password Expiry Days
                                        </Typography>

                                    </Box>

                                    <Box sx={{ display: "flex", width: "2%", }}>
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

                                    <Box sx={{ display: "flex", width: "2%", }}>
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
                                                textAlign: 'start',
                                                height: '18px',
                                                width: '170px',
                                                margin: '0px,0px,0px,0px',
                                                borderRadius: '3px',

                                            }}
                                            value={expiry}
                                            name="expiry"
                                            onChange={ChangeExpiryDays}
                                        />
                                    </Box>
                                </Box>

                                {/* Active*/}
                                <Box sx={{ display: "flex", pt: 0.3, width: "100%" }}>
                                    <Box sx={{ display: "flex", width: "24%", justifyContent: "flex-end", pr: 0.5 }}>
                                        <Typography variant="body1"
                                            align='right'
                                            style={{
                                                fontSize: '12px',
                                                fontFamily: 'Arial',
                                            }}>
                                            Active
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: "flex", width: "2%", }}>
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

                                    <Box sx={{ display: "flex", width: "2%", }}>
                                        <Typography variant="body1"
                                            align='center'
                                            style={{
                                                fontSize: '14px',
                                            }}
                                        >
                                            :
                                        </Typography>
                                    </Box>

                                    <Box sx={{ width: "72%", alignItems: 'left', px: '0px' }}>
                                        <input type="checkbox"
                                            background='white'
                                            border='0.5px solid  #C4C4C4'
                                            style={{
                                                width: '14px',
                                                height: '15px',
                                                color: 'black'
                                            }}
                                            value={active}
                                            name="active"
                                            checked={active}
                                            onChange={(e) => ChangeActive(e)}
                                        >
                                        </input>
                                    </Box>
                                </Box>


                                <Box sx={{ pt: 2 }}>
                                    <Divider flexItem sx={{ borderBlockColor: 'grey' }}></Divider>
                                </Box>

                                <Box sx={{ display: "flex", flexDirection: 'column', alignItems: "center" }}>

                                    <Box sx={{ flexDirection: 'row', display: "flex", pt: 1 }}>
                                        <button
                                            style={{
                                                boxShadow: '0px 0.1px 0.1px rgba(000,000,000,0.1), inset 0px 0px 0px rgba(255,255,255,0.1)',
                                                background: '-webkit-gradient( linear, left top, left bottom, from(#ffffff), color-stop(0.50, #ebebeb), color-stop(0.50, #dbdbdb), to(#ECEBEB))',
                                                backgroundColor: '#ffffff)',
                                                fontSize: '12px',
                                                borderRadius: '5px',
                                                padding: '4px',
                                                cursor: 'pointer',
                                                width: '63px',
                                                height: '25px',
                                                borderSpacing: '1px',
                                                borderColor: 'whitesmoke',
                                                fontFamily: 'Arial',
                                                fontWeight: 'bold',
                                            }}
                                            onClick={SaveUserGroupdetails}
                                        >
                                            Save
                                        </button>

                                        <Box sx={{ flexDirection: 'row', display: "flex" }}>
                                            <button
                                                style={{
                                                    boxShadow: '0px 0.1px 0.1px rgba(000,000,000,0.1), inset 0px 0px 0px rgba(255,255,255,0.1)',
                                                    background: '-webkit-gradient( linear, left top, left bottom, from(#ffffff), color-stop(0.50, #ebebeb), color-stop(0.50, #dbdbdb), to(#ECEBEB))',
                                                    backgroundColor: '#ffffff)',
                                                    fontSize: '12px',
                                                    borderRadius: '5px',
                                                    padding: '4px',
                                                    cursor: 'pointer',
                                                    width: '63px',
                                                    height: '25px',
                                                    borderSpacing: '1px',
                                                    borderColor: 'whitesmoke',
                                                    fontFamily: 'Arial',
                                                    fontWeight: 'bold',
                                                }}
                                                onClick={ClearUserGroup}
                                            >
                                                Cancel
                                            </button>
                                        </Box>
                                        <Box sx={{ pl: 0.2, flexDirection: 'row', display: "flex" }}>
                                            <button
                                                style={{
                                                    boxShadow: '0px 0.1px 0.1px rgba(000,000,000,0.1), inset 0px 0px 0px rgba(255,255,255,0.1)',
                                                    background: '-webkit-gradient( linear, left top, left bottom, from(#ffffff), color-stop(0.50, #ebebeb), color-stop(0.50, #dbdbdb), to(#ECEBEB))',
                                                    backgroundColor: '#ffffff)',
                                                    fontSize: '12px',
                                                    borderRadius: '5px',
                                                    padding: '4px',
                                                    cursor: 'pointer',
                                                    width: '63px',
                                                    height: '25px',
                                                    borderSpacing: '1px',
                                                    borderColor: 'whitesmoke',
                                                    fontFamily: 'Arial',
                                                    fontWeight: 'bold',
                                                }}
                                                onClick={ViewUserGroupDetails}
                                            >
                                                View
                                            </button>
                                        </Box>
                                        <Box sx={{ pl: 0.2, flexDirection: 'row', display: "flex" }}>
                                            <button
                                                style={{
                                                    boxShadow: '0px 0.1px 0.1px rgba(000,000,000,0.1), inset 0px 0px 0px rgba(255,255,255,0.1)',
                                                    background: '-webkit-gradient( linear, left top, left bottom, from(#ffffff), color-stop(0.50, #ebebeb), color-stop(0.50, #dbdbdb), to(#ECEBEB))',
                                                    backgroundColor: '#ffffff)',
                                                    fontSize: '12px',
                                                    borderRadius: '5px',
                                                    padding: '4px',
                                                    cursor: 'pointer',
                                                    width: '63px',
                                                    height: '25px',
                                                    borderSpacing: '1px',
                                                    borderColor: 'whitesmoke',
                                                    fontFamily: 'Arial',
                                                    fontWeight: 'bold',
                                                }}
                                                onClick={PreviewUserGroup}
                                            >
                                                Preview
                                            </button>
                                        </Box>
                                        <Box sx={{ pl: 0.2, flexDirection: 'row', display: "flex" }}>
                                            <button
                                                style={{
                                                    boxShadow: '0px 0.1px 0.1px rgba(000,000,000,0.1), inset 0px 0px 0px rgba(255,255,255,0.1)',
                                                    background: '-webkit-gradient( linear, left top, left bottom, from(#ffffff), color-stop(0.50, #ebebeb), color-stop(0.50, #dbdbdb), to(#ECEBEB))',
                                                    backgroundColor: '#ffffff)',
                                                    fontSize: '12px',
                                                    borderRadius: '5px',
                                                    padding: '4px',
                                                    cursor: 'pointer',
                                                    width: '63px',
                                                    height: '25px',
                                                    borderSpacing: '1px',
                                                    borderColor: 'whitesmoke',
                                                    fontFamily: 'Arial',
                                                    fontWeight: 'bold',
                                                }}
                                                onClick={Closepage}
                                            >
                                                Close
                                            </button>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", flexDirection: 'column', borderRadius: '3px', flex: 1 }}>   </Box>
                        </Box>
            }
        </Fragment >
    )
}

export default UserGroupCreation