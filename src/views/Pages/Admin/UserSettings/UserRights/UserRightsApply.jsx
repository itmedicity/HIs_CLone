import { Box, Divider, Table, TableContainer, TableHead, TableRow, Typography, TableCell, TableBody } from '@mui/material'
import React, { Fragment, useCallback, useState, useMemo, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import UserGroupComp from '../CommonComponents/UserGroupSelect';
import MenuGroupComp from '../CommonComponents/MenuGroupSelect';
import ModuleGroupComp from '../CommonComponents/ModuleGroupSelect';
import { axiosinstance } from '../../../../../controllers/AxiosConfig';
import { succesNofity, warningNofity } from '../../../../../Constant/Constants';

const UserRightsApply = () => {
    const navigate = useNavigate();
    const [module, setModule] = useState(0)
    const [menugroup, setMenugroup] = useState(0)
    const [usergroup, setUsergroup] = useState(0)
    const [flag, setFlag] = useState(0)
    const [view, setView] = useState([])
    const [viewrights, setViewRights] = useState([])
    const [insertarray, setInsertarray] = useState([])
    const [disarray, setDisArray] = useState([])

    const ChangeView = async (e, val) => {
        if (e === true) {
            let viewselect = insertarray.map((value) => {
                return value.menuname_id === val.menuname_id ? { ...value, view_menu: 1, } : value
            })
            setInsertarray(viewselect)
            setDisArray(viewselect)
        }
        else {
            let viewselect = insertarray.map((value) => {
                return value.menuname_id === val.menuname_id ? { ...value, view_menu: 0, } : value
            })
            setInsertarray(viewselect)
            setDisArray(viewselect)
        }
    }

    const ChangePdf = async (e, val) => {
        if (e === true) {
            let viewselect = insertarray.map((value) => {
                return value.menuname_id === val.menuname_id ? { ...value, pdf_view: 1, } : value
            })
            setInsertarray(viewselect)
            setDisArray(viewselect)
        }
        else {
            let viewselect = insertarray.map((value) => {
                return value.menuname_id === val.menuname_id ? { ...value, pdf_view: 0, } : value
            })
            setInsertarray(viewselect)
            setDisArray(viewselect)
        }
    }
    const ChangeExcel = async (e, val) => {
        if (e === true) {
            let viewselect = insertarray.map((value) => {
                return value.menuname_id === val.menuname_id ? { ...value, excel_view: 1, } : value
            })
            setInsertarray(viewselect)
            setDisArray(viewselect)
        }
        else {
            let viewselect = insertarray.map((value) => {
                return value.menuname_id === val.menuname_id ? { ...value, excel_view: 0, } : value
            })
            setInsertarray(viewselect)
            setDisArray(viewselect)
        }
    }


    const ClearDetails = useCallback(() => {
        setModule(0)
        setMenugroup(0)
        setUsergroup(0)
        setFlag(0)
        setView([])
        setInsertarray([])
        setViewRights([])
    }, [])

    const PageClose = useCallback(() => {
        navigate("/Menu/Admin")
        ClearDetails();

    }, [])

    useEffect(() => {
        if (view.length !== 0 && viewrights.length !== 0) {
            const menuidnot = view.filter((val) => {
                return !viewrights.find((value) => value.menuname_id === val.menuname_id)
            })
            const newdata = viewrights && viewrights.map((val) => {
                const obj = {
                    SlNo: val.SlNo,
                    user_group_id: usergroup,
                    module_id: val.module_id,
                    menugroup_id: val.menugroup_id,
                    menuname_id: val.menuname_id,
                    menugroup_name: val.menugroup_name,
                    menu_name: val.menu_name,
                    view_menu: val.view_menu,
                    pdf_view: val.pdf_view,
                    excel_view: val.excel_view
                }
                return obj
            })
            const newmenudetail = menuidnot && menuidnot.map((val) => {
                const obj = {
                    SlNo: val.SlNo,
                    user_group_id: usergroup,
                    module_id: val.module_id,
                    menugroup_id: val.menugroup_id,
                    menuname_id: val.menuname_id,
                    menugroup_name: val.menugroup_name,
                    menu_name: val.menu_name,
                    view_menu: 0,
                    pdf_view: 0,
                    excel_view: 0,
                }
                return obj
            })
            const newarray = [...newdata, ...newmenudetail]
            setDisArray(newarray)
            setInsertarray(newarray)
        }

        else if (view.length !== 0 && viewrights.length === 0) {
            const newmenudetail = view && view.map((val) => {
                const obj = {
                    SlNo: val.SlNo,
                    user_group_id: usergroup,
                    module_id: val.module_id,
                    menugroup_id: val.menugroup_id,
                    menuname_id: val.menuname_id,
                    menugroup_name: val.menugroup_name,
                    menu_name: val.menu_name,
                    view_menu: 0,
                    pdf_view: 0,
                    excel_view: 0,
                }
                return obj
            })
            const newarray = [...newmenudetail]
            setDisArray(newarray)
            setInsertarray(newarray)
        }

    }, [view, viewrights])


    const postdata = useMemo(() => {
        return {
            module_id: module,
            menugroup_id: menugroup,
            user_group_id: usergroup
        }
    }, [module, menugroup, usergroup])


    const SearchUserRights = useCallback((e) => {
        // user rights are already exist
        const getMenudata = async (postdata) => {
            const result = await axiosinstance.post('/userrights/select', postdata)
            const { success, message, data } = result.data
            if (success === 2) {

                const newdata = data && data.map((val) => {
                    const obj = {
                        SlNo: val.SlNo,
                        user_group_id: usergroup,
                        module_id: val.module_id,
                        menugroup_id: val.menugroup_id,
                        menuname_id: val.menuname_id,
                        menugroup_name: val.menugroup_name,
                        menu_name: val.menu_name,
                        view_menu: val.view_menu,
                        pdf_view: val.pdf_view,
                        excel_view: val.excel_view
                    }
                    return obj
                })

                setViewRights(newdata)

                setFlag(1)
            }
            else {
                setFlag(1)
            }
        }

        // menudetails table
        const getdata = async (postdata) => {
            const result = await axiosinstance.post('/menugroups/getmenu', postdata)
            const { success, message, data } = result.data
            if (success === 2) {
                setView(data)
                const newdata = data && data.map((val) => {
                    const obj = {
                        SlNo: val.SlNo,
                        user_group_id: usergroup,
                        module_id: val.module_id,
                        menugroup_id: val.menugroup_id,
                        menuname_id: val.menuname_id,
                        menugroup_name: val.menugroup_name,
                        menu_name: val.menu_name,
                        view_menu: 0,
                        pdf_view: 0,
                        excel_view: 0
                    }
                    return obj
                })
                setInsertarray(newdata)
                setFlag(1)
            }
            else {
                setFlag(0)
            }
        }

        if (usergroup === 0) {
            warningNofity("Select User Group")
        }
        else {
            setDisArray([])
            setInsertarray([])
            setViewRights([])
            setView([])
            getdata(postdata)
            getMenudata(postdata)
        }

    }, [postdata, usergroup, menugroup])

    const SaveUserRights = useCallback(() => {
        const UserrightsInsert = async (menuidnot) => {
            const result = await axiosinstance.post('/userrights/insert', menuidnot)
            const { success, message } = result.data
            if (success === 1) {

                ClearDetails();
            }
            else {
            }
        }
        const UserrightsUpdate = async (disarray) => {
            const result = await axiosinstance.post('/userrights/update', disarray)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message);
                ClearDetails();
            }
            else {
                warningNofity(message);

            }
        }
        const menuidnot = disarray.filter((val) => {
            return !viewrights.find((value) => value.menuname_id === val.menuname_id)
        })

        if (menuidnot.length !== 0) {
            UserrightsInsert(menuidnot);
            UserrightsUpdate(disarray)
        }
        else {
            UserrightsUpdate(disarray)
        }

    }, [insertarray, disarray, viewrights])



    return (
        <Fragment>
            <ToastContainer />
            <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: "center", width: "100%", pt: 2 }}>
                <Box sx={{ display: "flex", flexDirection: 'column', borderRadius: '1px', flex: 1 }}>   </Box>
                <Box sx={{
                    display: "flex", flexDirection: 'column', borderRadius: '3px', border: '1px solid grey', flex: 2, height: '500px',
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
                            User Rights
                        </Typography>
                    </Box>


                    <Box sx={{ display: "flex", pt: 1, flexDirection: 'row', }}>
                        <Box sx={{ display: "flex", flexDirection: 'row', width: '100%' }}>
                            <Box sx={{ flex: 1, display: "flex", flexDirection: 'row' }}>
                                <Box sx={{ flex: 1, pr: 1, pt: 0.5 }}>
                                    <Typography variant="body1"
                                        align='right'
                                        style={{
                                            fontSize: '12px',
                                            fontFamily: 'Arial',
                                        }}>
                                        Module
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", pl: 1 }}>
                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '14px',
                                        }}
                                    >
                                        :
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", pl: 1 }}>
                                    <ModuleGroupComp
                                        value={module}
                                        setValue={setModule}
                                    />

                                </Box>
                            </Box>

                            <Box sx={{ flex: 0.2, display: "flex", flexDirection: 'row' }}></Box>

                            <Box sx={{ flex: 1, display: "flex", flexDirection: 'row' }}>
                                <Box sx={{ pr: 1, pt: 0.5 }}>
                                    <Typography variant="body1"
                                        align='left'
                                        style={{
                                            fontSize: '12px',
                                            fontFamily: 'Arial',
                                        }}>
                                        User Groups
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", pl: 1 }}>
                                    <Typography variant="body1"
                                        // align='center'
                                        style={{
                                            fontSize: '14px',
                                        }}
                                    >
                                        :
                                    </Typography>
                                </Box>

                                <Box sx={{ display: "flex", pl: 1 }}>
                                    <UserGroupComp
                                        value={usergroup}
                                        setValue={setUsergroup}
                                    />

                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: 'row', width: '100%', pt: 1 }}>
                        <Box sx={{ display: "flex", flexDirection: 'row', width: '100%' }}>
                            <Box sx={{ flex: 1, display: "flex", flexDirection: 'row' }}>
                                <Box sx={{ flex: 1, pr: 1, pt: 0.5 }}>
                                    <Typography variant="body1"
                                        align='right'
                                        style={{
                                            fontSize: '12px',
                                            fontFamily: 'Arial',
                                        }}>
                                        Menu Group
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", pl: 1 }}>
                                    <Typography variant="body1"
                                        align='center'
                                        style={{
                                            fontSize: '14px',
                                        }}
                                    >
                                        :
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", pl: 1 }}>
                                    <MenuGroupComp
                                        value={menugroup}
                                        setValue={setMenugroup}
                                        module={module}
                                    />

                                </Box>
                            </Box>
                            <Box sx={{ flex: 0.2, display: "flex", flexDirection: 'row' }}></Box>
                            <Box sx={{ flex: 1, display: "flex", flexDirection: 'row' }}>
                                <Box sx={{ display: "flex" }}>
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
                                        onClick={SearchUserRights}
                                    >
                                        Search
                                    </button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: 'column', px: 1 }}>
                        <Divider flexItem sx={{ borderBlockColor: 'grey', pt: 1.5, px: 1 }}></Divider>
                    </Box>

                    {flag === 0 ?
                        <Box sx={{ display: "flex", flexDirection: 'column', height: '350px' }}>

                        </Box> :
                        <Box sx={{ display: "flex", flexDirection: 'column', height: '350px' }}>
                            <Box sx={{ display: "flex", px: 1 }} variant='elevation' overflow='hidden'>
                                <TableContainer sx={{ maxHeight: 350, maxWidth: "100%" }}>
                                    <Table size='small' stickyHeader aria-label="a dense table" padding={"none"}
                                        style={{
                                            border: "0.5px solid lightgrey", fontFamily: "Arial",
                                            BorderAllRounded: '1px', opacity: 0.9
                                        }}>
                                        <TableHead sx={{ height: '40px' }}>
                                            <TableRow size='small'
                                                sx={{
                                                    borderWidth: 1,
                                                    borderColor: 'grey',
                                                    borderStyle: 'solid',
                                                }}>
                                                <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', width: 15 }}>Sl.No</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey' }}>Menu Group</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey' }}>Menu Name</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', width: 50 }}> View </TableCell>
                                                <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', width: 50 }}>PDF  </TableCell>
                                                <TableCell sx={{ fontWeight: 'bold', fontSize: 12, backgroundColor: 'lightgrey', borderRight: '1px solid lightgrey', pl: 1, borderTop: '1px solid lightgrey', width: 50 }}>Excel </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {disarray && disarray.map((val, index) => {
                                                return <TableRow key={index}>
                                                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.SlNo}</TableCell>
                                                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.menugroup_name}</TableCell>
                                                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>{val.menu_name}</TableCell>
                                                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>
                                                        <input type="checkbox"
                                                            background='white'
                                                            border='0.5px solid  #C4C4C4'
                                                            style={{
                                                                width: '14px',
                                                                height: '15px',
                                                            }}
                                                            checked={val.view_menu === 0 ? false : true}
                                                            onChange={(e) => {
                                                                ChangeView(e.target.checked, val)
                                                            }}
                                                        >
                                                        </input>

                                                    </TableCell>
                                                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>
                                                        <input type="checkbox"
                                                            background='white'
                                                            border='0.5px solid  #C4C4C4'
                                                            style={{
                                                                width: '14px',
                                                                height: '15px'
                                                            }}

                                                            checked={val.pdf_view === 0 ? false : true}
                                                            onChange={(e) => ChangePdf(e.target.checked, val)}
                                                        >
                                                        </input>

                                                    </TableCell>

                                                    <TableCell sx={{ fontSize: 13, borderRight: '1px solid lightgrey', pl: 1 }}>
                                                        <input type="checkbox"
                                                            background='white'
                                                            border='0.5px solid  #C4C4C4'
                                                            style={{
                                                                width: '14px',
                                                                height: '15px'
                                                            }}
                                                            checked={val.excel_view === 0 ? false : true}
                                                            onChange={(e) => ChangeExcel(e.target.checked, val)}
                                                        >
                                                        </input>
                                                    </TableCell>

                                                </TableRow>
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            </Box>

                        </Box>
                    }
                    <Divider flexItem sx={{ borderBlockColor: 'grey' }}></Divider>

                    <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: 'center', pt: 0.5 }}>
                        {
                            flag === 1 ? <Box sx={{ display: "flex" }}>
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
                                    onClick={SaveUserRights}
                                >
                                    Save
                                </button>
                            </Box> : null
                        }

                        <Box sx={{ display: "flex" }}>
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
                                onClick={ClearDetails}
                            >
                                Cancel
                            </button>
                        </Box>

                        <Box sx={{ display: "flex" }}>
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
                                    ':hover': {
                                        backgroundColor: '#ebebeb',
                                        border: '1px solid orange',
                                    }
                                }}
                                onClick={PageClose}
                            >
                                Close
                            </button>
                        </Box>

                    </Box>

                </Box>
                <Box sx={{ display: "flex", flexDirection: 'column', borderRadius: '1px', flex: 1 }}>   </Box>

            </Box>
        </Fragment >
    )
}

export default UserRightsApply

