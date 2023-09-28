// @ts-nocheck
import React, { memo, useState, useEffect } from 'react'
import ContentMain from '../Components/ContentMain';
import ContentSecondary from '../Components/ContentSecondary';
import ContentPaper from '../Components/ContentPaper';
import ContentNavLink from '../Components/ContentNavLink';
import { report_grouping } from '../../Routes/routes.admin';
import { getMenuSlno, usergroupid } from '../../HomeComponents/MenuRights/menuRights';
import { reportGroupingMenu, userSettingMenuName } from '../../Menu/AdminMenu';

const Admin = () => {
    const user = usergroupid()
    const [menuList, setmenuList] = useState()
    const [report, setReport] = useState()
    useEffect(() => {
        getMenuSlno(user).then((val) => {
            const menuSlno = val.map((value) => {
                return value.menuname_id
            })
            const adminMenushow = userSettingMenuName.filter(val => menuSlno.includes(val.slno));
            setmenuList(adminMenushow)


            const reportMenu = reportGroupingMenu.filter(val => menuSlno.includes(val.slno));
            setReport(reportMenu)
        })

    }, [user])
    return (
        <ContentMain>
            <ContentSecondary name="Admin" >
                <ContentPaper name="User Setting" >
                    {
                        menuList && menuList.map((val) => {
                            return <ContentNavLink name={val.name} route={val.path} key={val.slno} />;
                        })
                    }
                    {/* <ContentNavLink name="User Group" route="" /> */}
                    {/* <ContentNavLink name="User Creation" route="/Menu/User" /> */}
                    {/* <ContentNavLink name="User Rights" route="" /> */}
                    {/* <ContentNavLink name="Change Password" route="" />
                    <ContentNavLink name="Query Settings" route="" />
                    <ContentNavLink name="Dynamic Reports" route="" />
                    <ContentNavLink name="Dashboard User Rights" route="" /> */}
                </ContentPaper>
                <ContentPaper name="Dynamic Query Setting">
                    {/* <ContentNavLink name="Query Add/Edit" route="" /> */}
                </ContentPaper>
                <ContentPaper name="Reports Grouping">
                    {
                        report && report.map((val) => {
                            return <ContentNavLink name={val.name} route={val.path} key={val.slno} />;
                        })
                    }

                    {/* {
                        report_grouping.map((element, idx) => <ContentNavLink name={element.name} route={element.path} key={idx} />)
                    } */}
                </ContentPaper>
            </ContentSecondary>
        </ContentMain>
    )
}

export default memo(Admin) 