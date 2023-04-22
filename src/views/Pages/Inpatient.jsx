import React, { memo } from 'react'
import ContentMain from '../Components/ContentMain'
import ContentSecondary from '../Components/ContentSecondary'
import ContentPaper from '../Components/ContentPaper'
import ContentNavLink from '../Components/ContentNavLink'

const Inpatient = () => {
    return (
        <ContentMain>
            <ContentSecondary name="In Patient" >
                <ContentPaper name="In Patient" >
                    <ContentNavLink name="User Group" route="" />
                    <ContentNavLink name="User Creation" route="" />
                    <ContentNavLink name="User Rights" route="" />
                    <ContentNavLink name="Change Password" route="" />
                    <ContentNavLink name="Query Settings" route="" />
                </ContentPaper>
                <ContentPaper name="Out Patient">
                    <ContentNavLink name="User Group" route="" />
                    <ContentNavLink name="User Creation" route="" />
                    <ContentNavLink name="User Rights" route="" />
                    <ContentNavLink name="Change Password" route="" />
                    <ContentNavLink name="Query Settings" route="" />
                </ContentPaper>
            </ContentSecondary>
        </ContentMain>
    )
}

export default memo(Inpatient)