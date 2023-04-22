import React, { memo } from 'react'
import ContentMain from '../Components/ContentMain';
import ContentSecondary from '../Components/ContentSecondary';
import ContentPaper from '../Components/ContentPaper';
import ContentNavLink from '../Components/ContentNavLink';

const Admin = () => {

    return (
        <ContentMain>
            <ContentSecondary name="Admin" >
                <ContentPaper name="User Setting" >
                    <ContentNavLink name="User Group" route="" />
                    <ContentNavLink name="User Creation" route="" />
                    <ContentNavLink name="User Rights" route="" />
                    <ContentNavLink name="Change Password" route="" />
                    <ContentNavLink name="Query Settings" route="" />
                    <ContentNavLink name="Dynamic Reports" route="" />
                    <ContentNavLink name="Dashboard User Rights" route="" />
                </ContentPaper>
                <ContentPaper name="Dynamic Query Setting">
                    <ContentNavLink name="Query Add/Edit" route="" />
                </ContentPaper>
                <ContentPaper name="Reports Grouping">
                    <ContentNavLink name="Hospital Icome Group" route="" />
                </ContentPaper>
            </ContentSecondary>
        </ContentMain>
    )
}

export default memo(Admin) 