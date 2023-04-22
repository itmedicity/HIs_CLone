import React from 'react'
import ContentMain from '../Components/ContentMain'
import ContentSecondary from '../Components/ContentSecondary'
import ContentPaper from '../Components/ContentPaper'
import ContentNavLink from '../Components/ContentNavLink'

const Outpatient = () => {
    return (
        <ContentMain>
            <ContentSecondary name="Out Patient" >
                <ContentPaper name="Daily Statement" >
                    {/* <ContentNavLink name="User Group" route="" />
                    <ContentNavLink name="User Creation" route="" />
                    <ContentNavLink name="User Rights" route="" />
                    <ContentNavLink name="Change Password" route="" />
                    <ContentNavLink name="Query Settings" route="" /> */}
                </ContentPaper>
                <ContentPaper name="Patient Visit">
                    {/* <ContentNavLink name="User Group" route="" />
                    <ContentNavLink name="User Creation" route="" />
                    <ContentNavLink name="User Rights" route="" />
                    <ContentNavLink name="Change Password" route="" />
                    <ContentNavLink name="Query Settings" route="" /> */}
                </ContentPaper>
            </ContentSecondary>
        </ContentMain>
    )
}

export default Outpatient