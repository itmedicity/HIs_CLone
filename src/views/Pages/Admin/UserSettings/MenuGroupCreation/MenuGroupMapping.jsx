import { Box, Divider, Typography } from '@mui/material'
import React, { Fragment, useCallback, useState, useMemo } from 'react'
import { ToastContainer } from 'react-toastify'
import ModuleGroupComp from '../CommonComponents/ModuleGroupSelect'
import MenuGroupComp from '../CommonComponents/MenuGroupSelect'
import { succesNofity, warningNofity } from '../../../../../Constant/Constants'
import { axiosinstance } from '../../../../../controllers/AxiosConfig'
import { useNavigate } from 'react-router-dom'
import { ViewMenuDetails } from './ViewMenuDetails'
const MenuGroupMapping = () => {
    const navigate = useNavigate();
    const [module, setModule] = useState(0)
    const [menugroup, setMenugroup] = useState(0)
    const [submenu, setSubmenu] = useState('')
    const [active, setActive] = useState(true)
    const [flag, setFlag] = useState(0)
    const [view, setView] = useState([])
    const [menuid, setMenuid] = useState(0)
    const [edit, setEdit] = useState(0)


    // const GetMenuGroup = (e) => {
    //     setMenugroup(e.target.value)
    // }
    // const GetModule = (e) => {
    //     setModule(e.target.value)
    // }
    const GetSubMenu = (e) => {
        setSubmenu(e.target.value)
    }
    const ChangeActive = (e) => {
        if (e.target.checked === true) {
            setActive(true)
        }
        else {
            setActive(false)
        }
    }
    const ClearMenuDetails = useCallback(() => {
        setModule(0)
        setMenugroup(0)
        setSubmenu('')
        setFlag(0)
        setEdit(0)
        setActive(true)
        setView([])
        setMenuid(0)
    })
    const Closepage = useCallback(() => {
        navigate("/Menu/Admin")
        ClearMenuDetails();
    }, [])
    const postdata = useMemo(() => {
        return {
            module_id: module,
            menugroup_id: menugroup,
            menu_name: submenu,
            menuname_active: active === true ? '1' : '0'
        }
    }, [module, menugroup, submenu, active])

    const patchdata = useMemo(() => {
        return {
            menuname_id: menuid,
            module_id: module,
            menugroup_id: menugroup,
            menu_name: submenu,
            menuname_active: active === true ? '1' : '0'
        }
    }, [menuid, module, menugroup, submenu, active])

    const SaveMenuDetails = useCallback((e) => {
        const MenuDetails = async () => {
            if (module === 0) {
                warningNofity("Select Module")
            }
            else if (menugroup === 0) {
                warningNofity("Select Menu")
            }
            else if (submenu === "") {
                warningNofity("Enter Menu Name")
            }

            else {
                const result = await axiosinstance.post('/menugroups/insert', postdata)
                const { success, message } = result.data
                if (success === 1) {
                    succesNofity(message);
                    ClearMenuDetails();
                }
                else if (success === 7) {
                    warningNofity(message)
                }
                else {
                    warningNofity(message);
                }

            }
        }

        const MenuDetailsUpdate = async () => {
            if (module === 0) {
                warningNofity("Select Module")
            }
            else if (menugroup === 0) {
                warningNofity("Select Menu")
            }
            else if (submenu === "") {
                warningNofity("Enter Menu Name")
            }

            else {
                const results = await axiosinstance.patch('/menugroups/update', patchdata)
                const { success, message } = results.data
                if (success === 2) {
                    succesNofity(message);
                    ClearMenuDetails();
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
            MenuDetailsUpdate(patchdata)
        }
        else {
            MenuDetails(postdata);
        }
    }, [module, menugroup, submenu, postdata, patchdata])


    const ViewMenuData = useCallback(() => {
        const getdata = async () => {
            const result = await axiosinstance.get('/menugroups/select')
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
        const { menuname_id, module_id, menugroup_id, menu_name, menuname_active } = val
        setMenuid(menuname_id)
        setModule(module_id)
        setMenugroup(menugroup_id)
        setSubmenu(menu_name)
        setActive(menuname_active === 1 ? true : false)
        setEdit(1)


    }, [])

    return (
        <Fragment>
            <ToastContainer />
            {
                flag === 1 ? <ViewMenuDetails setFlag={setFlag} view={view} setView={setView} EditUser={editView} ClearData={ClearMenuDetails} /> :
                    <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: "center", width: "100%", pt: 2 }}>
                        <Box sx={{ display: "flex", flexDirection: 'column', borderRadius: '1px', flex: 1 }}>   </Box>
                        <Box sx={{
                            display: "flex", flexDirection: 'column', borderRadius: '3px', border: '1px solid grey', flex: 1.5, height: '220px',
                        }}>
                            <Box sx={{
                                display: "flex",
                                flexDirection: 'row',
                                justifyContent: 'left',
                                backgroundColor: '#525252',
                                fontWeight: 'bold',
                                textAlign: 'left',
                                height: '26px',
                                pl: 1,
                                pt: 1,
                                flexShrink: 3
                            }}>
                                <Typography
                                    variant="body1"
                                    style={{
                                        color: "whitesmoke",
                                        fontSize: '13px',
                                        fontFamily: 'Arial',
                                        fontWeight: 'bold',
                                    }} >
                                    Menu Group
                                </Typography>
                            </Box>

                            {/* module */}
                            <Box
                                sx={{
                                    display: "flex", flexDirection: 'row', width: "100%", alignItems: "center", pt: 1
                                }}>
                                <Box sx={{
                                    display: "flex", width: "35%", justifyContent: "flex-end"
                                }}>
                                    <Typography variant="body1"
                                        align='right'
                                        style={{
                                            fontSize: '12px',
                                            fontFamily: 'Arial',
                                        }}>
                                        Module
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
                                    <ModuleGroupComp
                                        value={module}
                                        setValue={setModule}
                                    // onChange={e => GetModule(e)} 
                                    />

                                </Box>

                            </Box>

                            {/* menu */}
                            <Box
                                sx={{
                                    display: "flex", flexDirection: 'row', width: "100%", alignItems: "center", pt: 1
                                }}>
                                <Box sx={{
                                    display: "flex", width: "35%", justifyContent: "flex-end"
                                }}>
                                    <Typography variant="body1"
                                        align='right'
                                        style={{
                                            fontSize: '12px',
                                            fontFamily: 'Arial',
                                        }}>
                                        Menu Group
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
                                    <MenuGroupComp
                                        value={menugroup}
                                        setValue={setMenugroup}
                                        module={module}
                                    // onChange={e => GetMenuGroup(e)}
                                    />

                                </Box>

                            </Box>
                            {/* submenu */}
                            <Box
                                sx={{
                                    display: "flex", flexDirection: 'row', width: "100%", alignItems: "center", pt: 1
                                }}>
                                <Box sx={{
                                    display: "flex", width: "35%", justifyContent: "flex-end"
                                }}>
                                    <Typography variant="body1"
                                        align='right'
                                        style={{
                                            fontSize: '12px',
                                            fontFamily: 'Arial',
                                        }}>
                                        Menu Name
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
                                            height: '20px',
                                            width: '205px',
                                            margin: '0px,0px,0px,0px',
                                            borderRadius: '3px',
                                        }}
                                        value={submenu}
                                        name="submenu"
                                        onChange={(e) => GetSubMenu(e)} />

                                </Box>

                            </Box>


                            {/* active */}

                            <Box sx={{
                                display: "flex", flexDirection: 'row', width: "100%", alignItems: "center", pt: 1
                            }}>
                                <Box sx={{
                                    display: "flex", width: "35%", justifyContent: "flex-end"
                                }}>
                                    <Typography variant="body1"
                                        align='right'
                                        style={{ fontSize: '12px' }}>
                                        Status
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

                            <Box sx={{ display: "flex", flexDirection: 'column' }}>
                                <Divider flexItem sx={{ borderBlockColor: 'grey', pt: 1.5 }}></Divider>
                            </Box>

                            <Box sx={{ flex: 1, display: "flex", flexDirection: 'row', justifyContent: 'center', pt: 1 }}>
                                <Box sx={{ display: "flex", }}>
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
                                            height: '26px',
                                            borderSpacing: '1px',
                                            borderColor: 'whitesmoke',
                                            fontFamily: 'Arial',
                                            fontWeight: 'bold',
                                        }}
                                        onClick={SaveMenuDetails}
                                    >
                                        Save
                                    </button>
                                </Box>

                                <Box sx={{ display: "flex", pl: 0.5 }}>
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
                                            height: '26px',
                                            borderSpacing: '1px',
                                            borderColor: 'whitesmoke',
                                            fontFamily: 'Arial',
                                            fontWeight: 'bold',
                                        }}
                                        onClick={ClearMenuDetails}
                                    >
                                        Cancel
                                    </button>
                                </Box>
                                <Box sx={{ display: "flex", pl: 0.5 }}>
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
                                            height: '26px',
                                            borderSpacing: '1px',
                                            borderColor: 'whitesmoke',
                                            fontFamily: 'Arial',
                                            fontWeight: 'bold',
                                        }}
                                        onClick={ViewMenuData}
                                    >
                                        View
                                    </button>
                                </Box>
                                <Box sx={{ display: "flex", pl: 0.5 }}>
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
                                            height: '26px',
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
                        <Box sx={{ display: "flex", flexDirection: 'column', borderRadius: '1px', flex: 1 }}>   </Box>
                    </Box>
            }
        </Fragment >
    )
}

export default MenuGroupMapping