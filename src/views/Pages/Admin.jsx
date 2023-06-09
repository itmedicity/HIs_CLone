import React, { memo } from 'react'
import ContentMain from '../Components/ContentMain';
import ContentSecondary from '../Components/ContentSecondary';
import ContentPaper from '../Components/ContentPaper';
import ContentNavLink from '../Components/ContentNavLink';

import { user_settings, report_grouping } from '../../Routes/routes.admin';

const Admin = () => {

    return (
        <ContentMain>
            <ContentSecondary name="Admin" >
                <ContentPaper name="User Setting" >
                    {
                        user_settings.map((element, idx) => <ContentNavLink name={element.name} route={element.path} key={idx} />)
                    }

                    {/* <ContentNavLink name="User Group" route="" /> */}
                    {/* <ContentNavLink name="User Creation" route="/Menu/User" /> */}
                    {/* <ContentNavLink name="User Rights" route="" /> */}
                    <ContentNavLink name="Change Password" route="" />
                    <ContentNavLink name="Query Settings" route="" />
                    <ContentNavLink name="Dynamic Reports" route="" />
                    <ContentNavLink name="Dashboard User Rights" route="" />
                </ContentPaper>
                <ContentPaper name="Dynamic Query Setting">
                    <ContentNavLink name="Query Add/Edit" route="" />
                </ContentPaper>
                <ContentPaper name="Reports Grouping">
                    {
                        report_grouping.map((element, idx) => <ContentNavLink name={element.name} route={element.path} key={idx} />)
                    }
                </ContentPaper>
            </ContentSecondary>
        </ContentMain>
    )
}

export default memo(Admin) 