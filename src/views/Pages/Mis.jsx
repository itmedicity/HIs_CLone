// @ts-nocheck
import React, { memo, useEffect, useState } from 'react'
import ContentMain from '../Components/ContentMain'
import ContentSecondary from '../Components/ContentSecondary'
import ContentPaper from '../Components/ContentPaper'
import ContentNavLink from '../Components/ContentNavLink'

import { top_officials } from '../../Routes/routes_mis'
import { getMenuSlno, usergroupid } from '../../HomeComponents/MenuRights/menuRights'
import { topOfficilasMenu } from '../../Menu/MISBillingMenu'

const Mis = () => {

    const user = usergroupid()
    const [topoff, setTopOff] = useState()
    useEffect(() => {
        getMenuSlno(user).then((val) => {
            const menuSlno = val.map((value) => {
                return value.menuname_id
            })
            const topoffcmenu = topOfficilasMenu.filter(val => menuSlno.includes(val.slno));
            setTopOff(topoffcmenu)

        })
    }, [user])

    return (
        <ContentMain>
            <ContentSecondary name="MIS" >
                <ContentPaper name="Top Officials" >
                    {
                        topoff && topoff.map((val) => <ContentNavLink name={val.name} route={val.path} key={val.slno} />)
                    }
                </ContentPaper>
                <ContentPaper name="Reg. Cons.">
                    <ContentNavLink name="Query Add/Edit" route="" />
                </ContentPaper>
                <ContentPaper name="Gst Reports">
                    <ContentNavLink name="Hospital Icome Group" route="" />
                </ContentPaper>
            </ContentSecondary>
        </ContentMain>
    )
}

export default memo(Mis) 