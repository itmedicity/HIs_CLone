// @ts-nocheck
import React, { memo, useEffect, useState } from 'react'
import ContentMain from '../Components/ContentMain';
import ContentSecondary from '../Components/ContentSecondary';
import ContentPaper from '../Components/ContentPaper';
import ContentNavLink from '../Components/ContentNavLink';
import { getMenuSlno, usergroupid } from '../../HomeComponents/MenuRights/menuRights';
import { dashboardMenu } from '../../Menu/DashBoardMenu';
import { dashboard_setting } from '../../Routes/routes.dashbord';

const Dashboard = () => {


    const user = usergroupid()
    const [opip, setOpIp] = useState()
    useEffect(() => {
        getMenuSlno(user).then((val) => {
            const menuSlno = val.map((value) => {
                return value.menuname_id
            })
            const opipmenu = dashboardMenu.filter(val => menuSlno.includes(val.slno));
            setOpIp(opipmenu)
        })
    }, [user])

    return (
        <ContentMain>
            {/* <ContentSecondary name="DashBoard">

                <ContentPaper name="OP-IP Statistics">
                    {
                        opip && opip.map((val) => {
                            return <ContentNavLink name={val.name} route={val.path} key={val.slno} />;
                        })
                    }
                    {
                        dashboard_setting.map((element, idx) => <ContentNavLink name={element.name} route={element.path} key={idx} />)
                    }
                </ContentPaper>
            </ContentSecondary> */}
        </ContentMain>
    )
}

export default memo(Dashboard)