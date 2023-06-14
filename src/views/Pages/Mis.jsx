import React from 'react'
import ContentMain from '../Components/ContentMain'
import ContentSecondary from '../Components/ContentSecondary'
import ContentPaper from '../Components/ContentPaper'
import ContentNavLink from '../Components/ContentNavLink'

import { top_officials } from '../../Routes/routes_mis'

const Mis = () => {
    return (
        <ContentMain>
            <ContentSecondary name="MIS" >
                <ContentPaper name="Top Officials" >
                    {
                        top_officials.map((element, idx) => <ContentNavLink name={element.name} route={element.path} key={idx} />)
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

export default Mis